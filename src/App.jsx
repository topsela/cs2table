import { useState } from 'react'
import './App.css'

const SKINS = [
  { name: "AK-47 | Redline", wear: "FT", rarity: "#e4ae39", icon: "gun", steam: 28.50, skinport: 21.30, csmoney: 22.80, dmarket: 21.10, buff: 19.40 },
  { name: "AWP | Asiimov", wear: "FT", rarity: "#d32ce6", icon: "aim", steam: 62.00, skinport: 49.50, csmoney: 51.20, dmarket: 48.80, buff: 44.20 },
  { name: "M4A4 | Howl", wear: "MW", rarity: "#eb4b4b", icon: "fire", steam: null, skinport: 1820.00, csmoney: 1890.00, dmarket: 1805.00, buff: 1680.00 },
  { name: "Glock | Fade", wear: "FN", rarity: "#d32ce6", icon: "fade", steam: 198.00, skinport: 162.00, csmoney: 170.00, dmarket: 159.00, buff: 148.00 },
  { name: "Karambit | Doppler", wear: "FN", rarity: "#eb4b4b", icon: "knife", steam: null, skinport: 580.00, csmoney: 605.00, dmarket: 572.00, buff: 530.00 },
  { name: "Desert Eagle | Blaze", wear: "FN", rarity: "#d32ce6", icon: "deag", steam: 112.00, skinport: 89.50, csmoney: 94.00, dmarket: 88.00, buff: 81.00 },
  { name: "USP-S | Kill Confirmed", wear: "MW", rarity: "#e4ae39", icon: "usp", steam: 45.00, skinport: 36.20, csmoney: 38.50, dmarket: 35.80, buff: 32.40 },
  { name: "AK-47 | Fire Serpent", wear: "FT", rarity: "#eb4b4b", icon: "ak", steam: 890.00, skinport: 720.00, csmoney: 755.00, dmarket: 710.00, buff: 670.00 },
  { name: "M4A1-S | Hot Rod", wear: "FN", rarity: "#e4ae39", icon: "m4", steam: 76.00, skinport: 61.50, csmoney: 64.00, dmarket: 60.80, buff: 55.20 },
]

const WEARS = ['All', 'FN', 'MW', 'FT', 'WW', 'BS']
const COLS = ['steam', 'skinport', 'csmoney', 'dmarket', 'buff']
const COL_LABELS = { steam: 'Steam', skinport: 'Skinport', csmoney: 'CS.Money', dmarket: 'DMarket', buff: 'BUFF163' }

function bestPrice(s) {
  const vals = COLS.map(c => s[c]).filter(v => v != null)
  return Math.min(...vals)
}

function diffPct(s) {
  const vals = COLS.map(c => s[c]).filter(v => v != null)
  const mn = Math.min(...vals), mx = Math.max(...vals)
  return ((mx - mn) / mn * 100).toFixed(1)
}

function PriceCell({ val, best }) {
  if (val == null) return <span className="price na">-</span>
  if (val === best) return <span className="price best">${val.toFixed(2)}</span>
  return <span className="price">${val.toFixed(2)}</span>
}

function Check() {
  return <span className="check">v</span>
}

function Cross() {
  return <span className="cross">x</span>
}

