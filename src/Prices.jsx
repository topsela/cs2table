import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const MARKETPLACES = ['CS.Money', 'Skinport', 'DMarket', 'BUFF163', 'Steam Market', 'Tradeit.gg']
const CATEGORIES = ['All items', 'Knives', 'Rifles', 'Pistols', 'Gloves']
const PRICE_TYPES = ['Min price', 'Average price', 'Max price']

export default function Prices() {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All items')
  const [timer, setTimer] = useState(60)
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [buyFrom, setBuyFrom] = useState('CS.Money')
  const [sellTo, setSellTo] = useState('Steam Market')
  const [buyPriceType, setBuyPriceType] = useState('Min price')
  const [sellPriceType, setSellPriceType] = useState('Min price')
  const [buyMinPrice, setBuyMinPrice] = useState('')
  const [buyMaxPrice, setBuyMaxPrice] = useState('')
  const [buyMinQty, setBuyMinQty] = useState('')
  const [buyMaxQty, setBuyMaxQty] = useState('')
  const [sellMinPrice, setSellMinPrice] = useState('')
  const [sellMaxPrice, setSellMaxPrice] = useState('')

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      fetch('https://cs2table-backend-production.up.railway.app/auth/me', {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      .then(r => r.json())
      .then(data => { if (data.steam_id) setUser(data) })
      .catch(() => {})
    }
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(t => t <= 1 ? 60 : t - 1)
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  function swapSites() {
    const tmp = buyFrom
    setBuyFrom(sellTo)
    setSellTo(tmp)
  }

  function resetFilters() {
    setBuyMinPrice('')
    setBuyMaxPrice('')
    setBuyMinQty('')
    setBuyMaxQty('')
    setSellMinPrice('')
    setSellMaxPrice('')
    setBuyPriceType('Min price')
    setSellPriceType('Min price')
  }

  return (
    <div style={{background:'#07090f', fontFamily:'Space Grotesk, sans-serif', color:'#c8cdd8', minHeight:'100vh', display:'flex', flexDirection:'column', width:'100vw', overflowX:'hidden'}}>
      <div style={{display:'flex', flex:1, width:'100%'}}>

        {sidebarOpen && (
          <div style={{width:'220px', minWidth:'220px', background:'#0d1017', borderRight:'1px solid rgba(255,255,255,0.06)', flexShrink:0, overflowY:'auto', maxHeight:'100vh'}}>

            <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', padding:'12px 14px', borderBottom:'1px solid rgba(255,255,255,0.06)'}}>
              <div style={{fontSize:'13px', fontWeight:'600', color:'#e8eaed', display:'flex', alignItems:'center', gap:'7px'}}>
                <span>&#9776;</span> Table settings
              </div>
              <div onClick={() => setSidebarOpen(false)} style={{width:'22px', height:'22px', borderRadius:'5px', background:'rgba(255,255,255,0.05)', border:'1px solid rgba(255,255,255,0.08)', display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer', fontSize:'10px', color:'rgba(255,255,255,0.4)'}}>
                &#10005;
              </div>
            </div>

            <div style={{padding:'12px 14px', borderBottom:'1px solid rgba(255,255,255,0.05)'}}>
              <div style={{fontSize:'10px', fontWeight:'600', color:'rgba(255,255,255,0.4)', textTransform:'uppercase', letterSpacing:'0.5px', marginBottom:'10px', fontFamily:'DM Mono, monospace'}}>Buy from</div>

              <div style={{fontSize:'11px', color:'rgba(255,255,255,0.35)', marginBottom:'4px'}}>Marketplace</div>
              <select value={buyFrom} onChange={e => setBuyFrom(e.target.value)} style={{width:'100%', background:'rgba(255,255,255,0.05)', border:'1px solid rgba(255,255,255,0.08)', color:'#e8eaed', padding:'7px 8px', borderRadius:'7px', fontSize:'12px', fontFamily:'Space Grotesk, sans-serif', cursor:'pointer', outline:'none', marginBottom:'8px'}}>
                {MARKETPLACES.map(m => <option key={m} style={{background:'#0d1017'}}>{m}</option>)}
              </select>

              <div style={{fontSize:'11px', color:'rgba(255,255,255,0.35)', marginBottom:'4px'}}>Price type</div>
              <select value={buyPriceType} onChange={e => setBuyPriceType(e.target.value)} style={{width:'100%', background:'rgba(255,255,255,0.05)', border:'1px solid rgba(255,255,255,0.08)', color:'#e8eaed', padding:'7px 8px', borderRadius:'7px', fontSize:'12px', fontFamily:'Space Grotesk, sans-serif', cursor:'pointer', outline:'none', marginBottom:'8px'}}>
                {PRICE_TYPES.map(t => <option key={t} style={{background:'#0d1017'}}>{t}</option>)}
              </select>

              <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'6px', marginBottom:'6px'}}>
                <div>
                  <div style={{fontSize:'11px', color:'rgba(255,255,255,0.35)', marginBottom:'4px'}}>Min price</div>
                  <div style={{display:'flex', alignItems:'center', gap:'3px'}}>
                    <input value={buyMinPrice} onChange={e => setBuyMinPrice(e.target.value)} placeholder="0" style={{width:'100%', background:'rgba(255,255,255,0.05)', border:'1px solid rgba(255,255,255,0.08)', color:'#e8eaed', padding:'7px 8px', borderRadius:'7px', fontSize:'12px', fontFamily:'DM Mono, monospace', outline:'none'}} />
                    <span style={{fontSize:'11px', color:'rgba(255,255,255,0.25)'}}>$</span>
                  </div>
                </div>
                <div>
                  <div style={{fontSize:'11px', color:'rgba(255,255,255,0.35)', marginBottom:'4px'}}>Max price</div>
                  <div style={{display:'flex', alignItems:'center', gap:'3px'}}>
                    <input value={buyMaxPrice} onChange={e => setBuyMaxPrice(e.target.value)} placeholder="0" style={{width:'100%', background:'rgba(255,255,255,0.05)', border:'1px solid rgba(255,255,255,0.08)', color:'#e8eaed', padding:'7px 8px', borderRadius:'7px', fontSize:'12px', fontFamily:'DM Mono, monospace', outline:'none'}} />
                    <span style={{fontSize:'11px', color:'rgba(255,255,255,0.25)'}}>$</span>
                  </div>
                </div>
              </div>

              <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'6px'}}>
                <div>
                  <div style={{fontSize:'11px', color:'rgba(255,255,255,0.35)', marginBottom:'4px'}}>Min qty</div>
                  <div style={{display:'flex', alignItems:'center', gap:'3px'}}>
                    <input value={buyMinQty} onChange={e => setBuyMinQty(e.target.value)} placeholder="0" style={{width:'100%', background:'rgba(255,255,255,0.05)', border:'1px solid rgba(255,255,255,0.08)', color:'#e8eaed', padding:'7px 8px', borderRadius:'7px', fontSize:'12px', fontFamily:'DM Mono, monospace', outline:'none'}} />
                    <span style={{fontSize:'11px', color:'rgba(255,255,255,0.25)'}}>pcs</span>
                  </div>
                </div>
                <div>
                  <div style={{fontSize:'11px', color:'rgba(255,255,255,0.35)', marginBottom:'4px'}}>Max qty</div>
                  <div style={{display:'flex', alignItems:'center', gap:'3px'}}>
                    <input value={buyMaxQty} onChange={e => setBuyMaxQty(e.target.value)} placeholder="0" style={{width:'100%', background:'rgba(255,255,255,0.05)', border:'1px solid rgba(255,255,255,0.08)', color:'#e8eaed', padding:'7px 8px', borderRadius:'7px', fontSize:'12px', fontFamily:'DM Mono, monospace', outline:'none'}} />
                    <span style={{fontSize:'11px', color:'rgba(255,255,255,0.25)'}}>pcs</span>
                  </div>
                </div>
              </div>
            </div>

            <div style={{display:'flex', justifyContent:'center', padding:'8px 0', borderBottom:'1px solid rgba(255,255,255,0.05)'}}>
              <div onClick={swapSites} style={{width:'28px', height:'28px', borderRadius:'6px', background:'rgba(59,130,246,0.1)', border:'1px solid rgba(59,130,246,0.2)', display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer', fontSize:'14px', color:'#60a5fa'}}>
                &#8645;
              </div>
            </div>

            <div style={{padding:'12px 14px'}}>
              <div style={{fontSize:'10px', fontWeight:'600', color:'rgba(255,255,255,0.4)', textTransform:'uppercase', letterSpacing:'0.5px', marginBottom:'10px', fontFamily:'DM Mono, monospace'}}>Sell to</div>

              <div style={{fontSize:'11px', color:'rgba(255,255,255,0.35)', marginBottom:'4px'}}>Marketplace</div>
              <select value={sellTo} onChange={e => setSellTo(e.target.value)} style={{width:'100%', background:'rgba(255,255,255,0.05)', border:'1px solid rgba(255,255,255,0.08)', color:'#e8eaed', padding:'7px 8px', borderRadius:'7px', fontSize:'12px', fontFamily:'Space Grotesk, sans-serif', cursor:'pointer', outline:'none', marginBottom:'8px'}}>
                {MARKETPLACES.map(m => <option key={m} style={{background:'#0d1017'}}>{m}</option>)}
              </select>

              <div style={{fontSize:'11px', color:'rgba(255,255,255,0.35)', marginBottom:'4px'}}>Price type</div>
              <select value={sellPriceType} onChange={e => setSellPriceType(e.target.value)} style={{width:'100%', background:'rgba(255,255,255,0.05)', border:'1px solid rgba(255,255,255,0.08)', color:'#e8eaed', padding:'7px 8px', borderRadius:'7px', fontSize:'12px', fontFamily:'Space Grotesk, sans-serif', cursor:'pointer', outline:'none', marginBottom:'8px'}}>
                {PRICE_TYPES.map(t => <option key={t} style={{background:'#0d1017'}}>{t}</option>)}
              </select>

              <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'6px', marginBottom:'14px'}}>
                <div>
                  <div style={{fontSize:'11px', color:'rgba(255,255,255,0.35)', marginBottom:'4px'}}>Min price</div>
                  <div style={{display:'flex', alignItems:'center', gap:'3px'}}>
                    <input value={sellMinPrice} onChange={e => setSellMinPrice(e.target.value)} placeholder="0" style={{width:'100%', background:'rgba(255,255,255,0.05)', border:'1px solid rgba(255,255,255,0.08)', color:'#e8eaed', padding:'7px 8px', borderRadius:'7px', fontSize:'12px', fontFamily:'DM Mono, monospace', outline:'none'}} />
                    <span style={{fontSize:'11px', color:'rgba(255,255,255,0.25)'}}>$</span>
                  </div>
                </div>
                <div>
                  <div style={{fontSize:'11px', color:'rgba(255,255,255,0.35)', marginBottom:'4px'}}>Max price</div>
                  <div style={{display:'flex', alignItems:'center', gap:'3px'}}>
                    <input value={sellMaxPrice} onChange={e => setSellMaxPrice(e.target.value)} placeholder="0" style={{width:'100%', background:'rgba(255,255,255,0.05)', border:'1px solid rgba(255,255,255,0.08)', color:'#e8eaed', padding:'7px 8px', borderRadius:'7px', fontSize:'12px', fontFamily:'DM Mono, monospace', outline:'none'}} />
                    <span style={{fontSize:'11px', color:'rgba(255,255,255,0.25)'}}>$</span>
                  </div>
                </div>
              </div>

              <button onClick={resetFilters} style={{width:'100%', padding:'9px', borderRadius:'7px', background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.08)', color:'rgba(255,255,255,0.4)', fontSize:'12px', fontFamily:'Space Grotesk, sans-serif', cursor:'pointer'}}>
                Reset all filters
              </button>
            </div>
          </div>
        )}

        <div style={{flex:1, display:'flex', flexDirection:'column', minWidth:0}}>
          <div style={{display:'flex', alignItems:'center', gap:'8px', padding:'10px 14px', borderBottom:'1px solid rgba(255,255,255,0.06)', background:'#0b0e18', flexWrap:'wrap'}}>
            <div onClick={() => navigate('/')} style={{fontFamily:'Syne, sans-serif', fontSize:'15px', fontWeight:'800', color:'#fff', cursor:'pointer'}}>
              cs2<span style={{color:'#3b82f6'}}>table</span>
            </div>
            <div style={{width:'1px', height:'20px', background:'rgba(255,255,255,0.08)'}}></div>
            <div onClick={() => setSidebarOpen(!sidebarOpen)} style={{width:'28px', height:'28px', borderRadius:'6px', background: sidebarOpen ? 'rgba(59,130,246,0.1)' : 'rgba(255,255,255,0.05)', border: sidebarOpen ? '1px solid rgba(59,130,246,0.3)' : '1px solid rgba(255,255,255,0.08)', display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer', fontSize:'13px', color: sidebarOpen ? '#60a5fa' : 'rgba(255,255,255,0.4)'}}>
              &#9776;
            </div>
            <div style={{width:'1px', height:'20px', background:'rgba(255,255,255,0.08)'}}></div>
            {CATEGORIES.map(cat => (
              <div key={cat} onClick={() => setCategory(cat)} style={{background: category === cat ? 'rgba(59,130,246,0.1)' : 'rgba(255,255,255,0.04)', border: category === cat ? '1px solid rgba(59,130,246,0.3)' : '1px solid rgba(255,255,255,0.07)', borderRadius:'6px', padding:'5px 10px', fontSize:'12px', color: category === cat ? '#60a5fa' : 'rgba(255,255,255,0.45)', cursor:'pointer'}}>
                {cat}
              </div>
            ))}
            <div style={{marginLeft:'auto', display:'flex', alignItems:'center', gap:'8px'}}>
              <div style={{display:'flex', alignItems:'center', gap:'5px', fontSize:'12px', color:'rgba(255,255,255,0.3)'}}>
                <span style={{width:'6px', height:'6px', borderRadius:'50%', background:'#22c55e', display:'inline-block'}}></span>
                Live
              </div>
              <div style={{background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.07)', borderRadius:'6px', padding:'5px 10px', fontSize:'12px', fontFamily:'DM Mono, monospace', color: timer < 10 ? '#ef4444' : 'rgba(255,255,255,0.45)'}}>
                {timer}s
              </div>
              {user ? (
                <img src={user.avatar} alt="avatar" onClick={() => navigate('/profile')} style={{width:'28px', height:'28px', borderRadius:'50%', border:'2px solid rgba(59,130,246,0.4)', cursor:'pointer'}} />
              ) : (
                <button onClick={() => navigate('/')} style={{background:'#3b82f6', border:'none', color:'#fff', padding:'5px 12px', borderRadius:'6px', fontSize:'12px', fontWeight:'600', cursor:'pointer', fontFamily:'Space Grotesk, sans-serif'}}>Login</button>
              )}
            </div>
          </div>

          <div style={{display:'flex', alignItems:'center', borderBottom:'1px solid rgba(255,255,255,0.05)', background:'#0b0e18'}}>
            <div style={{flex:1, display:'flex', alignItems:'center', gap:'8px', padding:'8px 14px'}}>
              <span style={{fontSize:'13px', color:'rgba(255,255,255,0.25)'}}>&#9906;</span>
              <input style={{background:'transparent', border:'none', outline:'none', color:'#e8eaed', fontSize:'13px', fontFamily:'Space Grotesk, sans-serif', width:'100%'}} placeholder="Search by name..." value={search} onChange={e => setSearch(e.target.value)} />
            </div>
            <div style={{display:'flex', alignItems:'center', gap:'5px', padding:'8px 12px', borderLeft:'1px solid rgba(255,255,255,0.05)', minWidth:'140px', fontSize:'12px', fontWeight:'600', color:'#e8eaed'}}>
              <div style={{width:'7px', height:'7px', borderRadius:'50%', background:'#3b82f6'}}></div>
              {buyFrom}
            </div>
            <div style={{display:'flex', alignItems:'center', gap:'5px', padding:'8px 12px', borderLeft:'1px solid rgba(255,255,255,0.05)', minWidth:'140px', fontSize:'12px', fontWeight:'600', color:'#e8eaed'}}>
              <div style={{width:'7px', height:'7px', borderRadius:'50%', background:'#71b1f4'}}></div>
              {sellTo}
            </div>
            <div style={{padding:'8px 12px', borderLeft:'1px solid rgba(255,255,255,0.05)', minWidth:'110px', fontSize:'12px', fontWeight:'600', color:'#e8eaed'}}>Profit</div>
            <div style={{padding:'8px 12px', borderLeft:'1px solid rgba(255,255,255,0.05)', minWidth:'90px', fontSize:'12px', color:'rgba(255,255,255,0.4)'}}>Updated</div>
            <div style={{padding:'8px 12px', borderLeft:'1px solid rgba(255,255,255,0.05)', minWidth:'90px', fontSize:'12px', color:'rgba(255,255,255,0.4)'}}>Actions</div>
          </div>

          <div style={{flex:1, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:'12px', padding:'60px 20px'}}>
            <div style={{fontSize:'32px', opacity:'0.15'}}>&#128202;</div>
            <div style={{fontSize:'13px', color:'rgba(255,255,255,0.25)', textAlign:'center'}}>No data yet</div>
            <div style={{fontSize:'11px', color:'rgba(255,255,255,0.15)', fontFamily:'DM Mono, monospace'}}>Parsers will fill this table automatically</div>
          </div>
        </div>
      </div>
    </div>
  )
}