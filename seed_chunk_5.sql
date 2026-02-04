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