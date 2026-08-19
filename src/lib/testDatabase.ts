import { supabase } from './supabase'

export async function testDatabaseConnection() {
  const { data, error } = await supabase
    .from('categories')
    .select('id, name')
    .limit(5)

  if (error) {
    console.error('❌ Supabase connection failed:', error)

    return false
  }

  console.log('✅ Supabase connected successfully')
  console.log('Categories:', data)

  return true
}