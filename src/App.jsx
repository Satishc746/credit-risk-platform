import { Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout'
import Login from './pages/Login'
import Home from './pages/Home'
import Apply from './pages/Apply'
import ApplyStandard from './pages/ApplyStandard'
import ApplyQuick from './pages/ApplyQuick'
import Dashboard from './pages/Dashboard'
import Analytics from './pages/Analytics'
import ApplicationDetail from './pages/ApplicationDetail'

function ProtectedRoute({ children }) {
  const token = localStorage.getItem('token')
  if (!token) return <Navigate to="/login" replace />
  return children
}

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="apply" element={<Apply />} />
        <Route path="apply/standard" element={<ApplyStandard />} />
        <Route path="apply/quick" element={<ApplyQuick />} />
        <Route
          path="dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="analytics"
          element={
            <ProtectedRoute>
              <Analytics />
            </ProtectedRoute>
          }
        />
        <Route path="application/:id" element={<ApplicationDetail />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
