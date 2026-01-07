'use server'

import { createClient } from '@/utils/supabase/server'

export async function getPuzzles() {
    const supabase = createClient()

    const { data: puzzles, error } = await supabase
        .from('puzzles')
        .select('*')
        .order('created_at', { ascending: false })

    if (error) {
        console.error('Error fetching puzzles:', error)
        return []
    }

    return puzzles
}

export async function submitPuzzleSolution(puzzleId: string, code: string) {
    constKF supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        return { error: 'Unauthorized' }
    }

    // In a real scenario, you'd send this to an external judge API here.
    // For now, we'll simulate a submission to the DB.

    // 1. Mock "Passed" status
    const status = 'Passed';
    const executionTime = Math.floor(Math.random() * 50) + 1; // 1-50ms

    const { error } = await supabase
        .from('submissions')
        .insert({
            user_id: user.id,
            puzzle_id: puzzleId,
            code_submitted: code,
            status: status,
            execution_time_ms: executionTime
        })

    if (error) {
        console.error('Submission error:', error)
        return { error: 'Failed to submit solution' }
    }

    return { success: true, status, executionTime }
}
