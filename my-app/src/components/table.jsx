// This is a single JSX file with all components defined together
import { Link } from "react-router-dom";
import "../styles/table.css";
// Main App Component
function AnalyticsDashboard() {
    const stocks = [
        { name: "Apple Inc", symbol: "AAPL" },
        { name: "Microsoft", symbol: "MSFT" },
        { name: "Tesla Motors", symbol: "TSLA" },
      ];
    return (
        
      <div style={{ display: 'flex', height: '100vh',backgroundColor: 'white' }}>
        
       
        
        {/* Main Content */}
        <div style={{ flex: 1, padding: '32px', overflow: 'auto' }}>
         <div className="buttons" style={{ width: "300px", justifyContent: "space-between", display: "flex", paddingBottom:"10px"}}>
            <button >Stocks</button>
            <button>Bonds</button>
            <button>Insurance</button>
         </div>
          
          {/* Data Table */}
          <div style={{ border: '1px solid rgb(213, 213, 213)', borderRadius: '6px', overflow: 'hidden' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th style={{ padding: '5px 16px', textAlign: 'left',  fontWeight: 500 ,  borderBottom: '1px solid #ebebeb', color:'black', }}>Name</th>
                  <th style={{ padding: '5px 16px', textAlign: 'left',  fontWeight: 500, borderBottom: '1px solid #ebebeb' , color:'black',}}>Status</th>
                  <th style={{ padding: '5px 16px', textAlign: 'left',  fontWeight: 500, borderBottom: '1px solid #ebebeb'  ,color:'black',}}>Percent Change</th>
                  <th style={{ padding: '5px 16px', textAlign: 'left',  fontWeight: 500, borderBottom: '1px solid #ebebeb'  ,color:'black',}}>High price of the day</th>
                  <th style={{ padding: '5px 16px', textAlign: 'left',  fontWeight: 500, borderBottom: '1px solid #ebebeb'  ,color:'black',}}>Low price of the day</th>
                  <th style={{ padding: '5px 16px', textAlign: 'left',  fontWeight: 500, borderBottom: '1px solid #ebebeb'  ,color:'black',}}>Buying date</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ padding: '5px 16px', borderBottom: '1px solid #ebebeb',  color:'black',}}><Link to={`/stockdetails`}>Homepage Overview</Link></td>
                  <td style={{ padding: '5px 16px', borderBottom: '1px solid #ebebeb',  color:'black',}}>
                    <span style={{ display: 'inline-block', padding: '2px 8px', borderRadius: '9999px', fontSize: '12px', backgroundColor: '#dcfce7', color: '#166534' }}>Online</span>
                  </td>
                  <td style={{ padding: '5px 16px', borderBottom: '1px solid #ebebeb',  color:'black',}}>212423</td>
                  <td style={{ padding: '5px 16px', borderBottom: '1px solid #ebebeb',  color:'black',}}>8345</td>
                  <td style={{ padding: '5px 16px', borderBottom: '1px solid #ebebeb',  color:'black',}}>18.5</td>
                  <td style={{ padding: '5px 16px', borderBottom: '1px solid #ebebeb',  color:'black',}}>2m 15s</td>
                </tr>
                <tr>
                  <td style={{ padding: '5px 16px', borderBottom: '1px solid #ebebeb',  color:'black',}}>Product Details - Gadgets</td>
                  <td style={{ padding: '5px 16px', borderBottom: '1px solid #ebebeb',  color:'black',}}>
                    <span style={{ display: 'inline-block', padding: '2px 8px', borderRadius: '9999px', fontSize: '12px', backgroundColor: '#dcfce7', color: '#166534' }}>Online</span>
                  </td>
                  <td style={{ padding: '5px 16px', borderBottom: '1px solid #ebebeb',  color:'black',}}>172240</td>
                  <td style={{ padding: '5px 16px', borderBottom: '1px solid #ebebeb',  color:'black',}}>5653</td>
                  <td style={{ padding: '5px 16px', borderBottom: '1px solid #ebebeb',  color:'black',}}>9.7</td>
                  <td style={{ padding: '5px 16px', borderBottom: '1px solid #ebebeb',  color:'black',}}>2m 30s</td>
                </tr>
                <tr>
                  <td style={{ padding: '5px 16px', borderBottom: '1px solid #ebebeb',  color:'black',}}>Checkout Process - Step 1</td>
                  <td style={{ padding: '5px 16px', borderBottom: '1px solid #ebebeb',  color:'black',}}>
                    <span style={{ display: 'inline-block', padding: '2px 8px', borderRadius: '9999px', fontSize: '12px', backgroundColor: '#f1f5f9', color: '#64748b' }}>Offline</span>
                  </td>
                  <td style={{ padding: '5px 16px', borderBottom: '1px solid #ebebeb',  color:'black',}}>58240</td>
                  <td style={{ padding: '5px 16px', borderBottom: '1px solid #ebebeb',  color:'black',}}>3455</td>
                  <td style={{ padding: '5px 16px', borderBottom: '1px solid #ebebeb',  color:'black',}}>15.2</td>
                  <td style={{ padding: '5px 16px', borderBottom: '1px solid #ebebeb',  color:'black',}}>2m 10s</td>
                </tr>
                <tr>
                  <td style={{ padding: '5px 16px', borderBottom: '1px solid #ebebeb',  color:'black',}}>User Profile Dashboard</td>
                  <td style={{ padding: '5px 16px', borderBottom: '1px solid #ebebeb',  color:'black',}}>
                    <span style={{ display: 'inline-block', padding: '2px 8px', borderRadius: '9999px', fontSize: '12px', backgroundColor: '#dcfce7', color: '#166534' }}>Online</span>
                  </td>
                  <td style={{ padding: '5px 16px', borderBottom: '1px solid #ebebeb',  color:'black',}}>96240</td>
                  <td style={{ padding: '5px 16px', borderBottom: '1px solid #ebebeb',  color:'black',}}>112543</td>
                  <td style={{ padding: '5px 16px', borderBottom: '1px solid #ebebeb',  color:'black',}}>4.5</td>
                  <td style={{ padding: '5px 16px', borderBottom: '1px solid #ebebeb',  color:'black',}}>2m 40s</td>
                </tr>
                <tr>
                  <td style={{ padding: '5px 16px', borderBottom: '1px solid #ebebeb',  color:'black',}}>Article Listing - Tech News</td>
                  <td style={{ padding: '5px 16px', borderBottom: '1px solid #ebebeb',  color:'black',}}>
                    <span style={{ display: 'inline-block', padding: '2px 8px', borderRadius: '9999px', fontSize: '12px', backgroundColor: '#f1f5f9', color: '#64748b' }}>Offline</span>
                  </td>
                  <td style={{ padding: '5px 16px', borderBottom: '1px solid #ebebeb',  color:'black',}}>142240</td>
                  <td style={{ padding: '5px 16px', borderBottom: '1px solid #ebebeb',  color:'black',}}>3653</td>
                  <td style={{ padding: '5px 16px', borderBottom: '1px solid #ebebeb',  color:'black',}}>3.1</td>
                  <td style={{ padding: '5px 16px', borderBottom: '1px solid #ebebeb',  color:'black',}}>2m 55s</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        
      </div>
    );
  }
  export default AnalyticsDashboard;
  // To use this component in a React application:
  // ReactDOM.render(<AnalyticsDashboard />, document.getElementById('root'));