INSERT INTO puzzles (title, slug, description, difficulty, category, starter_code, test_cases, xp_reward, is_ai_generated) VALUES ('Black Box Buffer', 'black-box-buffer', 'Implement a Circular Buffer (Ring Buffer) for the Flight Data Recorder. It should overwrite the oldest data when full.', 'Easy', 'Data Structures', '#include <stdio.h>

#define SIZE 100
typedef struct {
    int data[SIZE];
    int head;
    int count;
} RingBuffer;

void log_data(RingBuffer* rb, int value) {
    // TODO: Add value, handle wrap-around
}', '[{"input":"Log 105 items","output":"Buffer contains last 100"}]', 100, true);
INSERT INTO puzzles (title, slug, description, difficulty, category, starter_code, test_cases, xp_reward, is_ai_generated) VALUES ('Command Queue Chain', 'command-queue-chain', 'The autopilot receives commands from ground control. Implement a Linked List to store these commands dynamically.', 'Medium', 'Data Structures', '#include <stdio.h>
#include <stdlib.h>

typedef struct Node {
    int command_id;
    struct Node* next;
} Node;

void push_command(Node** head, int id) {
    // TODO: Append to list
}', '[{"input":"Push 1, Push 2","output":"1 -> 2 -> NULL"}]', 200, true);
INSERT INTO puzzles (title, slug, description, difficulty, category, starter_code, test_cases, xp_reward, is_ai_generated) VALUES ('Airspace Quadtree', 'airspace-quadtree', 'To track other aircraft efficiently, implement a Quadtree insertion function. Each node represents a quadrant of airspace.', 'Hard', 'Data Structures', '#include <stdio.h>
#include <stdlib.h>

typedef struct QuadNode {
    int x, y; // Center point
    struct QuadNode *nw, *ne, *sw, *se;
    // ... aircraft data
} QuadNode;

void insert_aircraft(QuadNode* root, int x, int y) {
    // TODO: Recursive insertion
}', '[{"input":"Insert (10, 10)","output":"Tree structure updated"}]', 300, true);
INSERT INTO puzzles (title, slug, description, difficulty, category, starter_code, test_cases, xp_reward, is_ai_generated) VALUES ('Emergency Priority Heap', 'emergency-priority-heap', 'System alerts must be handled by severity. Implement a Max-Heap to ensure the critical ''Stall Warning'' (Priority 99) is processed before ''Low Battery'' (Priority 20).', 'Hard', 'Data Structures', '#include <stdio.h>

void enqueue_alert(int* heap, int* size, int priority) {
    // TODO: Insert and heapify up
}', '[{"input":"Ins 20, Ins 99","output":"Pop -> 99"}]', 500, true);
INSERT INTO puzzles (title, slug, description, difficulty, category, starter_code, test_cases, xp_reward, is_ai_generated) VALUES ('Navigation Mesh Graph', 'navigation-mesh-graph', 'The drone navigates a city. Represent the flyable corridors as a Graph using Adjacency Lists and implement a function to check if a path exists between two zones.', 'Hard', 'Data Structures', '#include <stdio.h>
#include <stdlib.h>

typedef struct Edge {
    int dest;
    struct Edge* next;
} Edge;

int has_path(Edge** graph, int start, int end, int num_nodes) {
    // TODO: DFS or BFS
    return 0;
}', '[{"input":"0->1, 1->2. Path 0->2?","output":"1"}]', 1000, true);