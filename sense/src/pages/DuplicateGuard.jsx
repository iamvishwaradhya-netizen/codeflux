import { useState } from 'react';
import CancelModal from '../components/CancelModal';

export default function DuplicateGuard() {
  const [selected, setSelected]   = useState(null);
  const [dismissed, setDismissed] = useState([]);

  const dismiss = (key) => setDismissed(prev => [...prev, key]);

  return (
    <div>
      <div style={styles.header}>
        <div>
          <div style={styles.title}>
            Duplicate <span style={{color:'var(--accent2)'}}>Guard</span>
          </div>
          <div style={styles.sub}>
            Multi-ID tracking · double-charge detection
          </div>
        </div>
      </div>

      <div style={styles.alert}>
        <span style={styles.dot} />
        <span>
          <strong>2 issues detected</strong> — ₹358 in potential duplicate charges this month
        </span>
      </div>

      {!dismissed.includes('spotify') && (
        <div>
          <div className="section-title">Duplicate Accounts Detected</div>
          <div style={styles.card}>
            <div style={styles.cardHeader}>
              <div style={{...styles.icon, background:'#1DB95422', fontSize:20}}>♪</div>
              <div>
                <div style={{fontSize:16, fontWeight:700}}>
                  Spotify — 2 active accounts found
                </div>
                <div style={{fontFamily:'var(--mono)', fontSize:11, color:'var(--muted)'}}>
                  Same service linked to 2 email IDs
                </div>
              </div>
              <span className="badge badge-danger" style={{marginLeft:'auto'}}>₹358 wasted</span>
            </div>

            {[
              { email:'arjun@gmail.com', info:'Spotify Individual · Mar 22', amount:'₹179/mo', color:'var(--red)',   keep:false },
              { email:'arjun@work.com',  info:'Spotify Family · Mar 20',     amount:'₹179/mo', color:'var(--amber)', keep:true  },
            ].map((r, i) => (
              <div key={i} style={styles.dupRow}>
                <div style={{width:8, height:8, borderRadius:'50%', background:r.color, flexShrink:0}} />
                <div style={{flex:1}}>
                  <div style={{fontSize:13, fontWeight:600}}>{r.email}</div>
                  <div style={{fontFamily:'var(--mono)', fontSize:11, color:'var(--muted)'}}>{r.info}</div>
                </div>
                <div style={{fontFamily:'var(--mono)', fontSize:13, color:'var(--amber)', marginRight:12}}>
                  {r.amount}
                </div>
                {r.keep
                  ? <button className="btn btn-ghost btn-sm">Keep</button>
                  : <button
                      className="btn btn-danger btn-sm"
                      onClick={() => setSelected({name:'Spotify (arjun@gmail.com)', amount:179})}
                    >
                      Cancel
                    </button>
                }
              </div>
            ))}

            <div style={styles.tip}>
              Keep Spotify Family (arjun@work.com) · Cancel Individual to save ₹179/month
            </div>
            <button
              className="btn btn-ghost btn-sm"
              style={{marginTop:12}}
              onClick={() => dismiss('spotify')}
            >
              Dismiss
            </button>
          </div>
        </div>
      )}

      {!dismissed.includes('adobe') && (
        <div>
          <div className="section-title">Double-Charge Detection</div>
          <div style={styles.card}>
            <div style={styles.cardHeader}>
              <div style={{...styles.icon, background:'#FF690022', fontSize:14, fontWeight:700, color:'#FF6900'}}>
                CC
              </div>
              <div>
                <div style={{fontSize:16, fontWeight:700}}>Adobe Creative Cloud — Charged twice</div>
                <div style={{fontFamily:'var(--mono)', fontSize:11, color:'var(--muted)'}}>
                  Same fingerprint in one billing cycle
                </div>
              </div>
              <span className="badge badge-warning" style={{marginLeft:'auto'}}>Investigate</span>
            </div>

            <div style={{background:'var(--surface2)', borderRadius:10, overflow:'hidden', border:'1px solid var(--border)'}}>
              <table style={{width:'100%', borderCollapse:'collapse', fontSize:13}}>
                <thead>
                  <tr>
                    {['Date','Amount','Account','Status'].map(h => (
                      <th key={h} style={styles.th}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style={styles.td}>Mar 01</td>
                    <td style={{...styles.td, color:'var(--red)', fontFamily:'var(--mono)'}}>₹1,675</td>
                    <td style={styles.td}>HDFC ••••4521</td>
                    <td style={styles.td}><span className="badge badge-active">Expected</span></td>
                  </tr>
                  <tr>
                    <td style={styles.td}>Mar 03</td>
                    <td style={{...styles.td, color:'var(--red)', fontFamily:'var(--mono)'}}>₹1,675</td>
                    <td style={styles.td}>ICICI ••••8811</td>
                    <td style={styles.td}><span className="badge badge-danger">Duplicate!</span></td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div style={{display:'flex', gap:10, marginTop:14}}>
              <button className="btn btn-primary">Raise Dispute</button>
              <button className="btn btn-ghost" onClick={() => dismiss('adobe')}>False Positive</button>
            </div>
          </div>
        </div>
      )}

      <div className="section-title">Trial → Paid Trap</div>
      <div style={styles.card}>
        <div style={styles.dupRow}>
          <div style={{fontSize:20}}>🪝</div>
          <div style={{flex:1}}>
            <div style={{fontSize:14, fontWeight:700}}>GitHub Copilot converting in 7 days</div>
            <div style={{fontFamily:'var(--mono)', fontSize:11, color:'var(--muted)'}}>
              Free trial started Feb 25 · Auto-converts Apr 1 · ₹833/month
            </div>
          </div>
          <button
            className="btn btn-danger btn-sm"
            onClick={() => setSelected({name:'GitHub Copilot Trial', amount:833})}
          >
            Cancel Trial
          </button>
        </div>
      </div>

      {selected && (
        <CancelModal
          sub={selected}
          onClose={() => setSelected(null)}
          onConfirm={() => setSelected(null)}
        />
      )}
    </div>
  );
}

const styles = {
  header:     { display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:32 },
  title:      { fontSize:28, fontWeight:800, letterSpacing:-0.5 },
  sub:        { fontSize:13, color:'var(--muted)', marginTop:4, fontFamily:'var(--mono)' },
  alert:      { background:'rgba(248,113,113,0.08)', border:'1px solid rgba(248,113,113,0.2)', borderRadius:12, padding:'14px 18px', display:'flex', alignItems:'center', gap:12, marginBottom:28, fontSize:13 },
  dot:        { width:8, height:8, borderRadius:'50%', background:'var(--red)', flexShrink:0 },
  card:       { background:'var(--surface)', border:'1px solid var(--border)', borderRadius:16, padding:24, marginBottom:24 },
  cardHeader: { display:'flex', alignItems:'center', gap:14, marginBottom:18 },
  icon:       { width:44, height:44, borderRadius:12, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 },
  dupRow:     { display:'flex', alignItems:'center', gap:12, padding:12, background:'var(--surface2)', borderRadius:10, marginBottom:8, border:'1px solid var(--border)' },
  tip:        { marginTop:12, padding:'10px 14px', background:'rgba(124,109,250,0.08)', borderRadius:8, fontFamily:'var(--mono)', fontSize:12, color:'var(--muted)' },
  th:         { textAlign:'left', padding:'10px 16px', fontFamily:'var(--mono)', fontSize:10, letterSpacing:1, color:'var(--muted)', textTransform:'uppercase', borderBottom:'1px solid var(--border)' },
  td:         { padding:'12px 16px', borderBottom:'1px solid var(--border)', fontSize:13, fontFamily:'var(--mono)' },
};