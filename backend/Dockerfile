#python base image
FROM python:3.11-slim

#work dir
WORKDIR /app

# Install system dependencies (add compilers for code execution)
RUN apt-get update && \
    apt-get install -y gcc g++ openjdk-17-jdk && \
    rm -rf /var/lib/apt/lists/*


# Install Python dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy Django project files
COPY . .

# Expose port
EXPOSE 8000

# Run migrations and start server
CMD ["sh", "-c", "python manage.py migrate && python manage.py runserver 0.0.0.0:8000"]