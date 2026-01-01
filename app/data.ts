
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
        description: "Given a list of cities and the distances between each pair of cities, what is the shortest possible route that visits each city exactly once and returns to the origin city?",
        examples: [
            { input: "distances = {{0, 10, 15, 20}, {10, 0, 35, 25}, ...}, n = 4", output: "80" }
        ],
        starterCode: "#include <stdio.h>\n#include <limits.h>\n\n// Returns the minimum cost to visit all cities\nint solveTSM(int **distances, int n) {\n    // Your code here\n    return 0;\n}"
    },
    {
        id: "2",
        title: "Binary Tree Max Path Sum",
        difficulty: "Hard",
        category: "Data Structures",
        xp: 300,
        description: "A path in a binary tree is a sequence of nodes where each pair of adjacent nodes in the sequence has an edge connecting them. Find the maximum path sum.",
        examples: [],
        starterCode: "#include <stdio.h>\n\nstruct TreeNode {\n    int val;\n    struct TreeNode *left;\n    struct TreeNode *right;\n};\n\nint maxPathSum(struct TreeNode* root) {\n    // Your code here\n    return 0;\n}"
    },
    {
        id: "3",
        title: "Median of Two Sorted Arrays",
        difficulty: "Hard",
        category: "Pointers & Arrays",
        xp: 450,
        description: "Given two sorted arrays nums1 and nums2 of size m and n respectively, return the median of the two sorted arrays.",
        examples: [],
        starterCode: "#include <stdio.h>\n\ndouble findMedianSortedArrays(int* nums1, int nums1Size, int* nums2, int nums2Size) {\n    // Your code here\n    return 0.0;\n}"
    }
];

export const USERS = [
    { rank: 1, name: "Alex Chen", xp: "15,420", country: "🇺🇸" },
    { rank: 2, name: "Maria Garcia", xp: "14,850", country: "🇪🇸" },
    { rank: 3, name: "Yuki Tanaka", xp: "14,200", country: "🇯🇵" },
    { rank: 4, name: "Sarah Jones", xp: "13,900", country: "🇬🇧" },
    { rank: 5, name: "User Name (You)", xp: "12,100", country: "🇨🇦", highlight: true },
];
