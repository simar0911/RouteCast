
import { useState } from "react";
import "./App.css";

function App() {
  const [formData, setFormData] = useState({
  distance_km: "",
  order_value: "",
  number_of_items: "",
  purchase_hour: "",
  purchase_day: ""
});

const [result, setResult] = useState(null);
const [error, setError] = useState("");
const [loading, setLoading] = useState(false);

function handleChange(event) {
  const { name, value } = event.target;

  setFormData({
    ...formData,
    [name]: value
  });
}

async function handleSubmit(event) {
  event.preventDefault();

  setLoading(true);
  setError("");
  setResult(null);

  try {
    const response = await fetch("http://localhost:8000/predict", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        distance_km: Number(formData.distance_km),
        order_value: Number(formData.order_value),
        number_of_items: Number(formData.number_of_items),
        purchase_hour: Number(formData.purchase_hour),
        purchase_day: Number(formData.purchase_day)
      })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(JSON.stringify(data.detail));
    }

    setResult(data);
  } catch (err) {
    setError(err.message || "Could not connect to the backend.");
  } finally {
    setLoading(false);
  }
}
  return (
    <div className="app">
      <aside className="sidebar">
        <h2 className="logo">Route<span>Cast</span></h2>

        <p className="nav-label">WORKSPACE</p>

        <nav>
          <a className="active" href="#">▦ Dashboard</a>
          <a href="#">↗ ETA Prediction</a>
          <a href="#">◷ Prediction History</a>
          <a href="#">▤ Analytics</a>
        </nav>

        <div className="sidebar-bottom">
          <p className="nav-label">SYSTEM</p>
          <a href="#">⚙ Settings</a>
          <a href="#">? Help & Support</a>
        </div>
      </aside>

      <main className="main">
        <header className="topbar">
          <div>
            <p className="breadcrumb">Workspace / Dashboard</p>
            <h1>Delivery Overview</h1>
          </div>
          <div className="profile">
            <span className="status-dot"></span>
            System Online
          </div>
        </header>

        <section className="welcome">
          <div>
            <p className="eyebrow">LOGISTICS INTELLIGENCE PLATFORM</p>
            <h2>Welcome to RouteCast</h2>
            <p>Predict delivery times. Identify delays. Make smarter decisions.</p>
          </div>
          <div className="welcome-icon">↗</div>
        </section>

        <section className="stats">
          <div className="stat-card">
            <p>Total Predictions</p>
            <h2>--</h2>
            <small>Predictions will appear here</small>
          </div>

          <div className="stat-card">
            <p>Average ETA</p>
            <h2>--</h2>
            <small>Delivery duration</small>
          </div>

          <div className="stat-card">
            <p>On-time Deliveries</p>
            <h2>--</h2>
            <small>On-time performance</small>
          </div>

          <div className="stat-card">
            <p>Delayed Deliveries</p>
            <h2>--</h2>
            <small>Delay monitoring</small>
          </div>
        </section>

        <section className="content-grid">
          <div className="panel">
            <div className="panel-heading">
              <div>
                <p className="eyebrow">PREDICTION ENGINE</p>
                <h2>New Delivery Prediction</h2>
              </div>
              <span className="tag">ML Powered</span>
            </div>

            <p className="description">
              Enter delivery details to estimate the expected delivery time.
            </p>

            
<form className="prediction-form" onSubmit={handleSubmit}>
  <label>
    Delivery Distance (km)
    <input
      type="number"
      name="distance_km"
      value={formData.distance_km}
      onChange={handleChange}
      placeholder="e.g. 450"
      min="0.1"
      step="any"
      required
    />
  </label>

  <label>
    Order Value (₹)
    <input
      type="number"
      name="order_value"
      value={formData.order_value}
      onChange={handleChange}
      placeholder="e.g. 2500"
      min="0"
      step="any"
      required
    />
  </label>

  <label>
    Number of Items
    <input
      type="number"
      name="number_of_items"
      value={formData.number_of_items}
      onChange={handleChange}
      placeholder="e.g. 3"
      min="1"
      step="1"
      required
    />
  </label>

  <label>
    Purchase Hour
    <input
      type="number"
      name="purchase_hour"
      value={formData.purchase_hour}
      onChange={handleChange}
      placeholder="0 - 23"
      min="0"
      max="23"
      step="1"
      required
    />
  </label>

  <label>
    Purchase Day
    <select
      name="purchase_day"
      value={formData.purchase_day}
      onChange={handleChange}
      required
    >
      <option value="">Select day</option>
      <option value="0">Sunday</option>
      <option value="1">Monday</option>
      <option value="2">Tuesday</option>
      <option value="3">Wednesday</option>
      <option value="4">Thursday</option>
      <option value="5">Friday</option>
      <option value="6">Saturday</option>
    </select>
  </label>

  <button type="submit" disabled={loading}>
    {loading ? "Submitting..." : "Submit Delivery Details →"}
  </button>
</form>

{error && (
  <div className="api-error">
    <strong>Request failed:</strong> {error}
  </div>
)}

{result && (
  <div className="api-result">
    <h3>Delivery Details Received!</h3>
    <p>{result.message}</p>
    <p><strong>Status:</strong> {result.prediction_status}</p>
    <p>Backend successfully validated your input.</p>
  </div>
)}

          </div>

          <div className="panel side-panel">
            <p className="eyebrow">PLATFORM STATUS</p>
            <h2>System Overview</h2>

            <div className="system-item">
              <span>Frontend</span>
              <strong className="online">Running</strong>
            </div>

            <div className="system-item">
              <span>Backend API</span>
              <strong className="online">Connected</strong>
            </div>

            <div className="system-item">
              <span>ML Model</span>
              <strong className="pending">Training pending</strong>
            </div>

            <div className="system-item">
              <span>Database</span>
              <strong className="pending">Setup pending</strong>
            </div>

            <div className="info-box">
              <strong>What's next?</strong>
              <p>Backend connected successfully. Next, we will configure PostgreSQL and build the ML prediction engine.</p>
            </div>
          </div>
        </section>

        <footer>
          RouteCast © 2026 · Intelligent Delivery ETA & Delay Prediction
        </footer>
      </main>
    </div>
  );
}

export default App;
