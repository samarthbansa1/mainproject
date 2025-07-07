import java.util.Scanner;

public class AddNumbers {

    // Function to add two integers
    public static int add(int first, int second) {
        return first + second;
    }

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        // Prompt the user for the first integer
        System.out.print("Enter the first integer: ");
        int first = scanner.nextInt();

        // Prompt the user for the second integer
        System.out.print("Enter the second integer: ");
        int second = scanner.nextInt();

        int sum = add(first, second);

        System.out.println("Sum: " + sum);

        scanner.close();
    }
}
