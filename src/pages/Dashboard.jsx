import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

export default function Dashboard() {
  const [applications, setApplications] = useState([])

  useEffect(() => {
    const apps = JSON.parse(localStorage.getItem('applications') || '[]')
    setApplications(apps.reverse())
  }, [])

  const getRiskClass = (score) => score < 30 ? 'low' : score < 60 ? 'medium' : 'high'

  return (
    <div className="dashboard">
      <h1>Applications Dashboard</h1>
      {applications.length === 0 ? (
        <div className="empty-state">
          <p>No applications yet.</p>
          <Link to="/apply" className="btn-primary">Submit Application</Link>
        </div>
      ) : (
        <div className="table-wrap">
          <table className="applications-table">
            <thead>
              <tr>
                <th>Business</th>
                <th>Loan Amount</th>
                <th>Type</th>
                <th>Risk Score</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {applications.map((app) => (
                <tr key={app.id}>
                  <td>{app.businessName || 'N/A'}</td>
                  <td>${app.loanAmount ? Number(app.loanAmount).toLocaleString() : '-'}</td>
                  <td>{app.type || 'standard'}</td>
                  <td>
                    <span className={`risk-pill ${getRiskClass(app.assessment?.score ?? 50)}`}>
                      {app.assessment?.score ?? '-'}
                    </span>
                  </td>
                  <td>
                    <Link to={`/application/${app.id}`}>View</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
