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