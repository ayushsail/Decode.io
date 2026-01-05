
export const CATEGORIES = [
    { name: "Algorithms", count: 42, color: "bg-purple-500/20", icon: "🧩" },
    { name: "Data Structures", count: 28, color: "bg-blue-500/20", icon: "🏗️" },
    { name: "Memory Management", count: 15, color: "bg-green-500/20", icon: "🧠" },
    { name: "System Programming", count: 12, color: "bg-orange-500/20", icon: "💻" },
    { name: "Pointers & Arrays", count: 8, color: "bg-red-500/20", icon: "➡️" },
    { name: "Bit Manipulation", count: 5, color: "bg-cyan-500/20", icon: "binary" },
];

export const PUZZLES = [
    {
        id: "1",
        title: "The Traveling Salesman",
        difficulty: "Hard",
        category: "Algorithms",
        xp: 500,
        description: "Given a set of cities and distance, find the shortest route in C using optimal memory.",
        examples: [
            { input: "distances = {{0, 10, 15, 20}, {10, 0, 35, 25}...}", output: "80" }
        ],
        starterCode: `#include <stdio.h>
#include <stdlib.h>
#include <limits.h>

// Solver function
// Ensure you free any dynamically allocated memory!
int solveTSM(int **distances, int n) {
    // Write your C solution here
    return 0;
}`
    },
    {
        id: "2",
        title: "Binary Tree Max Path Sum",
        difficulty: "Hard",
        category: "Data Structures",
        xp: 300,
        description: "Find the maximum path sum in a binary tree. Focus on pointer manipulation.",
        examples: [],
        starterCode: `#include <stdio.h>
#include <stdlib.h>

struct TreeNode {
    int val;
    struct TreeNode *left;
    struct TreeNode *right;
};

int maxPathSum(struct TreeNode* root) {
    // Handle NULL pointers safely
    return 0;
}`
    },
    {
        id: "3",
        title: "Memory Leak Detector",
        difficulty: "Medium",
        category: "Memory Management",
        xp: 450,
        description: "Analyze the provided pointer operations and return the total number of leaked bytes.",
        examples: [],
        starterCode: `#include <stdio.h>
#include <stdlib.h>

// Analyze the allocation pattern
size_t count_leaked_bytes(void** allocations, int n) {
    // Your C code here
    return 0;
}`
    }
];

export const USERS = [
    { rank: 1, name: "Alex Chen", xp: "15,420", country: "🇺🇸" },
    { rank: 2, name: "Maria Garcia", xp: "14,850", country: "🇪🇸" },
    { rank: 3, name: "Yuki Tanaka", xp: "14,200", country: "🇯🇵" },
    { rank: 4, name: "Sarah Jones", xp: "13,900", country: "🇬🇧" },
    { rank: 5, name: "User Name (You)", xp: "12,100", country: "🇨🇦", highlight: true },
];
