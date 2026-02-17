import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div className="home">
      <section className="hero">
        <h1>AI Credit Risk Assessment</h1>
        <p>Submit loan applications and get instant AI-powered risk scoring for your SMB</p>
        <div className="hero-actions">
          <Link to="/apply" className="btn-primary">Apply for Loan</Link>
          <Link to="/login" className="btn-secondary">Analyst Login</Link>
        </div>
      </section>
      <section className="features">
        <div className="feature-card">
          <h3>Borrower Application</h3>
          <p>Submit Standard or Quick applications with business and financial data</p>
          <Link to="/apply">Apply Now →</Link>
        </div>
        <div className="feature-card">
          <h3>AI Risk Engine</h3>
          <p>Automated risk scoring with explainable AI and confidence metrics</p>
        </div>
        <div className="feature-card">
          <h3>Analyst Dashboard</h3>
          <p>View applications, risk assessments, and portfolio analytics</p>
          <Link to="/login">Login →</Link>
        </div>
      </section>
    </div>
  )
}
