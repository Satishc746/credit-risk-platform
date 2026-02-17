import { useState, useEffect } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

export default function Analytics() {
  const [stats, setStats] = useState({ low: 0, medium: 0, high: 0, total: 0 })

  useEffect(() => {
    const apps = JSON.parse(localStorage.getItem('applications') || '[]')
    const low = apps.filter(a => (a.assessment?.score ?? 50) < 30).length
    const medium = apps.filter(a => {
      const s = a.assessment?.score ?? 50
      return s >= 30 && s < 60
    }).length
    const high = apps.filter(a => (a.assessment?.score ?? 50) >= 60).length
    setStats({ low, medium, high, total: apps.length })
  }, [])

  const chartData = [
    { name: 'Low Risk', count: stats.low, fill: '#22c55e' },
    { name: 'Medium Risk', count: stats.medium, fill: '#eab308' },
    { name: 'High Risk', count: stats.high, fill: '#ef4444' },
  ]

  return (
    <div className="analytics">
      <h1>Portfolio Analytics</h1>
      <div className="stats-grid">
        <div className="stat-card">
          <span className="stat-value">{stats.total}</span>
          <span className="stat-label">Total Applications</span>
        </div>
        <div className="stat-card low">
          <span className="stat-value">{stats.low}</span>
          <span className="stat-label">Low Risk</span>
        </div>
        <div className="stat-card medium">
          <span className="stat-value">{stats.medium}</span>
          <span className="stat-label">Medium Risk</span>
        </div>
        <div className="stat-card high">
          <span className="stat-value">{stats.high}</span>
          <span className="stat-label">High Risk</span>
        </div>
      </div>
      <div className="chart-section">
        <h2>Risk Distribution</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis dataKey="name" stroke="#94a3b8" />
            <YAxis stroke="#94a3b8" />
            <Tooltip
              contentStyle={{ background: '#1e293b', border: '1px solid #334155', borderRadius: 8 }}
              labelStyle={{ color: '#e2e8f0' }}
            />
            <Bar dataKey="count" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
