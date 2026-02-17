import { Outlet, Link, useNavigate } from 'react-router-dom'

export default function Layout() {
  const navigate = useNavigate()
  const token = localStorage.getItem('token')

  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate('/login')
  }

  return (
    <div className="layout">
      <header className="header">
        <Link to="/" className="logo">Credit Risk Platform</Link>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/apply">Apply</Link>
          {token && (
            <>
              <Link to="/dashboard">Dashboard</Link>
              <Link to="/analytics">Analytics</Link>
              <button onClick={handleLogout} className="btn-logout">Logout</button>
            </>
          )}
          {!token && <Link to="/login">Login</Link>}
        </nav>
      </header>
      <main className="main">
        <Outlet />
      </main>
      <footer className="footer">© Credit Risk Assessment Platform</footer>
    </div>
  )
}
