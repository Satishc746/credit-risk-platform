import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function ApplyQuick() {
  const [form, setForm] = useState({
    businessName: '',
    loanAmount: '',
    annualRevenue: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [assessment, setAssessment] = useState(null)
  const navigate = useNavigate()

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const calculateRisk = () => {
    const revenue = parseFloat(form.annualRevenue) || 0
    const loan = parseFloat(form.loanAmount) || 0
    let score = 50
    if (revenue > 0 && loan > 0 && revenue / loan > 2) score -= 20
    if (revenue < 100000) score += 20
    score = Math.max(0, Math.min(100, score))
    const level = score < 30 ? 'low' : score < 60 ? 'medium' : 'high'
    return { score, level, confidence: 0.82 }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const result = calculateRisk()
    setAssessment(result)
    setSubmitted(true)
    const apps = JSON.parse(localStorage.getItem('applications') || '[]')
    apps.push({ id: Date.now(), ...form, assessment: result, type: 'quick' })
    localStorage.setItem('applications', JSON.stringify(apps))
  }

  if (submitted && assessment) {
    return (
      <div className="result-page">
        <h1>Quick Assessment Result</h1>
        <div className={`risk-badge ${assessment.level}`}>
          <span className="score">{assessment.score}</span>
          <span className="label">Risk Score</span>
        </div>
        <p>Risk Level: <strong>{assessment.level.toUpperCase()}</strong></p>
        <button onClick={() => navigate('/dashboard')} className="btn-primary">View Dashboard</button>
      </div>
    )
  }

  return (
    <div className="form-page">
      <h1>Quick Loan Application</h1>
      <form onSubmit={handleSubmit} className="application-form quick-form">
        <div className="form-group">
          <label>Business Name</label>
          <input name="businessName" value={form.businessName} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Loan Amount ($)</label>
          <input name="loanAmount" type="number" value={form.loanAmount} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Annual Revenue ($)</label>
          <input name="annualRevenue" type="number" value={form.annualRevenue} onChange={handleChange} required />
        </div>
        <button type="submit" className="btn-primary">Get Risk Assessment</button>
      </form>
    </div>
  )
}
