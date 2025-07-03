import java.util.*;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        List<Integer> nums = new ArrayList<>();
        String[] arr = sc.nextLine().trim().split(" ");
        for (String s : arr) nums.add(Integer.parseInt(s));
        int target = sc.nextInt();
        for (int i = 0; i < nums.size(); i++) {
            for (int j = i + 1; j < nums.size(); j++) {
                if (nums.get(i) + nums.get(j) == target) {
                    System.out.println(i);
                    System.out.println(j);
                    return;
                }
            }
        }
    }
}