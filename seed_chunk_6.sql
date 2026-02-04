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