INSERT INTO puzzles (title, slug, description, difficulty, category, starter_code, test_cases, xp_reward, is_ai_generated) VALUES ('Sensor Calibration Check', 'sensor-calibration-check', 'The autopilot''s initial diagnostic requires checking the pitch sensor array. Given an array of 5 raw sensor readings, return 1 if the deviation between any two readings exceeds the safe threshold of 10 units, indicating a malfunctioning sensor. Otherwise return 0.', 'Easy', 'Algorithms', '#include <stdio.h>
#include <math.h>

int check_pitch_sensors(int* readings, int size) {
    // TODO: Return 1 if unsafe deviation found, 0 if stable
    return 0;
}', '[{"input":"[100, 102, 99, 101, 100]","output":"0"},{"input":"[100, 102, 115, 101, 100]","output":"1"}]', 100, true);
INSERT INTO puzzles (title, slug, description, difficulty, category, starter_code, test_cases, xp_reward, is_ai_generated) VALUES ('Flight Path Sorting', 'flight-path-sorting', 'Incoming flight plans have different priority levels. Implement a sort function to arrange a list of ''FlightPlan'' structures based on their ''urgency'' score in descending order.', 'Medium', 'Algorithms', '#include <stdio.h>

typedef struct {
    int id;
    int urgency;
} FlightPlan;

void sort_flight_plans(FlightPlan* plans, int count) {
    // TODO: Sort array by urgency (descending)
}', '[{"input":"[{1, 5}, {2, 10}, {3, 2}]","output":"[{2, 10}, {1, 5}, {3, 2}]"}]', 200, true);
INSERT INTO puzzles (title, slug, description, difficulty, category, starter_code, test_cases, xp_reward, is_ai_generated) VALUES ('Waypoint Optimization', 'waypoint-optimization', 'The drone needs to visit a set of waypoints to scan an area. Given an adjacency matrix representing distances between waypoints, implement the Nearest Neighbor algorithm to determine an approximate shortest route starting from waypoint 0.', 'Hard', 'Algorithms', '#include <stdio.h>

void optimize_route(int** distance_matrix, int num_waypoints, int* out_route) {
    // TODO: Fill out_route with waypoint indices
}', '[{"input":"Matrix 4x4","output":"[0, 2, 1, 3]"}]', 300, true);
INSERT INTO puzzles (title, slug, description, difficulty, category, starter_code, test_cases, xp_reward, is_ai_generated) VALUES ('LIDAR Collision Avoidance', 'lidar-collision-avoidance', 'You receive a stream of 2D points from the LIDAR. Implement the Convex Hull algorithm (Graham scan or Monotone Chain) to define the safe flyable zone boundary around detected obstacles.', 'Hard', 'Algorithms', '#include <stdio.h>

typedef struct { int x, y; } Point;

int compute_safe_zone(Point* obstacles, int n, Point* hull_output) {
    // TODO: Return size of hull and fill output
    return 0;
}', '[{"input":"[(0,0), (5,0), (2,5), (3,3)]","output":"[(0,0), (5,0), (2,5)]"}]', 500, true);
INSERT INTO puzzles (title, slug, description, difficulty, category, starter_code, test_cases, xp_reward, is_ai_generated) VALUES ('Trajectory Smoothing', 'trajectory-smoothing', 'Raw GPS input is jittery. Implement a Kalman Filter update step for a 1D state (altitude) to estimate the true position giving a measurement and previous estimate.', 'Hard', 'Algorithms', '#include <stdio.h>

typedef struct {
    float estimate;
    float error_cov;
    float q; // Process noise
    float r; // Measurement noise
} KalmanState;

void update_altitude(KalmanState* k, float measurement) {
    // TODO: Update estimate and error_cov
}', '[{"input":"Meas: 102.5","output":"Est: 101.2"}]', 1000, true);
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
INSERT INTO puzzles (title, slug, description, difficulty, category, starter_code, test_cases, xp_reward, is_ai_generated) VALUES ('Telemetry Packet Allocator', 'telemetry-packet-allocator', 'Allocate memory for a telemetry packet of size `n` bytes using `malloc`, initialize it to zero, and ensure it is freed.', 'Easy', 'Memory Management', '#include <stdlib.h>

void* create_packet(size_t size) {
    // TODO: Malloc and check NULL
    return NULL;
}', '[{"input":"size 1024","output":"Valid Pointer or NULL"}]', 100, true);
INSERT INTO puzzles (title, slug, description, difficulty, category, starter_code, test_cases, xp_reward, is_ai_generated) VALUES ('Struct Alignment Check', 'struct-alignment-check', 'Packets sent over radio must be compact. Given a struct with mixed types (char, int, double), manually pack bytes into a buffer to avoid compiler padding issues.', 'Medium', 'Memory Management', '#include <stdint.h>

typedef struct { char type; int id; } Msg;

void serialize(Msg* m, uint8_t* buffer) {
    // TODO: Copy bytes tightly without padding
}', '[{"input":"{''A'', 5}","output":"Buffer len 5 (not 8)"}]', 200, true);
INSERT INTO puzzles (title, slug, description, difficulty, category, starter_code, test_cases, xp_reward, is_ai_generated) VALUES ('Custom Pool Allocator', 'custom-pool-allocator', 'Real-time systems cannot tolerate `malloc` jitter. Implement a fixed-block Memory Pool allocator that returns pointers from a pre-allocated arena.', 'Hard', 'Memory Management', '#include <stddef.h>

void init_pool(void* arena, size_t size);
void* pool_alloc();
void pool_free(void* ptr);
// TODO: Implement pool logic', '[{"input":"alloc() x 3","output":"3 distinct ptrs"}]', 300, true);
INSERT INTO puzzles (title, slug, description, difficulty, category, starter_code, test_cases, xp_reward, is_ai_generated) VALUES ('Flight Controller Leak Detector', 'flight-controller-leak-detector', 'Simulate a memory manager that tracks allocations. Implement `tracked_malloc` and `tracked_free` to maintain a count of active bytes. Return -1 if a double-free is detected.', 'Hard', 'Memory Management', '#include <stdlib.h>

size_t active_bytes = 0;

void* tracked_malloc(size_t size) {
    // TODO
    return NULL;
}

int tracked_free(void* ptr) {
    // TODO
    return 0;
}', '[{"input":"malloc(100)","output":"active_bytes = 100"}]', 500, true);
INSERT INTO puzzles (title, slug, description, difficulty, category, starter_code, test_cases, xp_reward, is_ai_generated) VALUES ('Zero-Copy Buffer Swap', 'zero-copy-buffer-swap', 'To process high-speed camera feeds, we cannot copy image data. Implement a double-buffering scheme where pointers are swapped atomically (simulated) between the Producer (Camera) and Consumer (Vision Algo).', 'Hard', 'Memory Management', '#include <stdint.h>

typedef struct { uint8_t* buffer; } Frame;

void swap_buffers(Frame** front, Frame** back) {
    // TODO: Swap pointers efficiently
}', '[{"input":"Front=A, Back=B","output":"Front=B, Back=A"}]', 1000, true);
INSERT INTO puzzles (title, slug, description, difficulty, category, starter_code, test_cases, xp_reward, is_ai_generated) VALUES ('Config Loader', 'config-loader', 'Read the ''autopilot.conf'' file. Parse the first line to get the PID controller''s P-value (integer).', 'Easy', 'System Programming', '#include <stdio.h>

int load_p_value(const char* filename) {
    // TODO: fopen, fscanf, fclose
    return 0;
}', '[{"input":"File content: ''120''","output":"120"}]', 100, true);
INSERT INTO puzzles (title, slug, description, difficulty, category, starter_code, test_cases, xp_reward, is_ai_generated) VALUES ('Watchdog Timer Reset', 'watchdog-timer-reset', 'The system must ''pet'' the watchdog every 100ms. Implement a function to check system time and write a ''1'' to a simulated watchdog register address if 100ms has passed.', 'Medium', 'System Programming', '#include <time.h>

void check_watchdog(volatile int* watchdog_reg) {
    // TODO: Check clock(), reset if needed
}', '[{"input":"Time > 100ms","output":"*reg = 1"}]', 200, true);
INSERT INTO puzzles (title, slug, description, difficulty, category, starter_code, test_cases, xp_reward, is_ai_generated) VALUES ('Inter-Process Signals', 'inter-process-signals', 'The navigation process failed. Raise a specialized signal (simulated) that triggers the ''Safety Parachute'' deployment handler.', 'Hard', 'System Programming', '#include <signal.h>
#include <stdio.h>

void trigger_emergency() {
    // TODO: raise SIGUSR1
}', '[{"input":"Call func","output":"Signal Raised"}]', 300, true);
INSERT INTO puzzles (title, slug, description, difficulty, category, starter_code, test_cases, xp_reward, is_ai_generated) VALUES ('Multithreaded Sensor Fusion', 'multithreaded-sensor-fusion', 'Simulate a mutex lock for a shared global variable `current_altitude` that is written by the Barometer thread and read by the Control thread.', 'Hard', 'System Programming', '#include <pthread.h>

double current_altitude = 0;
pthread_mutex_t alt_lock;

void update_altitude(double new_val) {
    // TODO: Lock, update, unlock
}', '[{"input":"Concurrent access","output":"No Data Race"}]', 500, true);
INSERT INTO puzzles (title, slug, description, difficulty, category, starter_code, test_cases, xp_reward, is_ai_generated) VALUES ('Direct Register Mapping', 'direct-register-mapping', 'Map a specific physical memory address (0x4000) representing the Motor Controller status register to a pointer and toggle the ''ARM'' bit (Bit 0).', 'Hard', 'System Programming', '#include <stdint.h>

void arm_motors() {
    uintptr_t base_addr = 0x4000; // Simulated
    // TODO: Access memory and set bit 0
}', '[{"input":"Mem 0x00","output":"Mem 0x01"}]', 1000, true);
INSERT INTO puzzles (title, slug, description, difficulty, category, starter_code, test_cases, xp_reward, is_ai_generated) VALUES ('Sensor Array Access', 'sensor-array-access', 'Given a pointer to the start of a float array representing 8 motor speeds, set the 3rd motor (index 2) to 0.0 (shutdown) using pointer arithmetic.', 'Easy', 'Pointers & Arrays', '#include <stdio.h>

void shutdown_motor_3(float* speeds) {
    // TODO: *(speeds + 2) = ...
}', '[{"input":"[1.0, 1.0, 1.0...]","output":"[1.0, 1.0, 0.0...]"}]', 100, true);
INSERT INTO puzzles (title, slug, description, difficulty, category, starter_code, test_cases, xp_reward, is_ai_generated) VALUES ('Gyro Rotation Matrix', 'gyro-rotation-matrix', 'Apply a rotation matrix to a 3D vector. Pass the vector array to a function `rotate` that modifies it in-place given a 3x3 matrix.', 'Medium', 'Pointers & Arrays', '#include <stdio.h>

void rotate(float vector[3], float matrix[3][3]) {
    // TODO: Matrix-Vector multiplication logic
}', '[{"input":"Vec [1,0,0], 90deg Z-rot","output":"Vec [0,1,0]"}]', 200, true);
INSERT INTO puzzles (title, slug, description, difficulty, category, starter_code, test_cases, xp_reward, is_ai_generated) VALUES ('Dynamic Flight Plan', 'dynamic-flight-plan', 'A Flight Plan is a list of strings (city names). Use a double pointer `char**` to represent this list and implement a function to swap two waypoints.', 'Hard', 'Pointers & Arrays', '#include <stdio.h>

void swap_cities(char** plan, int i, int j) {
    // TODO: Swap the pointers at i and j
}', '[{"input":"[''A'', ''B''], swap 0,1","output":"[''B'', ''A'']"}]', 300, true);
INSERT INTO puzzles (title, slug, description, difficulty, category, starter_code, test_cases, xp_reward, is_ai_generated) VALUES ('LIDAR Byte Stream Parser', 'lidar-byte-stream-parser', 'LIDAR returns a raw byte stream. Packets start with 0xFF. Search a buffer using pointer incrementing to find the start of the frame and return the pointer to it.', 'Hard', 'Pointers & Arrays', '#include <stdint.h>

uint8_t* find_sync_byte(uint8_t* stream, int len) {
    // TODO: Return ptr to 0xFF or NULL
    return NULL;
}', '[{"input":"[0x00, 0xAA, 0xFF, 0x01]","output":"Ptr to index 2"}]', 500, true);
INSERT INTO puzzles (title, slug, description, difficulty, category, starter_code, test_cases, xp_reward, is_ai_generated) VALUES ('Autopilot Mode State Machine', 'autopilot-mode-state-machine', 'Implement the autopilot logic using an array of Function Pointers. Index 0 = ''Stabilize'', 1 = ''Loiter'', 2 = ''RTL''. Call the function corresponding to the current `mode_id`.', 'Hard', 'Pointers & Arrays', '#include <stdio.h>

typedef void (*ModeFunc)(void);

void run_mode(int mode_id, ModeFunc* modes) {
    // TODO: Execute modes[mode_id]()
}', '[{"input":"mode 1","output":"Executes Loiter func"}]', 1000, true);
INSERT INTO puzzles (title, slug, description, difficulty, category, starter_code, test_cases, xp_reward, is_ai_generated) VALUES ('Status Flag Reader', 'status-flag-reader', 'The system status is encoded in a byte. Check if the ''GPS Lock'' bit (Bit 3, value 8) is set.', 'Easy', 'Bit Manipulation', '#include <stdint.h>

int is_gps_locked(uint8_t status) {
    // TODO: Mask and checking
    return 0;
}', '[{"input":"0x08","output":"1"},{"input":"0x00","output":"0"}]', 100, true);
INSERT INTO puzzles (title, slug, description, difficulty, category, starter_code, test_cases, xp_reward, is_ai_generated) VALUES ('Control Surface Masking', 'control-surface-masking', 'We need to deploy Flaps (Bit 1) and Gear (Bit 2) simultaneously without affecting other bits. Write a function to set these bits in a control integer.', 'Medium', 'Bit Manipulation', '#include <stdint.h>

void deploy_landing_config(uint8_t* control_reg) {
    // TODO: Set bits 1 and 2
}', '[{"input":"00000000","output":"00000110"}]', 200, true);
INSERT INTO puzzles (title, slug, description, difficulty, category, starter_code, test_cases, xp_reward, is_ai_generated) VALUES ('Telemetry Bit Packing', 'telemetry-bit-packing', 'Compress two 4-bit sensor values (range 0-15) into a single 8-bit byte. Value A goes in the high nibble, B in the low nibble.', 'Hard', 'Bit Manipulation', '#include <stdint.h>

uint8_t pack_sensors(uint8_t sensA, uint8_t sensB) {
    // TODO: Shift and OR
    return 0;
}', '[{"input":"A=0xF, B=0x1","output":"0xF1"}]', 300, true);
INSERT INTO puzzles (title, slug, description, difficulty, category, starter_code, test_cases, xp_reward, is_ai_generated) VALUES ('Hamming Code Parity', 'hamming-code-parity', 'Radio interference is common. Implement a function to calculate the Parity Bit (Even parity) for a given 8-bit data byte. Return 1 if the number of set bits is odd, 0 otherwise.', 'Hard', 'Bit Manipulation', '#include <stdint.h>

int calculate_parity(uint8_t data) {
    // TODO: Count set bits
    return 0;
}', '[{"input":"00000011","output":"0"},{"input":"00000010","output":"1"}]', 500, true);
INSERT INTO puzzles (title, slug, description, difficulty, category, starter_code, test_cases, xp_reward, is_ai_generated) VALUES ('Fast Physics Inverse Sqrt', 'fast-physics-inverse-sqrt', 'For high-speed aerodynamic calculations, standard `sqrt` is too slow. Implement the Fast Inverse Square Root bit-hacking algorithm (approximated) for float `1/sqrt(x)`.', 'Hard', 'Bit Manipulation', '#include <stdint.h>

float Q_rsqrt(float number) {
    // TODO: Implement the 0x5f3759df magic constant hack
    return 0.0f;
}', '[{"input":"4.0","output":"~0.5"}]', 1000, true);