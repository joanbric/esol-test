import { turso } from '@/libs/db'
import { NextRequest, NextResponse } from 'next/server'

// Table: test_access_logs
// Columns: id (PK), ip TEXT, test_id INT, access_date DATE

export async function POST(request: NextRequest) {
  // Get IP address from headers (x-forwarded-for) or fallback
  let ip = request.headers.get('x-forwarded-for')
  if (ip && ip.includes(',')) ip = ip.split(',')[0].trim()
  if (!ip) ip = 'unknown'

  const { testId } = await request.json()
  if (!ip || !testId) {
    return NextResponse.json({ allowed: false, reason: 'Missing IP or testId' }, { status: 400 })
  }
  const today = new Date().toISOString().slice(0, 10)
  // Check if this IP already accessed this test today
  const check = await turso.execute({
    sql: 'SELECT id FROM test_access_logs WHERE ip = ? AND test_id = ? AND access_date = ?',
    args: [ip, testId, today]
  })
  if (check.rows.length > 0) {
    const hasResolved = await turso.execute({
      sql: 'SELECT id FROM test_solved_by_users WHERE user_id = ? AND test_id = ?',
      args: [ip, testId]
    })
    if (hasResolved.rows.length > 0) {
      return NextResponse.json({ allowed: false, reason: 'already-solved' }, { status: 403 })
    }
    return NextResponse.json({ allowed: true })
  }
  // Register access
  await turso.execute({
    sql: `CREATE TABLE IF NOT EXISTS test_access_logs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      ip TEXT,
      test_id INT,
      access_date DATE
    )`,
    args: []
  })
  await turso.execute({
    sql: 'INSERT INTO test_access_logs (ip, test_id, access_date) VALUES (?, ?, ?)',
    args: [ip, testId, today]
  })
  return NextResponse.json({ allowed: true })
}
