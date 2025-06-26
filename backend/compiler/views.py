from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from .models import Compile_Submission
import uuid
import subprocess
from pathlib import Path
from django.conf import settings
from .serializers import SubmissionSerializer
GPP_PATH = r"C:\MinGW\bin\g++.exe"



class SubmitView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        language = request.data.get('language')
        code = request.data.get('code')
        input_data = request.data.get('input_data', '')

        if language not in ['cpp', 'java', 'python']:
            return Response({'error': 'Invalid language'}, status=status.HTTP_400_BAD_REQUEST)

        output_data = run_code(language, code, input_data)

        submission = Compile_Submission.objects.create(
            user=request.user,
            language=language,
            input_data=code,
            output_data=output_data
        )
        serializer=SubmissionSerializer(submission)

        return Response(serializer.data, status=status.HTTP_200_OK)





def run_code(language, code, input_data):
    project_path = Path(settings.BASE_DIR)
    directories = ["codes", "inputs", "outputs"]
    for directory in directories:
        dir_path = project_path / directory
        if not dir_path.exists():
            dir_path.mkdir(parents=True, exist_ok=True)

    codes_dir = project_path / "codes"
    inputs_dir = project_path / "inputs"
    outputs_dir = project_path / "outputs"
    unique = str(uuid.uuid4())

    # File names and paths
    file_ext = {'cpp': 'cpp', 'java': 'java', 'python': 'py'}[language]
    code_file_name = f"{unique}.{file_ext}"
    input_file_name = f"{unique}.txt"
    output_file_name = f"{unique}.txt"
    code_file_path = codes_dir / code_file_name
    input_file_path = inputs_dir / input_file_name
    output_file_path = outputs_dir / output_file_name

    # Write code and input to files
    with open(code_file_path, "w") as code_file:
        code_file.write(code)
    with open(input_file_path, "w") as input_file:
        input_file.write(input_data)
    # Create empty output file
    open(output_file_path, "w").close()

    try:
        if language == 'cpp':
            exe_file = codes_dir / f"{unique}_exe"
            compile_cmd = [GPP_PATH, str(code_file_path), "-o", str(exe_file)]
            
            compile_proc = subprocess.run(compile_cmd, capture_output=True, text=True, timeout=10)
            if compile_proc.returncode != 0:
                return f"Compilation Error:\n{compile_proc.stderr}"
            run_cmd = [str(exe_file)]
            with open(input_file_path,"r") as infile , open(output_file_path,"w") as outfile:
                run_proc=subprocess.run(run_cmd,stdin=infile,stdout=outfile,stderr=subprocess.PIPE,text=True,timeout=10)
            
            if(run_proc.returncode!=0):
                return f"RUNTIME ERROR\n{run_proc.stderr}"
            
            with open(output_file_path,"r") as output_file:
                output_data=output_file.read()
            return output_data
        elif language == 'java':
            code_file_path = codes_dir / "Main.java"  # ✅ Force correct filename
            with open(code_file_path, "w") as f:
                f.write(code)

            # Compile the code
            compile_cmd = ["javac", str(code_file_path)]
            compile_proc = subprocess.run(compile_cmd, capture_output=True, text=True, timeout=10)

            if compile_proc.returncode != 0:
                return f"Compilation Error:\n{compile_proc.stderr}"

            # Run the compiled class
            run_cmd = ["java", "-cp", str(codes_dir), "Main"]
            with open(input_file_path, "r") as infile, open(output_file_path, "w") as outfile:
                run_proc = subprocess.run(run_cmd, stdin=infile, stdout=outfile, stderr=subprocess.PIPE, text=True, timeout=10)

            if run_proc.returncode != 0:
                return f"RUNTIME ERROR\n{run_proc.stderr}"

            with open(output_file_path, "r") as output_file:
                output_data = output_file.read()

            return output_data
            






        elif language == 'python':
            run_cmd = ["python", str(code_file_path)]
        else:
            return "Unsupported language."

        # Run the code with input and capture output
        with open(input_file_path, "r") as infile, open(output_file_path, "w") as outfile:
            run_proc = subprocess.run(run_cmd, stdin=infile, stdout=outfile, stderr=subprocess.PIPE, text=True, timeout=10)

        # Check for runtime errors
        if run_proc.returncode != 0:
            return f"Runtime Error:\n{run_proc.stderr}"

        # Read the output from the output file
        with open(output_file_path, "r") as output_file:
            output_data = output_file.read()

        return output_data

    except subprocess.TimeoutExpired:
        return "Execution Timed Out."
    except Exception as e:
        return f"Internal Error: {str(e)}"
    finally:
        # Optional: Clean up files if you don't want to keep them
        try:
            code_file_path.unlink()
            input_file_path.unlink()
            output_file_path.unlink()
            if language == 'cpp':
                exe_file.unlink()
            elif language == 'java':
                class_file = codes_dir / f"{classname}.class"
                if class_file.exists():
                    class_file.unlink()
        except Exception:
            pass
