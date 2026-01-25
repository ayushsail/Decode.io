'use server'

import { createClient } from '@/utils/supabase/server'

export async function getUserData() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) return null;

    // Parallel fetch profile and submissions
    const [profileResult, submissionsResult] = await Promise.all([
        supabase.from('profiles').select('*').eq('id', user.id).single(),
        supabase.from('submissions').select('puzzle_id').eq('user_id', user.id).eq('status', 'Passed')
    ]);

    if (profileResult.error) return null;

    const completed_puzzles = submissionsResult.data ? submissionsResult.data.map(s => s.puzzle_id) : [];

    return {
        ...profileResult.data,
        completed_puzzles
    };
}
