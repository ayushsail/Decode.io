import { createClient } from '@supabase/supabase-js';
import * as fs from 'fs';
import * as path from 'path';

// Manual .env.local loader
const envPath = path.resolve(process.cwd(), '.env.local');
const envContent = fs.readFileSync(envPath, 'utf8');
const env: Record<string, string> = {};
envContent.split('\n').forEach(line => {
    const [key, value] = line.split('=');
    if (key && value) env[key.trim()] = value.trim();
});

const supabaseUrl = env['NEXT_PUBLIC_SUPABASE_URL'];
const supabaseKey = env['NEXT_PUBLIC_SUPABASE_ANON_KEY'];

if (!supabaseUrl || !supabaseKey) {
    console.error('Missing Supabase credentials');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkPuzzles() {
    const { data: puzzles, error } = await supabase.from('puzzles').select('category, difficulty');
    if (error) {
        console.error('Error:', error);
        return;
    }

    const stats: Record<string, Record<string, number>> = {};
    puzzles.forEach(p => {
        if (!stats[p.category]) stats[p.category] = { Easy: 0, Medium: 0, Hard: 0 };
        if (stats[p.category][p.difficulty] !== undefined) {
            stats[p.category][p.difficulty]++;
        }
    });

    console.log('Puzzle Counts:', JSON.stringify(stats, null, 2));
    console.log('Total Puzzles:', puzzles.length);
}

checkPuzzles();
