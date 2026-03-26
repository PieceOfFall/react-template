import { NavLink, Outlet } from 'react-router-dom'
import { useAuthStore } from './stores/auth'

const App = () => {
  const logout = useAuthStore((state) => state.logout)

  return (
    <div className="mx-auto min-h-screen w-full max-w-[520px] bg-slate-50">
      <div className="min-h-[calc(100vh-66px)]">
        <Outlet />
      </div>

      <nav className="fixed inset-x-0 bottom-0 z-20 mx-auto grid w-full max-w-[520px] grid-cols-4 border-t border-slate-200 bg-white/95 backdrop-blur">
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            `grid place-items-center py-3 text-sm ${
              isActive ? 'font-semibold text-brand-600' : 'text-slate-500'
            }`
          }
        >
          Home
        </NavLink>
        <button type="button" disabled className="py-3 text-sm text-slate-400">
          Category
        </button>
        <button type="button" disabled className="py-3 text-sm text-slate-400">
          Cart
        </button>
        <NavLink
          to="/me"
          className={({ isActive }) =>
            `grid place-items-center py-3 text-sm ${
              isActive ? 'font-semibold text-brand-600' : 'text-slate-500'
            }`
          }
        >
          Me
        </NavLink>
      </nav>

      <button
        type="button"
        onClick={logout}
        className="fixed right-3 top-3 rounded-full border border-brand-200 bg-white px-3 py-1 text-xs text-brand-700 shadow-sm"
      >
        Logout
      </button>
    </div>
  )
}

export default App
