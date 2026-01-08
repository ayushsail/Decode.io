-- Insert standard C Puzzles into the 'puzzles' table
-- Run this in your Supabase SQL Editor to populate your app with content

INSERT INTO puzzles (title, slug, description, difficulty, category, xp_reward, starter_code, test_cases)
VALUES 
(
  'Pointer Arithmetic Master',
  'pointer-arithmetic-master',
  'Given an array of integers, use pointer arithmetic to reverse the array in-place. Do not use array indexing conventions (e.g. arr[i]).',
  'Hard',
  'Memory Management',
  500,
  '#include <stdio.h>

void reverse_array(int* arr, int size) {
    // TODO: Reverse the array using pointers only
    
}

int main() {
    int arr[] = {1, 2, 3, 4, 5};
    int size = 5;
    reverse_array(arr, size);
    return 0;
}',
  '[{"input": "[1,2,3,4,5]", "output": "[5,4,3,2,1]"}]'::jsonb
),
(
  'Memory Leak Detector',
  'memory-leak-detector',
  'The following code allocates memory but fails to free it properly in all execution paths. Fix the memory leaks.',
  'Medium',
  'Memory Management',
  300,
  '#include <stdlib.h>
#include <stdio.h>

void process_data(int error_condition) {
    int* data = (int*)malloc(100 * sizeof(int));
    if (error_condition) {
        // TODO: Handle memory here
        return;
    }
    // ... processing ...
    free(data);
}

int main() {
    process_data(1);
    return 0;
}',
  '[{"input": "check_leaks", "output": "0 leaks"}]'::jsonb
),
(
  'Bitwise Toggle',
  'bitwise-toggle',
  'Implement a function that toggles the nth bit of a given number using only bitwise operators.',
  'Easy',
  'Bit Manipulation',
  100,
  '#include <stdio.h>

int toggle_bit(int n, int position) {
    // TODO: Toggle the bit at "position"
    return n;
}

int main() {
    // Example: toggle 5 (101) at pos 1 -> 7 (111)
    return 0;
}',
  '[{"input": "n=5, pos=1", "output": "7"}]'::jsonb
),
(
  'Linked List Cycle',
  'linked-list-cycle',
  'Detect if a linked list has a cycle in it. Return 1 if true, 0 if false. Use Floyd''s Cycle-Finding Algorithm.',
  'Hard',
  'Data Structures',
  450,
  '#include <stdio.h>
#include <stdlib.h>

struct Node {
    int data;
    struct Node* next;
};

int has_cycle(struct Node* head) {
    // TODO: Implement detection
    return 0;
}',
  '[{"input": "1->2->3->1", "output": "1"}]'::jsonb
),
(
  'String Reversal (Recursion)',
  'string-reversal-recursion',
  'Write a recursive function to print a string in reverse.',
  'Medium',
  'Rescursion',
  250,
  '#include <stdio.h>

void reverse_print(char* str) {
    // TODO: Recursive step
}

int main() {
    reverse_print("Hello");
    return 0;
}',
  '[{"input": "Hello", "output": "olleH"}]'::jsonb
);
