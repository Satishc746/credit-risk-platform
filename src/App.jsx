import { useState } from 'react'

export default function App() {
  const [activeTab, setActiveTab] = useState('home')

  return (
    <div className="app">
      <header>
        <h1>Credit Risk Assessment Platform</h1>
        <nav>
          <button
            className={activeTab === 'home' ? 'active' : ''}
            onClick={() => setActiveTab('home')}
          >
            Home
          </button>
          <button
            className={activeTab === 'about' ? 'active' : ''}
            onClick={() => setActiveTab('about')}
          >
            About
          </button>
        </nav>
      </header>
      <main>
        {activeTab === 'home' && (
          <section>
            <h2>Welcome</h2>
            <p>AI-powered credit risk assessment for SMB loan applications.</p>
            <div className="card">
              <h3>✓ Deployed Successfully</h3>
              <p>Your application is running on AWS Amplify.</p>
            </div>
          </section>
        )}
        {activeTab === 'about' && (
          <section>
            <h2>About</h2>
            <p>This platform provides automated risk scoring and analytics.</p>
          </section>
        )}
      </main>
      <footer>© Credit Risk Platform</footer>
    </div>
  )
}
