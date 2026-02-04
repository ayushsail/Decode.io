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