export default function App() {
  const [search, setSearch] = useState('')
  const [wear, setWear] = useState('All')
  const [sortCol, setSortCol] = useState(null)
  const [sortDir, setSortDir] = useState(1)

  const filtered = SKINS
    .filter(s => s.name.toLowerCase().includes(search.toLowerCase()))
    .filter(s => wear === 'All' || s.wear === wear)
    .sort((a, b) => {
      if (!sortCol) return 0
      const av = a[sortCol] ?? Infinity
      const bv = b[sortCol] ?? Infinity
      return (av - bv) * sortDir
    })

  function handleSort(col) {
    if (sortCol === col) setSortDir(d => d * -1)
    else { setSortCol(col); setSortDir(1) }
  }

  return (
    <div className="root">

      <nav className="nav">
        <div className="logo">cs2<span>table</span></div>
        <ul className="nav-links">
          <li>Prices</li>
          <li>Flip finder</li>
          <li>Alerts</li>
          <li>Pricing</li>
        </ul>
        <div className="nav-right">
          <button className="btn-ghost">Log in</button>
          <button className="btn-orange">Get started</button>
        </div>
      </nav>

      <div className="hero">
        <div className="hero-badge">Live prices updating</div>
        <h1>Find the best price<br />for any <span>CS2 skin</span></h1>
        <p>Compare prices across 30+ marketplaces in real time. Never overpay again.</p>
        <div className="stats-row">
          <div className="stat"><div className="stat-num">30+</div><div className="stat-label">Marketplaces</div></div>
          <div className="stat"><div className="stat-num">85K+</div><div className="stat-label">Skins tracked</div></div>
          <div className="stat"><div className="stat-num">5 min</div><div className="stat-label">Update interval</div></div>
          <div className="stat"><div className="stat-num">$0</div><div className="stat-label">To start</div></div>
        </div>
      </div>

      <div className="tab-bar">
        <div className="tab active">All items</div>
        <div className="tab">Knives</div>
        <div className="tab">Rifles</div>
        <div className="tab">Pistols</div>
        <div className="tab">Gloves</div>
        <div className="tab special">Flip finder</div>
      </div>

      <div className="filters">
        <span className="filter-label">Wear:</span>
        {WEARS.map(w => (
          <button key={w} className={'filter-pill' + (wear === w ? ' active' : '')} onClick={() => setWear(w)}>
            {w}
          </button>
        ))}
        <div className="search-wrap">
          <input
            className="search-input"
            placeholder="Search skins..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th style={{ width: '220px' }}>Item</th>
              {COLS.map(col => (
                <th
                  key={col}
                  className={sortCol === col ? 'sorted' : ''}
                  onClick={() => handleSort(col)}
                >
                  {COL_LABELS[col]}
                </th>
              ))}
              <th>Best deal</th>
              <th>Diff</th>
              <th>Updated</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((s, i) => {
              const best = bestPrice(s)
              return (
                <tr key={i}>
                  <td>
                    <div className="skin-cell">
                      <div className="skin-img">{s.icon}</div>
                      <div>
                        <div className="skin-name">
                          <span className="rarity-dot" style={{ background: s.rarity }}></span>
                          {s.name}
                        </div>
                        <div className="skin-wear">{s.wear}</div>
                      </div>
                    </div>
                  </td>
                  {COLS.map(col => (
                    <td key={col}><PriceCell val={s[col]} best={best} /></td>
                  ))}
                  <td><span className="price best">${best.toFixed(2)}</span></td>
                  <td><span className="diff-badge diff-pos">+{diffPct(s)}%</span></td>
                  <td><span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.2)' }}>5m ago</span></td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      <div className="section-divider"><span>Choose your plan</span></div>

      <div className="pricing-grid">

        <div className="plan-card">
          <div className="plan-name">Free</div>
          <div className="plan-price">$0 <span>/mo</span></div>
          <div className="plan-desc">Perfect to get started</div>
          <ul className="plan-features">
            <li><Check /> 5 marketplaces</li>
            <li><Check /> 60 min updates</li>
            <li><Check /> Basic search</li>
            <li><Cross /> Price alerts</li>
            <li><Cross /> Flip finder</li>
            <li><Cross /> API access</li>
          </ul>
          <button className="plan-btn plan-btn-free">Start free</button>
        </div>

        <div className="plan-card featured">
          <div className="plan-badge">MOST POPULAR</div>
          <div className="plan-name orange">Pro</div>
          <div className="plan-price">$12 <span>/mo</span></div>
          <div className="plan-desc">For active traders</div>
          <ul className="plan-features">
            <li><Check /> 30+ marketplaces</li>
            <li><Check /> 5 min updates</li>
            <li><Check /> Price alerts</li>
            <li><Check /> Flip finder</li>
            <li><Check /> Portfolio tracker</li>
            <li><Cross /> API access</li>
          </ul>
          <button className="plan-btn plan-btn-pro">Get Pro</button>
        </div>

        <div className="plan-card">
          <div className="plan-name">Trader</div>
          <div className="plan-price">$29 <span>/mo</span></div>
          <div className="plan-desc">For power users and bots</div>
          <ul className="plan-features">
            <li><Check /> Everything in Pro</li>
            <li><Check /> REST API access</li>
            <li><Check /> Telegram bot</li>
            <li><Check /> Webhook alerts</li>
            <li><Check /> 1 min updates</li>
            <li><Check /> Priority support</li>
          </ul>
          <button className="plan-btn plan-btn-trader">Get Trader</button>
        </div>

      </div>

      <div className="footer-bar">
        <div><span className="live-dot"></span>All systems operational</div>
        <div>cs2table.com - Not affiliated with Valve Corporation</div>
        <div>Terms - Privacy</div>
      </div>

    </div>
  )
}