import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function ApplyStandard() {
  const [form, setForm] = useState({
    businessName: '',
    industry: '',
    annualRevenue: '',
    loanAmount: '',
    employeeCount: '',
    yearsInBusiness: '',
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
    const years = parseFloat(form.yearsInBusiness) || 0
    const employees = parseFloat(form.employeeCount) || 0

    let score = 50
    if (revenue > 0 && loan > 0 && revenue / loan > 2) score -= 15
    if (years >= 3) score -= 10
    if (employees >= 5) score -= 5
    if (revenue < 100000) score += 15
    if (years < 1) score += 20
    score = Math.max(0, Math.min(100, score))

    const level = score < 30 ? 'low' : score < 60 ? 'medium' : 'high'
    const features = [
      { name: 'Annual Revenue', importance: 0.35, impact: revenue > 500000 ? 'positive' : 'negative' },
      { name: 'Loan-to-Revenue', importance: 0.28, impact: loan < revenue ? 'positive' : 'negative' },
      { name: 'Years in Business', importance: 0.22, impact: years >= 2 ? 'positive' : 'negative' },
      { name: 'Employee Count', importance: 0.15, impact: employees >= 3 ? 'positive' : 'neutral' },
    ]

    return { score, level, confidence: 0.87, features }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const result = calculateRisk()
    setAssessment(result)
    setSubmitted(true)
    const apps = JSON.parse(localStorage.getItem('applications') || '[]')
    apps.push({ id: Date.now(), ...form, assessment: result, type: 'standard' })
    localStorage.setItem('applications', JSON.stringify(apps))
  }

  if (submitted && assessment) {
    return (
      <div className="result-page">
        <h1>Risk Assessment Result</h1>
        <div className={`risk-badge ${assessment.level}`}>
          <span className="score">{assessment.score}</span>
          <span className="label">Risk Score</span>
        </div>
        <p className="level-text">
          Risk Level: <strong>{assessment.level.toUpperCase()}</strong>
          {' '}• Confidence: {(assessment.confidence * 100).toFixed(0)}%
        </p>
        <div className="feature-importance">
          <h3>Feature Importance</h3>
          {assessment.features.map((f, i) => (
            <div key={i} className="feature-row">
              <span>{f.name}</span>
              <div className="bar-wrap">
                <div className="bar" style={{ width: `${f.importance * 100}%`, backgroundColor: f.impact === 'positive' ? '#22c55e' : f.impact === 'negative' ? '#ef4444' : '#94a3b8' }} />
              </div>
              <span>{(f.importance * 100).toFixed(0)}%</span>
            </div>
          ))}
        </div>
        <button onClick={() => navigate('/dashboard')} className="btn-primary">View Dashboard</button>
      </div>
    )
  }

  return (
    <div className="form-page">
      <h1>Standard Loan Application</h1>
      <form onSubmit={handleSubmit} className="application-form">
        <section>
          <h2>Business Information</h2>
          <div className="form-row">
            <div className="form-group">
              <label>Business Name</label>
              <input name="businessName" value={form.businessName} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Industry</label>
              <input name="industry" value={form.industry} onChange={handleChange} placeholder="e.g. Retail" />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Annual Revenue ($)</label>
              <input name="annualRevenue" type="number" value={form.annualRevenue} onChange={handleChange} placeholder="500000" />
            </div>
            <div className="form-group">
              <label>Employee Count</label>
              <input name="employeeCount" type="number" value={form.employeeCount} onChange={handleChange} placeholder="10" />
            </div>
            <div className="form-group">
              <label>Years in Business</label>
              <input name="yearsInBusiness" type="number" step="0.5" value={form.yearsInBusiness} onChange={handleChange} placeholder="3" />
            </div>
          </div>
        </section>
        <section>
          <h2>Loan Request</h2>
          <div className="form-group">
            <label>Loan Amount ($)</label>
            <input name="loanAmount" type="number" value={form.loanAmount} onChange={handleChange} required placeholder="100000" />
          </div>
        </section>
        <button type="submit" className="btn-primary">Submit Application</button>
      </form>
    </div>
  )
}
