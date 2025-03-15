// This is a single JSX file with all components defined together

// Main App Component
function AnalyticsDashboard() {
    return (
      <div style={{ display: 'flex', height: '100vh' }}>
        {/* Sidebar Component */}
        <div style={{ width: '250px', borderRight: '1px solid #e2e8f0' }}>
          <div style={{ padding: '16px', borderBottom: '1px solid #e2e8f0' }}>
            <h2 style={{ margin: 0 }}>Sitemark-web</h2>
            <p style={{ margin: 0, fontSize: '14px', color: '#64748b' }}>Web app</p>
          </div>
          
          <nav style={{ padding: '8px' }}>
            <a href="/" style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 16px', textDecoration: 'none', color: '#64748b' }}>
              <span>🏠</span> Home
            </a>
            <a href="/analytics" style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 16px', textDecoration: 'none', color: '#64748b' }}>
              <span>📊</span> Analytics
            </a>
            <a href="/clients" style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 16px', textDecoration: 'none', color: '#64748b' }}>
              <span>👥</span> Clients
            </a>
            <a href="/tasks" style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 16px', textDecoration: 'none', color: '#64748b' }}>
              <span>✓</span> Tasks
            </a>
            <a href="/settings" style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 16px', textDecoration: 'none', color: '#64748b' }}>
              <span>⚙️</span> Settings
            </a>
            <a href="/about" style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 16px', textDecoration: 'none', color: '#64748b' }}>
              <span>ℹ️</span> About
            </a>
            <a href="/feedback" style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 16px', textDecoration: 'none', color: '#64748b' }}>
              <span>💬</span> Feedback
            </a>
          </nav>
          
          <div style={{ padding: '16px', borderTop: '1px solid #e2e8f0', marginTop: 'auto', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#e2e8f0' }}></div>
            <div>
              <p style={{ margin: 0, fontWeight: 500 }}>Riley Carter</p>
              <p style={{ margin: 0, fontSize: '14px', color: '#64748b' }}>riley@email.com</p>
            </div>
          </div>
        </div>
        
        {/* Main Content */}
        <div style={{ flex: 1, padding: '32px', overflow: 'auto' }}>
          <h1 style={{ marginBottom: '24px' }}>Details</h1>
          
          {/* Data Table */}
          <div style={{ border: '1px solid #e2e8f0', borderRadius: '6px', overflow: 'hidden' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th style={{ padding: '12px 16px', textAlign: 'left', backgroundColor: '#f8fafc', fontWeight: 500, borderBottom: '1px solid #e2e8f0' }}>Page Title</th>
                  <th style={{ padding: '12px 16px', textAlign: 'left', backgroundColor: '#f8fafc', fontWeight: 500, borderBottom: '1px solid #e2e8f0' }}>Status</th>
                  <th style={{ padding: '12px 16px', textAlign: 'left', backgroundColor: '#f8fafc', fontWeight: 500, borderBottom: '1px solid #e2e8f0' }}>Users</th>
                  <th style={{ padding: '12px 16px', textAlign: 'left', backgroundColor: '#f8fafc', fontWeight: 500, borderBottom: '1px solid #e2e8f0' }}>Event Count</th>
                  <th style={{ padding: '12px 16px', textAlign: 'left', backgroundColor: '#f8fafc', fontWeight: 500, borderBottom: '1px solid #e2e8f0' }}>Views per User</th>
                  <th style={{ padding: '12px 16px', textAlign: 'left', backgroundColor: '#f8fafc', fontWeight: 500, borderBottom: '1px solid #e2e8f0' }}>Average Time</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ padding: '12px 16px', borderBottom: '1px solid #e2e8f0' }}>Homepage Overview</td>
                  <td style={{ padding: '12px 16px', borderBottom: '1px solid #e2e8f0' }}>
                    <span style={{ display: 'inline-block', padding: '2px 8px', borderRadius: '9999px', fontSize: '12px', backgroundColor: '#dcfce7', color: '#166534' }}>Online</span>
                  </td>
                  <td style={{ padding: '12px 16px', borderBottom: '1px solid #e2e8f0' }}>212423</td>
                  <td style={{ padding: '12px 16px', borderBottom: '1px solid #e2e8f0' }}>8345</td>
                  <td style={{ padding: '12px 16px', borderBottom: '1px solid #e2e8f0' }}>18.5</td>
                  <td style={{ padding: '12px 16px', borderBottom: '1px solid #e2e8f0' }}>2m 15s</td>
                </tr>
                <tr>
                  <td style={{ padding: '12px 16px', borderBottom: '1px solid #e2e8f0' }}>Product Details - Gadgets</td>
                  <td style={{ padding: '12px 16px', borderBottom: '1px solid #e2e8f0' }}>
                    <span style={{ display: 'inline-block', padding: '2px 8px', borderRadius: '9999px', fontSize: '12px', backgroundColor: '#dcfce7', color: '#166534' }}>Online</span>
                  </td>
                  <td style={{ padding: '12px 16px', borderBottom: '1px solid #e2e8f0' }}>172240</td>
                  <td style={{ padding: '12px 16px', borderBottom: '1px solid #e2e8f0' }}>5653</td>
                  <td style={{ padding: '12px 16px', borderBottom: '1px solid #e2e8f0' }}>9.7</td>
                  <td style={{ padding: '12px 16px', borderBottom: '1px solid #e2e8f0' }}>2m 30s</td>
                </tr>
                <tr>
                  <td style={{ padding: '12px 16px', borderBottom: '1px solid #e2e8f0' }}>Checkout Process - Step 1</td>
                  <td style={{ padding: '12px 16px', borderBottom: '1px solid #e2e8f0' }}>
                    <span style={{ display: 'inline-block', padding: '2px 8px', borderRadius: '9999px', fontSize: '12px', backgroundColor: '#f1f5f9', color: '#64748b' }}>Offline</span>
                  </td>
                  <td style={{ padding: '12px 16px', borderBottom: '1px solid #e2e8f0' }}>58240</td>
                  <td style={{ padding: '12px 16px', borderBottom: '1px solid #e2e8f0' }}>3455</td>
                  <td style={{ padding: '12px 16px', borderBottom: '1px solid #e2e8f0' }}>15.2</td>
                  <td style={{ padding: '12px 16px', borderBottom: '1px solid #e2e8f0' }}>2m 10s</td>
                </tr>
                <tr>
                  <td style={{ padding: '12px 16px', borderBottom: '1px solid #e2e8f0' }}>User Profile Dashboard</td>
                  <td style={{ padding: '12px 16px', borderBottom: '1px solid #e2e8f0' }}>
                    <span style={{ display: 'inline-block', padding: '2px 8px', borderRadius: '9999px', fontSize: '12px', backgroundColor: '#dcfce7', color: '#166534' }}>Online</span>
                  </td>
                  <td style={{ padding: '12px 16px', borderBottom: '1px solid #e2e8f0' }}>96240</td>
                  <td style={{ padding: '12px 16px', borderBottom: '1px solid #e2e8f0' }}>112543</td>
                  <td style={{ padding: '12px 16px', borderBottom: '1px solid #e2e8f0' }}>4.5</td>
                  <td style={{ padding: '12px 16px', borderBottom: '1px solid #e2e8f0' }}>2m 40s</td>
                </tr>
                <tr>
                  <td style={{ padding: '12px 16px', borderBottom: '1px solid #e2e8f0' }}>Article Listing - Tech News</td>
                  <td style={{ padding: '12px 16px', borderBottom: '1px solid #e2e8f0' }}>
                    <span style={{ display: 'inline-block', padding: '2px 8px', borderRadius: '9999px', fontSize: '12px', backgroundColor: '#f1f5f9', color: '#64748b' }}>Offline</span>
                  </td>
                  <td style={{ padding: '12px 16px', borderBottom: '1px solid #e2e8f0' }}>142240</td>
                  <td style={{ padding: '12px 16px', borderBottom: '1px solid #e2e8f0' }}>3653</td>
                  <td style={{ padding: '12px 16px', borderBottom: '1px solid #e2e8f0' }}>3.1</td>
                  <td style={{ padding: '12px 16px', borderBottom: '1px solid #e2e8f0' }}>2m 55s</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        
        {/* Product Tree */}
        <div style={{ width: '250px', padding: '16px', borderLeft: '1px solid #e2e8f0' }}>
          <h2 style={{ marginBottom: '16px' }}>Product tree</h2>
          
          <div>
            <div style={{ marginBottom: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <span>▼</span>
                <span>Website</span>
              </div>
              
              <div style={{ marginLeft: '16px' }}>
                <div style={{ padding: '4px 0' }}>
                  <span style={{ marginRight: '4px', color: '#10b981' }}>•</span>
                  <span>Home</span>
                </div>
                <div style={{ padding: '4px 0' }}>
                  <span style={{ marginRight: '4px', color: '#10b981' }}>•</span>
                  <span>Pricing</span>
                </div>
                <div style={{ padding: '4px 0' }}>
                  <span style={{ marginRight: '4px', color: '#10b981' }}>•</span>
                  <span>About us</span>
                </div>
                <div style={{ padding: '4px 0', display: 'flex', alignItems: 'center' }}>
                  <span style={{ marginRight: '4px' }}>▶</span>
                  <span>Blog</span>
                </div>
                <div style={{ padding: '4px 0', display: 'flex', alignItems: 'center' }}>
                  <span style={{ marginRight: '4px' }}>▶</span>
                  <span>Store</span>
                </div>
                <div style={{ padding: '4px 0' }}>
                  <span style={{ marginRight: '4px', color: '#3b82f6' }}>•</span>
                  <span>Contact</span>
                </div>
                <div style={{ padding: '4px 0' }}>
                  <span style={{ marginRight: '4px', color: '#3b82f6' }}>•</span>
                  <span>Help</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  // To use this component in a React application:
  // ReactDOM.render(<AnalyticsDashboard />, document.getElementById('root'));