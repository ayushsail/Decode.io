'use server'

import { createClient } from '@/utils/supabase/server'

export async function getPuzzles() {
    const supabase = await createClient()

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
    const supabase = await createClient()
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

export async function getPuzzleById(id: string) {
    const supabase = await createClient()

    const { data: puzzle, error } = await supabase
        .from('puzzles')
        .select('*')
        .eq('id', id)
        .single()

    if (error) {
        console.error('Error fetching puzzle:', error)
        return null
    }

    return puzzle
}

export async function getLeaderboard() {
    const supabase = await createClient()

    const { data: profiles, error } = await supabase
        .from('profiles')
        .select('username, xp, country, avatar_url') // Assuming 'country' exists or we mock it in query if not in schema
        .order('xp', { ascending: false })
        .limit(50)

    if (error) {
        console.error('Error fetching leaderboard:', error)
        return []
    }

    return profiles.map((p: any, index: number) => ({
        rank: index + 1,
        name: p.username || 'Anonymous',
        xp: p.xp?.toLocaleString() || '0',
        country: 'Unknown', // Schema didn't have country, defaulting
        highlight: false // Logic to highlight current user can be added if we pass currentUserId
    }))
}
