import { useState } from 'react'

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export default function LoginForm() {
  const [companyCode, setCompanyCode] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess(null)

    if (!companyCode || !email || !password) {
      setError('Please fill in all fields')
      return
    }

    setLoading(true)
    try {
      const res = await fetch(`${BACKEND_URL}/auth/b2b/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ company_code: companyCode.trim().toUpperCase(), email: email.trim().toLowerCase(), password }),
      })

      const data = await res.json()
      if (data.status === 'success') {
        setSuccess(data.user)
      } else {
        setError(data.message || 'Login failed')
      }
    } catch (err) {
      setError('Unable to reach server')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-white/90 backdrop-blur border border-slate-200 rounded-2xl p-8 shadow-xl w-full max-w-md">
      <h2 className="text-2xl font-semibold text-slate-900 mb-6">B2B Portal Login</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Company Code</label>
          <input
            type="text"
            value={companyCode}
            onChange={(e) => setCompanyCode(e.target.value)}
            placeholder="ACME"
            className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Work Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@company.com"
            className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {error && <p className="text-sm text-red-600">{error}</p>}
        {success && (
          <div className="text-sm text-green-700 bg-green-50 border border-green-200 rounded-lg p-3">
            Logged in as {success.name} ({success.email}) - {success.company_code}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white font-semibold py-2.5 rounded-lg transition"
        >
          {loading ? 'Signing in...' : 'Sign in'}
        </button>
      </form>
      <p className="mt-4 text-xs text-slate-500">Use your company code and work email to access your tenant.</p>
    </div>
  )
}
