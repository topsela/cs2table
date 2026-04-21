import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const BACKEND = 'https://cs2table-backend-production.up.railway.app'

export default function Profile() {
  const [user, setUser] = useState(null)
  const [email, setEmail] = useState('')
  const [emailSaved, setEmailSaved] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) { navigate('/'); return }
    fetch(`${BACKEND}/auth/me`, {
      headers: { 'Authorization': `Bearer ${token}` }
    })
    .then(r => r.json())
    .then(data => { if (data.steam_id) { setUser(data) } else { navigate('/') } })
    .catch(() => navigate('/'))
  }, [])

  function logout() {
    localStorage.removeItem('token')
    navigate('/')
  }

  function saveEmail() {
    setEmailSaved(true)
    setTimeout(() => setEmailSaved(false), 2000)
  }

  function copyRef() {
    navigator.clipboard.writeText(`https://cs2table.com/ref/${user?.steam_id}`)
  }

  if (!user) return (
    <div style={{background:'#060d1a', minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center'}}>
      <div style={{color:'rgba(255,255,255,0.3)', fontFamily:'Space Grotesk', fontSize:'14px'}}>Loading...</div>
    </div>
  )

  return (
    <div style={{background:'#060d1a', minHeight:'100vh', color:'#e8eaed', fontFamily:'Space Grotesk, sans-serif', paddingBottom:'40px'}}>

      <nav style={{display:'flex', alignItems:'center', justifyContent:'space-between', padding:'14px 28px', borderBottom:'1px solid rgba(255,255,255,0.05)'}}>
        <div onClick={() => navigate('/')} style={{fontFamily:'Syne, sans-serif', fontSize:'18px', fontWeight:'800', color:'#fff', cursor:'pointer'}}>
          cs2<span style={{color:'#3b82f6'}}>table</span>
        </div>
        <div style={{display:'flex', gap:'20px', alignItems:'center'}}>
          <span onClick={() => navigate('/')} style={{fontSize:'13px', color:'rgba(255,255,255,0.4)', cursor:'pointer'}}>Prices</span>
          <span style={{fontSize:'13px', color:'#3b82f6', cursor:'pointer'}}>Profile</span>
          <button onClick={logout} style={{background:'transparent', border:'1px solid rgba(255,255,255,0.1)', color:'rgba(255,255,255,0.4)', padding:'6px 12px', borderRadius:'8px', fontSize:'12px', cursor:'pointer', fontFamily:'Space Grotesk'}}>Log out</button>
        </div>
      </nav>

      <div style={{display:'flex', alignItems:'center', gap:'20px', padding:'28px 28px 20px', borderBottom:'1px solid rgba(255,255,255,0.05)'}}>
        <img src={user.avatar} alt="avatar" style={{width:'72px', height:'72px', borderRadius:'50%', border:'3px solid rgba(59,130,246,0.4)'}} />
        <div>
          <div style={{fontFamily:'Syne, sans-serif', fontSize:'22px', fontWeight:'800', color:'#fff'}}>{user.username}</div>
          <div style={{fontSize:'12px', color:'rgba(255,255,255,0.3)', fontFamily:'DM Mono, monospace', marginTop:'3px'}}>Steam ID: {user.steam_id}</div>
          <div style={{display:'inline-flex', alignItems:'center', background:'rgba(59,130,246,0.1)', border:'1px solid rgba(59,130,246,0.25)', color:'#60a5fa', fontSize:'11px', fontWeight:'600', padding:'3px 10px', borderRadius:'99px', marginTop:'8px', fontFamily:'DM Mono, monospace'}}>FREE PLAN</div>
        </div>
      </div>

      <div style={{display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:'12px', padding:'20px 28px 0'}}>
        {[
          {label:'Days active', value:'1', sub:'Member since Apr 7', color:'#3b82f6'},
          {label:'Alerts set', value:'0', sub:'Max 0 on free', color:'#e8eaed'},
          {label:'Referrals', value:'0', sub:'Earn free Pro days', color:'#22c55e'},
        ].map((s, i) => (
          <div key={i} style={{background:'rgba(255,255,255,0.03)', border:'1px solid rgba(255,255,255,0.07)', borderRadius:'12px', padding:'16px'}}>
            <div style={{fontSize:'11px', color:'rgba(255,255,255,0.3)', textTransform:'uppercase', letterSpacing:'0.5px', marginBottom:'6px', fontFamily:'DM Mono, monospace'}}>{s.label}</div>
            <div style={{fontSize:'22px', fontWeight:'700', color:s.color, fontFamily:'DM Mono, monospace'}}>{s.value}</div>
            <div style={{fontSize:'11px', color:'rgba(255,255,255,0.25)', marginTop:'4px'}}>{s.sub}</div>
          </div>
        ))}
      </div>

      <div style={{padding:'20px 28px 0'}}>
        <div style={{fontSize:'11px', color:'rgba(255,255,255,0.3)', textTransform:'uppercase', letterSpacing:'0.5px', marginBottom:'12px', fontFamily:'DM Mono, monospace'}}>Email and verification</div>
        <div style={{background:'rgba(255,255,255,0.03)', border:'1px solid rgba(255,255,255,0.07)', borderRadius:'12px', padding:'16px'}}>
          <div style={{display:'flex', gap:'10px', alignItems:'center'}}>
            <input
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="your@email.com"
              style={{flex:1, background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.08)', borderRadius:'8px', padding:'9px 12px', fontSize:'13px', color:'#e8eaed', fontFamily:'Space Grotesk', outline:'none'}}
            />
            <button onClick={saveEmail} style={{background:'#3b82f6', border:'none', color:'#fff', padding:'9px 16px', borderRadius:'8px', fontSize:'12px', fontWeight:'600', cursor:'pointer', fontFamily:'Space Grotesk', whiteSpace:'nowrap'}}>
              {emailSaved ? 'Saved!' : 'Save'}
            </button>
          </div>
          <div style={{fontSize:'11px', color:'rgba(255,255,255,0.25)', marginTop:'8px', display:'flex', alignItems:'center', gap:'5px'}}>
            <span style={{width:'6px', height:'6px', borderRadius:'50%', background:'#ef4444', display:'inline-block'}}></span>
            Email not verified — check your inbox after saving
          </div>
        </div>
      </div>

      <div style={{padding:'20px 28px 0'}}>
        <div style={{fontSize:'11px', color:'rgba(255,255,255,0.3)', textTransform:'uppercase', letterSpacing:'0.5px', marginBottom:'12px', fontFamily:'DM Mono, monospace'}}>Subscription</div>
        <div style={{background:'rgba(255,255,255,0.03)', border:'1px solid rgba(255,255,255,0.07)', borderRadius:'12px', padding:'16px'}}>
          <div style={{fontSize:'16px', fontWeight:'700', color:'#fff', fontFamily:'Syne, sans-serif', marginBottom:'4px'}}>Free plan</div>
          <div style={{fontSize:'13px', color:'rgba(255,255,255,0.35)', fontFamily:'DM Mono, monospace', marginBottom:'12px'}}>$0 / month</div>
          <div style={{fontSize:'12px', color:'rgba(255,255,255,0.3)', marginBottom:'12px'}}>Upgrade to unlock all marketplaces, price alerts and flip finder</div>
          <button style={{width:'100%', background:'rgba(59,130,246,0.1)', border:'1px solid rgba(59,130,246,0.3)', color:'#60a5fa', padding:'10px', borderRadius:'8px', fontSize:'13px', fontWeight:'600', cursor:'pointer', fontFamily:'Space Grotesk'}}>
            Upgrade to Pro — $12/mo
          </button>
        </div>
      </div>

      <div style={{padding:'20px 28px 0'}}>
        <div style={{fontSize:'11px', color:'rgba(255,255,255,0.3)', textTransform:'uppercase', letterSpacing:'0.5px', marginBottom:'12px', fontFamily:'DM Mono, monospace'}}>Referral program</div>
        <div style={{background:'rgba(255,255,255,0.03)', border:'1px solid rgba(255,255,255,0.07)', borderRadius:'12px', padding:'16px'}}>
          <div style={{fontSize:'12px', color:'rgba(255,255,255,0.35)', marginBottom:'10px'}}>Share your link and earn 7 free Pro days per referral</div>
          <div style={{display:'flex', gap:'8px', marginBottom:'12px'}}>
            <div style={{flex:1, background:'rgba(59,130,246,0.06)', border:'1px solid rgba(59,130,246,0.15)', borderRadius:'8px', padding:'9px 12px', fontSize:'12px', color:'#60a5fa', fontFamily:'DM Mono, monospace', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap'}}>
              cs2table.com/ref/{user.steam_id?.slice(-6)}
            </div>
            <button onClick={copyRef} style={{background:'rgba(255,255,255,0.06)', border:'1px solid rgba(255,255,255,0.1)', color:'rgba(255,255,255,0.5)', padding:'9px 14px', borderRadius:'8px', fontSize:'12px', cursor:'pointer', fontFamily:'Space Grotesk'}}>Copy</button>
          </div>
          <div style={{display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:'8px'}}>
            {[{num:'0', label:'Referred'}, {num:'0', label:'Converted'}, {num:'0d', label:'Earned'}].map((s, i) => (
              <div key={i} style={{background:'rgba(255,255,255,0.02)', borderRadius:'8px', padding:'10px', textAlign:'center'}}>
                <div style={{fontSize:'18px', fontWeight:'700', color:'#3b82f6', fontFamily:'DM Mono, monospace'}}>{s.num}</div>
                <div style={{fontSize:'10px', color:'rgba(255,255,255,0.25)', marginTop:'2px', textTransform:'uppercase', letterSpacing:'0.5px'}}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{padding:'20px 28px 0'}}>
        <div style={{fontSize:'11px', color:'rgba(255,255,255,0.3)', textTransform:'uppercase', letterSpacing:'0.5px', marginBottom:'12px', fontFamily:'DM Mono, monospace'}}>Activity history</div>
        <div style={{background:'rgba(255,255,255,0.03)', border:'1px solid rgba(255,255,255,0.07)', borderRadius:'12px', overflow:'hidden'}}>
          {[
            {icon:'🔐', bg:'rgba(59,130,246,0.1)', action:'Logged in via Steam', time:'Today', badge:'Login', badgeColor:'#60a5fa', badgeBg:'rgba(59,130,246,0.1)'},
            {icon:'🔍', bg:'rgba(139,92,246,0.1)', action:'Searched: AK-47 Redline', time:'Today', badge:'Search', badgeColor:'#a78bfa', badgeBg:'rgba(139,92,246,0.1)'},
            {icon:'🔔', bg:'rgba(234,179,8,0.1)', action:'Alerts — coming soon', time:'—', badge:'Alert', badgeColor:'#fbbf24', badgeBg:'rgba(234,179,8,0.1)'},
            {icon:'⭐', bg:'rgba(34,197,94,0.1)', action:'Upgrade to Pro — coming soon', time:'—', badge:'Upgrade', badgeColor:'#22c55e', badgeBg:'rgba(34,197,94,0.1)'},
          ].map((h, i) => (
            <div key={i} style={{display:'flex', alignItems:'center', gap:'12px', padding:'12px 16px', borderBottom: i < 3 ? '1px solid rgba(255,255,255,0.04)' : 'none'}}>
              <div style={{width:'32px', height:'32px', borderRadius:'8px', background:h.bg, display:'flex', alignItems:'center', justifyContent:'center', fontSize:'14px', flexShrink:0}}>{h.icon}</div>
              <div style={{flex:1}}>
                <div style={{fontSize:'13px', color:'#e8eaed', fontWeight:'500'}}>{h.action}</div>
                <div style={{fontSize:'11px', color:'rgba(255,255,255,0.25)', fontFamily:'DM Mono, monospace', marginTop:'1px'}}>{h.time}</div>
              </div>
              <span style={{fontSize:'11px', padding:'2px 8px', borderRadius:'99px', fontFamily:'DM Mono, monospace', background:h.badgeBg, color:h.badgeColor}}>{h.badge}</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}