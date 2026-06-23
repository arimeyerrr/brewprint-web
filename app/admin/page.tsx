'use client'

import { useState } from 'react'

const ADMIN_FN = 'https://tftaftmbadjfntmqdjle.supabase.co/functions/v1/waitlist-admin'

type Entry = { email: string; audience_type: string; created_at: string }

export default function AdminPage() {
  const [password, setPassword] = useState('')
  const [entries, setEntries] = useState<Entry[] | null>(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    const res = await fetch(`${ADMIN_FN}?password=${encodeURIComponent(password)}`)
    const json = await res.json()
    setLoading(false)
    if (!res.ok) {
      setError('Wrong password.')
    } else {
      setEntries(json.data)
    }
  }

  const exportCSV = () => {
    if (!entries) return
    const rows = [['Email', 'Type', 'Signed Up'], ...entries.map(e => [e.email, e.audience_type, new Date(e.created_at).toLocaleDateString()])]
    const csv = rows.map(r => r.join(',')).join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'brewprint-waitlist.csv'
    a.click()
  }

  if (entries) {
    return (
      <div style={{ fontFamily: 'sans-serif', maxWidth: 700, margin: '60px auto', padding: '0 24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
          <div>
            <h1 style={{ fontSize: 28, fontWeight: 700, margin: 0 }}>Waitlist</h1>
            <p style={{ color: '#888', margin: '4px 0 0' }}>{entries.length} signup{entries.length !== 1 ? 's' : ''}</p>
          </div>
          <button
            onClick={exportCSV}
            style={{ background: '#111', color: '#fff', border: 'none', borderRadius: 8, padding: '10px 20px', cursor: 'pointer', fontSize: 14 }}
          >
            Export CSV
          </button>
        </div>

        {entries.length === 0 ? (
          <p style={{ color: '#888' }}>No signups yet.</p>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #eee', textAlign: 'left' }}>
                <th style={{ padding: '10px 12px', color: '#888', fontWeight: 500 }}>Email</th>
                <th style={{ padding: '10px 12px', color: '#888', fontWeight: 500 }}>Type</th>
                <th style={{ padding: '10px 12px', color: '#888', fontWeight: 500 }}>Signed Up</th>
              </tr>
            </thead>
            <tbody>
              {entries.map((e, i) => (
                <tr key={i} style={{ borderBottom: '1px solid #f0f0f0' }}>
                  <td style={{ padding: '12px 12px' }}>{e.email}</td>
                  <td style={{ padding: '12px 12px' }}>
                    <span style={{
                      background: e.audience_type === 'owner' ? '#fff3e0' : '#e8f5e9',
                      color: e.audience_type === 'owner' ? '#e65100' : '#2e7d32',
                      borderRadius: 4, padding: '2px 8px', fontSize: 12, fontWeight: 500
                    }}>
                      {e.audience_type === 'owner' ? 'Shop Owner' : 'Coffee Lover'}
                    </span>
                  </td>
                  <td style={{ padding: '12px 12px', color: '#888' }}>
                    {new Date(e.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    )
  }

  return (
    <div style={{ fontFamily: 'sans-serif', maxWidth: 360, margin: '120px auto', padding: '0 24px' }}>
      <h1 style={{ fontSize: 24, fontWeight: 700, marginBottom: 8 }}>Admin</h1>
      <p style={{ color: '#888', marginBottom: 28, fontSize: 14 }}>Enter your password to view the waitlist.</p>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="Password"
          required
          style={{ border: '1px solid #ddd', borderRadius: 8, padding: '12px 16px', fontSize: 15, outline: 'none' }}
        />
        {error && <p style={{ color: '#e53e3e', fontSize: 13, margin: 0 }}>{error}</p>}
        <button
          type="submit"
          disabled={loading}
          style={{ background: '#111', color: '#fff', border: 'none', borderRadius: 8, padding: '12px', fontSize: 15, cursor: 'pointer', opacity: loading ? 0.6 : 1 }}
        >
          {loading ? 'Loading…' : 'View Waitlist'}
        </button>
      </form>
    </div>
  )
}
