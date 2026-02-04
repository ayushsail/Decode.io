import * as fs from 'fs';

const slugify = (text: string) => text.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');

const puzzlesData = [
    {
        "title": "Sensor Calibration Check",
        "difficulty": "Easy",
        "category": "Algorithms",
        "xp": 100,
        "description": "The autopilot's initial diagnostic requires checking the pitch sensor array. Given an array of 5 raw sensor readings, return 1 if the deviation between any two readings exceeds the safe threshold of 10 units, indicating a malfunctioning sensor. Otherwise return 0.",
        "starter_code": "#include <stdio.h>\n#include <math.h>\n\nint check_pitch_sensors(int* readings, int size) {\n    // TODO: Return 1 if unsafe deviation found, 0 if stable\n    return 0;\n}",
        "test_cases": [
            { "input": "[100, 102, 99, 101, 100]", "output": "0" },
            { "input": "[100, 102, 115, 101, 100]", "output": "1" }
        ]
    },
    {
        "title": "Flight Path Sorting",
        "difficulty": "Medium",
        "category": "Algorithms",
        "xp": 200,
        "description": "Incoming flight plans have different priority levels. Implement a sort function to arrange a list of 'FlightPlan' structures based on their 'urgency' score in descending order.",
        "starter_code": "#include <stdio.h>\n\ntypedef struct {\n    int id;\n    int urgency;\n} FlightPlan;\n\nvoid sort_flight_plans(FlightPlan* plans, int count) {\n    // TODO: Sort array by urgency (descending)\n}",
        "test_cases": [
            { "input": "[{1, 5}, {2, 10}, {3, 2}]", "output": "[{2, 10}, {1, 5}, {3, 2}]" }
        ]
    },
    {
        "title": "Waypoint Optimization",
        "difficulty": "Hard",
        "category": "Algorithms",
        "xp": 300,
        "description": "The drone needs to visit a set of waypoints to scan an area. Given an adjacency matrix representing distances between waypoints, implement the Nearest Neighbor algorithm to determine an approximate shortest route starting from waypoint 0.",
        "starter_code": "#include <stdio.h>\n\nvoid optimize_route(int** distance_matrix, int num_waypoints, int* out_route) {\n    // TODO: Fill out_route with waypoint indices\n}",
        "test_cases": [
            { "input": "Matrix 4x4", "output": "[0, 2, 1, 3]" }
        ]
    },
    {
        "title": "LIDAR Collision Avoidance",
        "difficulty": "Hard",
        "category": "Algorithms",
        "xp": 500,
        "description": "You receive a stream of 2D points from the LIDAR. Implement the Convex Hull algorithm (Graham scan or Monotone Chain) to define the safe flyable zone boundary around detected obstacles.",
        "starter_code": "#include <stdio.h>\n\ntypedef struct { int x, y; } Point;\n\nint compute_safe_zone(Point* obstacles, int n, Point* hull_output) {\n    // TODO: Return size of hull and fill output\n    return 0;\n}",
        "test_cases": [
            { "input": "[(0,0), (5,0), (2,5), (3,3)]", "output": "[(0,0), (5,0), (2,5)]" }
        ]
    },
    {
        "title": "Trajectory Smoothing",
        "difficulty": "Hard",
        "category": "Algorithms",
        "xp": 1000,
        "description": "Raw GPS input is jittery. Implement a Kalman Filter update step for a 1D state (altitude) to estimate the true position giving a measurement and previous estimate.",
        "starter_code": "#include <stdio.h>\n\ntypedef struct {\n    float estimate;\n    float error_cov;\n    float q; // Process noise\n    float r; // Measurement noise\n} KalmanState;\n\nvoid update_altitude(KalmanState* k, float measurement) {\n    // TODO: Update estimate and error_cov\n}",
        "test_cases": [
            { "input": "Meas: 102.5", "output": "Est: 101.2" }
        ]
    },
    {
        "title": "Black Box Buffer",
        "difficulty": "Easy",
        "category": "Data Structures",
        "xp": 100,
        "description": "Implement a Circular Buffer (Ring Buffer) for the Flight Data Recorder. It should overwrite the oldest data when full.",
        "starter_code": "#include <stdio.h>\n\n#define SIZE 100\ntypedef struct {\n    int data[SIZE];\n    int head;\n    int count;\n} RingBuffer;\n\nvoid log_data(RingBuffer* rb, int value) {\n    // TODO: Add value, handle wrap-around\n}",
        "test_cases": [
            { "input": "Log 105 items", "output": "Buffer contains last 100" }
        ]
    },
    {
        "title": "Command Queue Chain",
        "difficulty": "Medium",
        "category": "Data Structures",
        "xp": 200,
        "description": "The autopilot receives commands from ground control. Implement a Linked List to store these commands dynamically.",
        "starter_code": "#include <stdio.h>\n#include <stdlib.h>\n\ntypedef struct Node {\n    int command_id;\n    struct Node* next;\n} Node;\n\nvoid push_command(Node** head, int id) {\n    // TODO: Append to list\n}",
        "test_cases": [
            { "input": "Push 1, Push 2", "output": "1 -> 2 -> NULL" }
        ]
    },
    {
        "title": "Airspace Quadtree",
        "difficulty": "Hard",
        "category": "Data Structures",
        "xp": 300,
        "description": "To track other aircraft efficiently, implement a Quadtree insertion function. Each node represents a quadrant of airspace.",
        "starter_code": "#include <stdio.h>\n#include <stdlib.h>\n\ntypedef struct QuadNode {\n    int x, y; // Center point\n    struct QuadNode *nw, *ne, *sw, *se;\n    // ... aircraft data\n} QuadNode;\n\nvoid insert_aircraft(QuadNode* root, int x, int y) {\n    // TODO: Recursive insertion\n}",
        "test_cases": [
            { "input": "Insert (10, 10)", "output": "Tree structure updated" }
        ]
    },
    {
        "title": "Emergency Priority Heap",
        "difficulty": "Hard",
        "category": "Data Structures",
        "xp": 500,
        "description": "System alerts must be handled by severity. Implement a Max-Heap to ensure the critical 'Stall Warning' (Priority 99) is processed before 'Low Battery' (Priority 20).",
        "starter_code": "#include <stdio.h>\n\nvoid enqueue_alert(int* heap, int* size, int priority) {\n    // TODO: Insert and heapify up\n}",
        "test_cases": [
            { "input": "Ins 20, Ins 99", "output": "Pop -> 99" }
        ]
    },
    {
        "title": "Navigation Mesh Graph",
        "difficulty": "Hard",
        "category": "Data Structures",
        "xp": 1000,
        "description": "The drone navigates a city. Represent the flyable corridors as a Graph using Adjacency Lists and implement a function to check if a path exists between two zones.",
        "starter_code": "#include <stdio.h>\n#include <stdlib.h>\n\ntypedef struct Edge {\n    int dest;\n    struct Edge* next;\n} Edge;\n\nint has_path(Edge** graph, int start, int end, int num_nodes) {\n    // TODO: DFS or BFS\n    return 0;\n}",
        "test_cases": [
            { "input": "0->1, 1->2. Path 0->2?", "output": "1" }
        ]
    },
    {
        "title": "Telemetry Packet Allocator",
        "difficulty": "Easy",
        "category": "Memory Management",
        "xp": 100,
        "description": "Allocate memory for a telemetry packet of size `n` bytes using `malloc`, initialize it to zero, and ensure it is freed.",
        "starter_code": "#include <stdlib.h>\n\nvoid* create_packet(size_t size) {\n    // TODO: Malloc and check NULL\n    return NULL;\n}",
        "test_cases": [
            { "input": "size 1024", "output": "Valid Pointer or NULL" }
        ]
    },
    {
        "title": "Struct Alignment Check",
        "difficulty": "Medium",
        "category": "Memory Management",
        "xp": 200,
        "description": "Packets sent over radio must be compact. Given a struct with mixed types (char, int, double), manually pack bytes into a buffer to avoid compiler padding issues.",
        "starter_code": "#include <stdint.h>\n\ntypedef struct { char type; int id; } Msg;\n\nvoid serialize(Msg* m, uint8_t* buffer) {\n    // TODO: Copy bytes tightly without padding\n}",
        "test_cases": [
            { "input": "{'A', 5}", "output": "Buffer len 5 (not 8)" }
        ]
    },
    {
        "title": "Custom Pool Allocator",
        "difficulty": "Hard",
        "category": "Memory Management",
        "xp": 300,
        "description": "Real-time systems cannot tolerate `malloc` jitter. Implement a fixed-block Memory Pool allocator that returns pointers from a pre-allocated arena.",
        "starter_code": "#include <stddef.h>\n\nvoid init_pool(void* arena, size_t size);\nvoid* pool_alloc();\nvoid pool_free(void* ptr);\n// TODO: Implement pool logic",
        "test_cases": [
            { "input": "alloc() x 3", "output": "3 distinct ptrs" }
        ]
    },
    {
        "title": "Flight Controller Leak Detector",
        "difficulty": "Hard",
        "category": "Memory Management",
        "xp": 500,
        "description": "Simulate a memory manager that tracks allocations. Implement `tracked_malloc` and `tracked_free` to maintain a count of active bytes. Return -1 if a double-free is detected.",
        "starter_code": "#include <stdlib.h>\n\nsize_t active_bytes = 0;\n\nvoid* tracked_malloc(size_t size) {\n    // TODO\n    return NULL;\n}\n\nint tracked_free(void* ptr) {\n    // TODO\n    return 0;\n}",
        "test_cases": [
            { "input": "malloc(100)", "output": "active_bytes = 100" }
        ]
    },
    {
        "title": "Zero-Copy Buffer Swap",
        "difficulty": "Hard",
        "category": "Memory Management",
        "xp": 1000,
        "description": "To process high-speed camera feeds, we cannot copy image data. Implement a double-buffering scheme where pointers are swapped atomically (simulated) between the Producer (Camera) and Consumer (Vision Algo).",
        "starter_code": "#include <stdint.h>\n\ntypedef struct { uint8_t* buffer; } Frame;\n\nvoid swap_buffers(Frame** front, Frame** back) {\n    // TODO: Swap pointers efficiently\n}",
        "test_cases": [
            { "input": "Front=A, Back=B", "output": "Front=B, Back=A" }
        ]
    },
    {
        "title": "Config Loader",
        "difficulty": "Easy",
        "category": "System Programming",
        "xp": 100,
        "description": "Read the 'autopilot.conf' file. Parse the first line to get the PID controller's P-value (integer).",
        "starter_code": "#include <stdio.h>\n\nint load_p_value(const char* filename) {\n    // TODO: fopen, fscanf, fclose\n    return 0;\n}",
        "test_cases": [
            { "input": "File content: '120'", "output": "120" }
        ]
    },
    {
        "title": "Watchdog Timer Reset",
        "difficulty": "Medium",
        "category": "System Programming",
        "xp": 200,
        "description": "The system must 'pet' the watchdog every 100ms. Implement a function to check system time and write a '1' to a simulated watchdog register address if 100ms has passed.",
        "starter_code": "#include <time.h>\n\nvoid check_watchdog(volatile int* watchdog_reg) {\n    // TODO: Check clock(), reset if needed\n}",
        "test_cases": [
            { "input": "Time > 100ms", "output": "*reg = 1" }
        ]
    },
    {
        "title": "Inter-Process Signals",
        "difficulty": "Hard",
        "category": "System Programming",
        "xp": 300,
        "description": "The navigation process failed. Raise a specialized signal (simulated) that triggers the 'Safety Parachute' deployment handler.",
        "starter_code": "#include <signal.h>\n#include <stdio.h>\n\nvoid trigger_emergency() {\n    // TODO: raise SIGUSR1\n}",
        "test_cases": [
            { "input": "Call func", "output": "Signal Raised" }
        ]
    },
    {
        "title": "Multithreaded Sensor Fusion",
        "difficulty": "Hard",
        "category": "System Programming",
        "xp": 500,
        "description": "Simulate a mutex lock for a shared global variable `current_altitude` that is written by the Barometer thread and read by the Control thread.",
        "starter_code": "#include <pthread.h>\n\ndouble current_altitude = 0;\npthread_mutex_t alt_lock;\n\nvoid update_altitude(double new_val) {\n    // TODO: Lock, update, unlock\n}",
        "test_cases": [
            { "input": "Concurrent access", "output": "No Data Race" }
        ]
    },
    {
        "title": "Direct Register Mapping",
        "difficulty": "Hard",
        "category": "System Programming",
        "xp": 1000,
        "description": "Map a specific physical memory address (0x4000) representing the Motor Controller status register to a pointer and toggle the 'ARM' bit (Bit 0).",
        "starter_code": "#include <stdint.h>\n\nvoid arm_motors() {\n    uintptr_t base_addr = 0x4000; // Simulated\n    // TODO: Access memory and set bit 0\n}",
        "test_cases": [
            { "input": "Mem 0x00", "output": "Mem 0x01" }
        ]
    },
    {
        "title": "Sensor Array Access",
        "difficulty": "Easy",
        "category": "Pointers & Arrays",
        "xp": 100,
        "description": "Given a pointer to the start of a float array representing 8 motor speeds, set the 3rd motor (index 2) to 0.0 (shutdown) using pointer arithmetic.",
        "starter_code": "#include <stdio.h>\n\nvoid shutdown_motor_3(float* speeds) {\n    // TODO: *(speeds + 2) = ...\n}",
        "test_cases": [
            { "input": "[1.0, 1.0, 1.0...]", "output": "[1.0, 1.0, 0.0...]" }
        ]
    },
    {
        "title": "Gyro Rotation Matrix",
        "difficulty": "Medium",
        "category": "Pointers & Arrays",
        "xp": 200,
        "description": "Apply a rotation matrix to a 3D vector. Pass the vector array to a function `rotate` that modifies it in-place given a 3x3 matrix.",
        "starter_code": "#include <stdio.h>\n\nvoid rotate(float vector[3], float matrix[3][3]) {\n    // TODO: Matrix-Vector multiplication logic\n}",
        "test_cases": [
            { "input": "Vec [1,0,0], 90deg Z-rot", "output": "Vec [0,1,0]" }
        ]
    },
    {
        "title": "Dynamic Flight Plan",
        "difficulty": "Hard",
        "category": "Pointers & Arrays",
        "xp": 300,
        "description": "A Flight Plan is a list of strings (city names). Use a double pointer `char**` to represent this list and implement a function to swap two waypoints.",
        "starter_code": "#include <stdio.h>\n\nvoid swap_cities(char** plan, int i, int j) {\n    // TODO: Swap the pointers at i and j\n}",
        "test_cases": [
            { "input": "['A', 'B'], swap 0,1", "output": "['B', 'A']" }
        ]
    },
    {
        "title": "LIDAR Byte Stream Parser",
        "difficulty": "Hard",
        "category": "Pointers & Arrays",
        "xp": 500,
        "description": "LIDAR returns a raw byte stream. Packets start with 0xFF. Search a buffer using pointer incrementing to find the start of the frame and return the pointer to it.",
        "starter_code": "#include <stdint.h>\n\nuint8_t* find_sync_byte(uint8_t* stream, int len) {\n    // TODO: Return ptr to 0xFF or NULL\n    return NULL;\n}",
        "test_cases": [
            { "input": "[0x00, 0xAA, 0xFF, 0x01]", "output": "Ptr to index 2" }
        ]
    },
    {
        "title": "Autopilot Mode State Machine",
        "difficulty": "Hard",
        "category": "Pointers & Arrays",
        "xp": 1000,
        "description": "Implement the autopilot logic using an array of Function Pointers. Index 0 = 'Stabilize', 1 = 'Loiter', 2 = 'RTL'. Call the function corresponding to the current `mode_id`.",
        "starter_code": "#include <stdio.h>\n\ntypedef void (*ModeFunc)(void);\n\nvoid run_mode(int mode_id, ModeFunc* modes) {\n    // TODO: Execute modes[mode_id]()\n}",
        "test_cases": [
            { "input": "mode 1", "output": "Executes Loiter func" }
        ]
    },
    {
        "title": "Status Flag Reader",
        "difficulty": "Easy",
        "category": "Bit Manipulation",
        "xp": 100,
        "description": "The system status is encoded in a byte. Check if the 'GPS Lock' bit (Bit 3, value 8) is set.",
        "starter_code": "#include <stdint.h>\n\nint is_gps_locked(uint8_t status) {\n    // TODO: Mask and checking\n    return 0;\n}",
        "test_cases": [
            { "input": "0x08", "output": "1" },
            { "input": "0x00", "output": "0" }
        ]
    },
    {
        "title": "Control Surface Masking",
        "difficulty": "Medium",
        "category": "Bit Manipulation",
        "xp": 200,
        "description": "We need to deploy Flaps (Bit 1) and Gear (Bit 2) simultaneously without affecting other bits. Write a function to set these bits in a control integer.",
        "starter_code": "#include <stdint.h>\n\nvoid deploy_landing_config(uint8_t* control_reg) {\n    // TODO: Set bits 1 and 2\n}",
        "test_cases": [
            { "input": "00000000", "output": "00000110" }
        ]
    },
    {
        "title": "Telemetry Bit Packing",
        "difficulty": "Hard",
        "category": "Bit Manipulation",
        "xp": 300,
        "description": "Compress two 4-bit sensor values (range 0-15) into a single 8-bit byte. Value A goes in the high nibble, B in the low nibble.",
        "starter_code": "#include <stdint.h>\n\nuint8_t pack_sensors(uint8_t sensA, uint8_t sensB) {\n    // TODO: Shift and OR\n    return 0;\n}",
        "test_cases": [
            { "input": "A=0xF, B=0x1", "output": "0xF1" }
        ]
    },
    {
        "title": "Hamming Code Parity",
        "difficulty": "Hard",
        "category": "Bit Manipulation",
        "xp": 500,
        "description": "Radio interference is common. Implement a function to calculate the Parity Bit (Even parity) for a given 8-bit data byte. Return 1 if the number of set bits is odd, 0 otherwise.",
        "starter_code": "#include <stdint.h>\n\nint calculate_parity(uint8_t data) {\n    // TODO: Count set bits\n    return 0;\n}",
        "test_cases": [
            { "input": "00000011", "output": "0" },
            { "input": "00000010", "output": "1" }
        ]
    },
    {
        "title": "Fast Physics Inverse Sqrt",
        "difficulty": "Hard",
        "category": "Bit Manipulation",
        "xp": 1000,
        "description": "For high-speed aerodynamic calculations, standard `sqrt` is too slow. Implement the Fast Inverse Square Root bit-hacking algorithm (approximated) for float `1/sqrt(x)`.",
        "starter_code": "#include <stdint.h>\n\nfloat Q_rsqrt(float number) {\n    // TODO: Implement the 0x5f3759df magic constant hack\n    return 0.0f;\n}",
        "test_cases": [
            { "input": "4.0", "output": "~0.5" }
        ]
    }
];

const escapeSql = (str: string) => str.replace(/'/g, "''");

const sqlStatements = puzzlesData.map(p => {
    const title = escapeSql(p.title);
    const slug = slugify(p.title);
    const description = escapeSql(p.description);
    const difficulty = escapeSql(p.difficulty);
    const category = escapeSql(p.category);
    const starter_code = escapeSql(p.starter_code);
    const test_cases = escapeSql(JSON.stringify(p.test_cases));

    return `INSERT INTO puzzles (title, slug, description, difficulty, category, starter_code, test_cases, xp_reward, is_ai_generated) VALUES ('${title}', '${slug}', '${description}', '${difficulty}', '${category}', '${starter_code}', '${test_cases}', ${p.xp}, true);`;
});

const chunkSize = 5;
for (let i = 0; i < sqlStatements.length; i += chunkSize) {
    const chunk = sqlStatements.slice(i, i + chunkSize);
    fs.writeFileSync(`seed_chunk_${(i / chunkSize) + 1}.sql`, chunk.join('\n'));
    console.log(`Generated seed_chunk_${(i / chunkSize) + 1}.sql`);
}
