import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseKey);

async function checkPermissions() {
  console.log("Checking distrato_roles_permissions...");
  const { data, error } = await supabase
    .from('distrato_roles_permissions')
    .select('*');

  if (error) {
    console.error("Error:", error);
    return;
  }

  console.log("Data in DB:");
  data?.forEach(row => {
    console.log(`- Role: ${row.role_id}`);
    console.log(`  Permissions: ${JSON.stringify(row.permissions, null, 2)}`);
  });
}

checkPermissions();
