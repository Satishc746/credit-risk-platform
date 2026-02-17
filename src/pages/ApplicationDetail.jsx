import { useParams, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'

export default function ApplicationDetail() {
  const { id } = useParams()
  const [app, setApp] = useState(null)

  useEffect(() => {
    const apps = JSON.parse(localStorage.getItem('applications') || '[]')
    setApp(apps.find(a => String(a.id) === id))
  }, [id])

  if (!app) return <div className="page"><p>Application not found.</p><Link to="/dashboard">Back to Dashboard</Link></div>

  const a = app.assessment
  const level = a?.level || 'medium'

  return (
    <div className="detail-page">
      <Link to="/dashboard" className="back-link">← Back to Dashboard</Link>
      <h1>{app.businessName || 'Application'}</h1>
      <div className="detail-grid">
        <section>
          <h2>Application Details</h2>
          <dl>
            <dt>Business Name</dt>
            <dd>{app.businessName}</dd>
            <dt>Industry</dt>
            <dd>{app.industry || '-'}</dd>
            <dt>Loan Amount</dt>
            <dd>${app.loanAmount ? Number(app.loanAmount).toLocaleString() : '-'}</dd>
            <dt>Annual Revenue</dt>
            <dd>${app.annualRevenue ? Number(app.annualRevenue).toLocaleString() : '-'}</dd>
            <dt>Type</dt>
            <dd>{app.type || 'standard'}</dd>
          </dl>
        </section>
        <section>
          <h2>Risk Assessment</h2>
          <div className={`risk-badge large ${level}`}>
            <span className="score">{a?.score ?? '-'}</span>
            <span className="label">Risk Score</span>
          </div>
          <p>Level: <strong>{level?.toUpperCase()}</strong> • Confidence: {a?.confidence ? `${(a.confidence * 100).toFixed(0)}%` : '-'}</p>
          {a?.features && (
            <div className="feature-importance">
              <h3>Feature Importance</h3>
              {a.features.map((f, i) => (
                <div key={i} className="feature-row">
                  <span>{f.name}</span>
                  <div className="bar-wrap">
                    <div className="bar" style={{ width: `${f.importance * 100}%` }} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  )
}
