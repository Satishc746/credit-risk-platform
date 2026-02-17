import { Link } from 'react-router-dom'

export default function Apply() {
  return (
    <div className="apply-select">
      <h1>Choose Application Type</h1>
      <div className="apply-cards">
        <Link to="/apply/standard" className="apply-card standard">
          <h2>Standard Application</h2>
          <p>Full application with detailed business and financial information</p>
          <span className="cta">Start Application →</span>
        </Link>
        <Link to="/apply/quick" className="apply-card quick">
          <h2>Quick Application</h2>
          <p>Streamlined form for faster submission</p>
          <span className="cta">Start Application →</span>
        </Link>
      </div>
    </div>
  )
}
