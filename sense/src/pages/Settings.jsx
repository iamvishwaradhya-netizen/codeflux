import { useState } from 'react';

const defaultEmails = [
  { address:'arjun@gmail.com', label:'Primary · 8 subscriptions',   primary:true  },
  { address:'arjun@work.com',  label:'Secondary · 3 subscriptions', primary:false },
];

const toggleDefaults = [
  { label:'Renewal reminders',       sub:'3 days before billing date',     on:true  },
  { label:'Duplicate charge alerts', sub:'Instant notification',           on:true  },
  { label:'Price increase alerts',   sub:'When subscription cost changes', on:true  },
  { label:'Unused service warnings', sub:'After 14 days of inactivity',    on:false },
  { label:'Trial expiry alerts',     sub:'7 days before trial ends',       on:true  },
];

export default function Settings() {
  const [emails, setEmails]       = useState(defaultEmails);
  const [newEmail, setNewEmail]   = useState('');
  const [toggles, setToggles]     = useState(toggleDefaults);
  const [autoDup, setAutoDup]     = useState(true);
  const [autoTrial, setAutoTrial] = useState(false);

  const addEmail = () => {
    if (!newEmail || emails.find(e => e.address === newEmail)) return;
    setEmails(prev => [...prev, { address:newEmail, label:'Newly added · scanning...', primary:false }]);
    setNewEmail('');
  };

  const flip = (i) => setToggles(prev => prev.map((t, idx) => idx === i ? {...t, on:!t.on} : t));

  return (
    <div>
      <div style={styles.header}>
        <div>
          <div style={styles.title}>
            Account <span style={{color:'var(--accent2)'}}>Settings</span>
          </div>
          <div style={styles.sub}>Notifications · linked IDs · preferences</div>
        </div>
      </div>

      <div className="section-title">Linked Email IDs</div>
      <div style={styles.card}>
        <div style={styles.hint}>
          Linking all your emails helps detect cross-account duplicates
        </div>
        {emails.map((e, i) => (
          <div key={i} style={styles.emailRow}>
            <div style={{width:8, height:8, borderRadius:'50%', background:e.primary?'var(--green)':'var(--amber)', flexShrink:0}} />
            <div style={{flex:1}}>
              <div style={{fontSize:13, fontWeight:600}}>{e.address}</div>
              <div style={{fontFamily:'var(--mono)', fontSize:11, color:'var(--muted)'}}>{e.label}</div>
            </div>
            {e.primary
              ? <span className="badge badge-active">Primary</span>
              : <button
                  className="btn btn-danger btn-sm"
                  onClick={() => setEmails(prev => prev.filter((_, idx) => idx !== i))}
                >
                  Remove
                </button>
            }
          </div>
        ))}
        <div style={{display:'flex', gap:10, marginTop:16}}>
          <input
            className="input"
            placeholder="Add another email ID..."
            value={newEmail}
            style={{flex:1}}
            onChange={e => setNewEmail(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && addEmail()}
          />
          <button className="btn btn-primary" onClick={addEmail}>+ Add</button>
        </div>
      </div>

      <div className="section-title">Notification Preferences</div>
      <div style={styles.card}>
        {toggles.map((t, i) => (
          <div
            key={i}
            style={{...styles.toggleRow, borderBottom: i < toggles.length - 1 ? '1px solid var(--border)' : 'none'}}
          >
            <div>
              <div style={{fontSize:14, fontWeight:600}}>{t.label}</div>
              <div style={{fontSize:12, color:'var(--muted)', fontFamily:'var(--mono)'}}>{t.sub}</div>
            </div>
            <div
              style={{...styles.track, background: t.on ? 'var(--green)' : 'var(--border2)'}}
              onClick={() => flip(i)}
            >
              <div style={{...styles.thumb, transform: t.on ? 'translateX(18px)' : 'translateX(0)'}} />
            </div>
          </div>
        ))}
      </div>

      <div className="section-title">Auto-Cancel Rules</div>
      <div style={styles.card}>
        <div style={{...styles.toggleRow, borderBottom:'1px solid var(--border)'}}>
          <div>
            <div style={{fontSize:14, fontWeight:600}}>Auto-cancel confirmed duplicates</div>
            <div style={{fontSize:12, color:'var(--muted)', fontFamily:'var(--mono)'}}>Requires user approval first</div>
          </div>
          <div
            style={{...styles.track, background: autoDup ? 'var(--green)' : 'var(--border2)'}}
            onClick={() => setAutoDup(!autoDup)}
          >
            <div style={{...styles.thumb, transform: autoDup ? 'translateX(18px)' : 'translateX(0)'}} />
          </div>
        </div>
        <div style={styles.toggleRow}>
          <div>
            <div style={{fontSize:14, fontWeight:600}}>Cancel unused trials before conversion</div>
            <div style={{fontSize:12, color:'var(--muted)', fontFamily:'var(--mono)'}}>2 days before trial ends</div>
          </div>
          <div
            style={{...styles.track, background: autoTrial ? 'var(--green)' : 'var(--border2)'}}
            onClick={() => setAutoTrial(!autoTrial)}
          >
            <div style={{...styles.thumb, transform: autoTrial ? 'translateX(18px)' : 'translateX(0)'}} />
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  header:    { display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:32 },
  title:     { fontSize:28, fontWeight:800, letterSpacing:-0.5 },
  sub:       { fontSize:13, color:'var(--muted)', marginTop:4, fontFamily:'var(--mono)' },
  card:      { background:'var(--surface)', border:'1px solid var(--border)', borderRadius:16, padding:24, marginBottom:24 },
  hint:      { fontFamily:'var(--mono)', fontSize:12, color:'var(--muted)', marginBottom:16 },
  emailRow:  { display:'flex', alignItems:'center', gap:12, padding:12, background:'var(--surface2)', borderRadius:10, marginBottom:8, border:'1px solid var(--border)' },
  toggleRow: { display:'flex', alignItems:'center', justifyContent:'space-between', padding:'14px 0' },
  track:     { width:40, height:22, borderRadius:11, cursor:'pointer', position:'relative', transition:'background .2s', flexShrink:0 },
  thumb:     { position:'absolute', width:16, height:16, borderRadius:'50%', background:'#fff', top:3, left:3, transition:'transform .2s' },
};