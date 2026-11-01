import { Navigate, Outlet, Route, Routes } from 'react-router'
import { useAuth } from './auth/auth-context.js'
import { Brand } from './components/Brand.jsx'
import { LoadingScreen } from './components/LoadingScreen.jsx'
import { AuthPage } from './pages/AuthPage.jsx'

function ProtectedRoute() {
  const { user, isRestoring } = useAuth()

  if (isRestoring) return <LoadingScreen label="Restoring your workspace" />
  return user ? <Outlet /> : <Navigate to="/login" replace />
}

function GuestRoute() {
  const { user, isRestoring } = useAuth()

  if (isRestoring) return <LoadingScreen label="Checking your session" />
  return user ? <Navigate to="/projects" replace /> : <Outlet />
}

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<GuestRoute />}>
        <Route path="/login" element={<AuthPage mode="login" />} />
        <Route path="/register" element={<AuthPage mode="register" />} />
      </Route>
      <Route element={<ProtectedRoute />}>
        <Route path="/projects" element={<SessionPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/projects" replace />} />
    </Routes>
  )
}
function SessionPage() {
  const { user, logout } = useAuth()

  return (
    <main className="grid min-h-svh place-items-center bg-[#f5f6f8] px-5 text-zinc-900">
      <section className="w-full max-w-md rounded-md border border-zinc-200 bg-white p-6">
        <Brand />
        <h1 className="mt-6 text-xl font-extrabold">{user.name}</h1>
        <p className="mt-2 text-sm text-zinc-500">{user.email}</p>
        <button className="mt-6 rounded-md bg-zinc-950 px-4 py-2 text-sm font-bold text-white" type="button" onClick={logout}>
          Sign out
        </button>
      </section>
    </main>
  )
}
