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