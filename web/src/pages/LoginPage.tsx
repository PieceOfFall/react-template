import { useState } from 'react'
import type { FormEvent } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../stores/auth'

type LocationState = {
  from?: {
    pathname?: string
  }
}

const LoginPage = () => {
  const login = useAuthStore((state) => state.login)
  const navigate = useNavigate()
  const location = useLocation()
  const [account, setAccount] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const from = (location.state as LocationState | null)?.from?.pathname ?? '/'

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const ok = login(account, password)
    if (!ok) {
      setError('Please enter both account and password.')
      return
    }

    navigate(from, { replace: true })
  }

  return (
    <main className="mx-auto grid min-h-screen w-full max-w-[520px] place-content-center bg-slate-50 px-4">
      <section className="w-full rounded-2xl border border-brand-100 bg-white p-5 shadow-card">
        <h1 className="text-2xl font-semibold text-slate-900">Login to Health Mall</h1>
        <p className="mt-1 text-sm text-slate-500">
          Demo mode: any non-empty account and password will log in successfully.
        </p>

        <form onSubmit={onSubmit} className="mt-5 space-y-3">
          <label className="block">
            <span className="mb-1 block text-sm text-slate-700">Account</span>
            <input
              value={account}
              onChange={(event) => setAccount(event.target.value)}
              className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-brand-400"
              placeholder="Enter account"
            />
          </label>

          <label className="block">
            <span className="mb-1 block text-sm text-slate-700">Password</span>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-brand-400"
              placeholder="Enter password"
            />
          </label>

          {error ? <p className="text-sm text-rose-600">{error}</p> : null}

          <button type="submit" className="w-full rounded-xl bg-brand-600 py-2.5 text-sm font-medium text-white">
            Login
          </button>
        </form>
      </section>
    </main>
  )
}

export default LoginPage
