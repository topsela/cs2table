import { useNavigate } from 'react-router-dom'

const FLIPS = [
  {name:'Karambit | Doppler FN', buy:'CS.Money', buyPrice:530, sell:'Steam', sellPrice:580, profit:50, pct:9.4},
  {name:'AWP | Asiimov FT', buy:'BUFF163', buyPrice:44.20, sell:'Steam', sellPrice:62, profit:17.8, pct:40.3},
  {name:'AK-47 | Fire Serpent FT', buy:'BUFF163', buyPrice:670, sell:'Steam', sellPrice:890, profit:220, pct:32.8},
  {name:'M4A4 | Howl MW', buy:'BUFF163', buyPrice:1680, sell:'Skinport', sellPrice:1820, profit:140, pct:8.3},
  {name:'Glock | Fade FN', buy:'DMarket', buyPrice:159, sell:'Steam', sellPrice:198, profit:39, pct:24.5},
  {name:'Desert Eagle | Blaze FN', buy:'BUFF163', buyPrice:81, sell:'Steam', sellPrice:112, profit:31, pct:38.3},
  {name:'Butterfly | Marble Fade FN', buy:'BUFF163', buyPrice:1150, sell:'DMarket', sellPrice:1235, profit:85, pct:7.4},
  {name:'USP-S | Kill Confirmed MW', buy:'BUFF163', buyPrice:32.40, sell:'Steam', sellPrice:45, profit:12.6, pct:38.9},
]

export default function TopFlips() {
  const navigate = useNavigate()

  return (
    <div style={{background:'#060d1a', minHeight:'100vh', color:'#e8eaed', fontFamily:'Space Grotesk, sans-serif', paddingBottom:'40px'}}>

      <nav style={{display:'flex', alignItems:'center', justifyContent:'space-between', padding:'14px 28px', borderBottom:'1px solid rgba(255,255,255,0.05)'}}>
        <div onClick={() => navigate('/')} style={{fontFamily:'Syne, sans-serif', fontSize:'18px', fontWeight:'800', color:'#fff', cursor:'pointer'}}>
          cs2<span style={{color:'#3b82f6'}}>table</span>
        </div>
        <div style={{display:'flex', gap:'20px'}}>
          <span onClick={() => navigate('/')} style={{fontSize:'13px', color:'rgba(255,255,255,0.4)', cursor:'pointer'}}>Prices</span>
          <span style={{fontSize:'13px', color:'#3b82f6'}}>Top Flips</span>
        </div>
      </nav>

      <div style={{padding:'28px 28px 0'}}>
        <div style={{fontFamily:'Syne, sans-serif', fontSize:'28px', fontWeight:'800', color:'#fff', letterSpacing:'-1px', marginBottom:'6px'}}>
          Top <span style={{color:'#3b82f6'}}>flip</span> opportunities
        </div>
        <div style={{fontSize:'13px', color:'rgba(255,255,255,0.35)', marginBottom:'24px'}}>Best arbitrage deals across all marketplaces right now</div>

        <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'10px', marginBottom:'24px'}}>
          {[
            {label:'Avg profit', value:'$69.5', color:'#22c55e'},
            {label:'Best ROI', value:'+40.3%', color:'#3b82f6'},
          ].map((s,i) => (
            <div key={i} style={{background:'rgba(255,255,255,0.03)', border:'1px solid rgba(255,255,255,0.07)', borderRadius:'12px', padding:'16px'}}>
              <div style={{fontSize:'11px', color:'rgba(255,255,255,0.3)', textTransform:'uppercase', letterSpacing:'0.5px', marginBottom:'6px', fontFamily:'DM Mono, monospace'}}>{s.label}</div>
              <div style={{fontSize:'24px', fontWeight:'700', color:s.color, fontFamily:'DM Mono, monospace'}}>{s.value}</div>
            </div>
          ))}
        </div>

        <div style={{background:'rgba(255,255,255,0.03)', border:'1px solid rgba(255,255,255,0.07)', borderRadius:'12px', overflow:'hidden'}}>
          <div style={{display:'grid', gridTemplateColumns:'2fr 1fr 1fr 1fr 1fr', padding:'10px 16px', borderBottom:'1px solid rgba(255,255,255,0.05)'}}>
            {['Item','Buy at','Buy price','Sell at','Profit'].map((h,i) => (
              <div key={i} style={{fontSize:'10px', color:'rgba(255,255,255,0.25)', textTransform:'uppercase', letterSpacing:'0.5px', fontFamily:'DM Mono, monospace'}}>{h}</div>
            ))}
          </div>
          {FLIPS.map((f, i) => (
            <div key={i} style={{display:'grid', gridTemplateColumns:'2fr 1fr 1fr 1fr 1fr', padding:'12px 16px', borderBottom: i < FLIPS.length-1 ? '1px solid rgba(255,255,255,0.04)' : 'none', alignItems:'center'}}>
              <div style={{fontSize:'13px', color:'#e8eaed', fontWeight:'500'}}>{f.name}</div>
              <div style={{fontSize:'12px', color:'rgba(255,255,255,0.4)', fontFamily:'DM Mono, monospace'}}>{f.buy}</div>
              <div style={{fontSize:'12px', color:'rgba(255,255,255,0.6)', fontFamily:'DM Mono, monospace'}}>${f.buyPrice.toFixed(2)}</div>
              <div style={{fontSize:'12px', color:'rgba(255,255,255,0.4)', fontFamily:'DM Mono, monospace'}}>{f.sell}</div>
              <div>
                <div style={{fontSize:'13px', color:'#22c55e', fontWeight:'600', fontFamily:'DM Mono, monospace'}}>+${f.profit.toFixed(2)}</div>
                <div style={{fontSize:'10px', color:'rgba(34,197,94,0.6)', fontFamily:'DM Mono, monospace'}}>+{f.pct}%</div>
              </div>
            </div>
          ))}
        </div>

        <div style={{marginTop:'16px', background:'rgba(59,130,246,0.06)', border:'1px solid rgba(59,130,246,0.15)', borderRadius:'12px', padding:'14px 16px', display:'flex', alignItems:'center', justifyContent:'space-between'}}>
          <div style={{fontSize:'13px', color:'rgba(255,255,255,0.5)'}}>Unlock real-time flip alerts with Pro</div>
          <button onClick={() => navigate('/profile')} style={{background:'#3b82f6', border:'none', color:'#fff', padding:'8px 16px', borderRadius:'8px', fontSize:'12px', fontWeight:'600', cursor:'pointer', fontFamily:'Space Grotesk'}}>Upgrade to Pro</button>
        </div>
      </div>
    </div>
  )
}