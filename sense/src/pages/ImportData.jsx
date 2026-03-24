import { useState } from 'react';

const detected = [
  { name:'Netflix',    amount:'₹649',   confidence:'98%', cColor:'var(--green)' },
  { name:'Spotify',    amount:'₹179',   confidence:'95%', cColor:'var(--green)' },
  { name:'Adobe CC',   amount:'₹1,675', confidence:'87%', cColor:'var(--amber)' },
  { name:'Notion Pro', amount:'₹320',   confidence:'92%', cColor:'var(--green)' },
];

export default function ImportData() {
  const [status, setStatus]     = useState('idle');
  const [added, setAdded]       = useState([]);
  const [fileName, setFileName] = useState('');

  const simulate = (name) => {
    setFileName(name);
    setStatus('loading');
    setTimeout(() => setStatus('done'), 2000);
  };

  const handleFile  = (e) => { const f = e.target.files[0]; if (f) simulate(f.name); };
  const handleDrop  = (e) => { e.preventDefault(); const f = e.dataTransfer.files[0]; if (f) simulate(f.name); };
  const toggleAdd   = (name) => setAdded(prev => prev.includes(name) ? prev.filter(n => n !== name) : [...prev, name]);

  return (
    <div>
      <div style={styles.header}>
        <div>
          <div style={styles.title}>Import <span style={{color:'var(--accent2)'}}>Transaction Data</span></div>
          <div style={styles.sub}>We detect recurring payments automatically</div>
        </div>
      </div>

      {/* Drop Zone */}
      <div
        style={styles.dropzone}
        onDragOver={e => e.preventDefault()}
        onDrop={handleDrop}
        onClick={() => document.getElementById('fileInput').click()}
      >
        <input id="fileInput" type="file" accept=".csv" style={{display:'none'}} onChange={handleFile} />

        {status === 'idle' && (
          <>
            <div style={styles.dzIcon}>📂</div>
            <div style={styles.dzTitle}>Drop your bank statement CSV here</div>
            <div style={styles.dzSub}>Supports HDFC, ICICI, SBI, Axis formats</div>
          </>
        )}

        {status === 'loading' && (
          <>
            <div style={styles.dzIcon}>⏳</div>
            <div style={styles.dzTitle}>Analysing {fileName}...</div>
            <div style={styles.dzSub}>Detecting recurring patterns</div>
          </>
        )}

        {status === 'done' && (
          <>
            <div style={styles.dzIcon}>✅</div>
            <div style={styles.dzTitle}>Analysis complete!</div>
            <div style={styles.dzSub}>14 recurring payments detected</div>
          </>
        )}
      </div>

      {/* Bank Connect */}
      <div className="section-title">Or Connect Your Bank</div>
      <div style={styles.bankGrid}>
        {[['HDFC','#003366'], ['ICICI','#F37920'], ['SBI','#2d6bb5']].map(([bank, color]) => (
          <div key={bank} style={styles.bankCard} onClick={() => simulate(bank + ' transactions')}>
            <div style={{...styles.bankIcon, background:color, color:'#fff', fontSize:13, fontWeight:700}}>
              {bank}
            </div>
            <div>
              <div style={{fontSize:14, fontWeight:700}}>{bank} Bank</div>
              <div style={{fontFamily:'var(--mono)', fontSize:11, color:'var(--muted)'}}>
                Net banking import
              </div>
            </div>
            <button className="btn btn-ghost btn-sm" style={{marginLeft:'auto'}}>Connect</button>
          </div>
        ))}
      </div>

      {/* Results */}
      {status === 'done' && (
        <div>
          <div style={styles.successBanner}>
            ✓ Detected 14 recurring subscriptions from 3 months of data.
          </div>
          <div className="section-title">Detected Recurring Payments</div>
          <div style={styles.tableWrap}>
            <table style={styles.table}>
              <thead>
                <tr>
                  {['Merchant','Amount','Confidence','Action'].map(h => (
                    <th key={h} style={styles.th}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {detected.map(d => (
                  <tr key={d.name}>
                    <td style={styles.td}><strong>{d.name}</strong></td>
                    <td style={{...styles.td, fontFamily:'var(--mono)', color:'var(--red)'}}>{d.amount}</td>
                    <td style={{...styles.td, fontFamily:'var(--mono)', color:d.cColor}}>{d.confidence}</td>
                    <td style={styles.td}>
                      <button
                        className={`btn btn-sm ${added.includes(d.name) ? 'btn-ghost' : 'btn-primary'}`}
                        onClick={() => toggleAdd(d.name)}
                      >
                        {added.includes(d.name) ? '✓ Added' : 'Add'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div style={{display:'flex', gap:10, marginTop:16}}>
            <button className="btn btn-primary" onClick={() => setAdded(detected.map(d => d.name))}>
              Add All
            </button>
            <button className="btn btn-ghost" onClick={() => setStatus('idle')}>Reset</button>
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  header:        { display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:32 },
  title:         { fontSize:28, fontWeight:800, letterSpacing:-0.5 },
  sub:           { fontSize:13, color:'var(--muted)', marginTop:4, fontFamily:'var(--mono)' },
  dropzone:      { border:'2px dashed var(--border2)', borderRadius:16, padding:60, textAlign:'center', cursor:'pointer', marginBottom:32, transition:'all .2s' },
  dzIcon:        { fontSize:48, marginBottom:16 },
  dzTitle:       { fontSize:18, fontWeight:700, marginBottom:8 },
  dzSub:         { fontSize:13, color:'var(--muted)', fontFamily:'var(--mono)' },
  bankGrid:      { display:'flex', flexDirection:'column', gap:10, marginBottom:32 },
  bankCard:      { background:'var(--surface)', border:'1px solid var(--border)', borderRadius:14, padding:'14px 20px', display:'flex', alignItems:'center', gap:14, cursor:'pointer' },
  bankIcon:      { width:44, height:44, borderRadius:10, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 },
  successBanner: { background:'rgba(52,211,153,0.08)', border:'1px solid rgba(52,211,153,0.2)', borderRadius:12, padding:'12px 18px', color:'var(--green)', fontFamily:'var(--mono)', fontSize:13, marginBottom:20 },
  tableWrap:     { background:'var(--surface)', border:'1px solid var(--border)', borderRadius:16, overflow:'hidden' },
  table:         { width:'100%', borderCollapse:'collapse', fontSize:13 },
  th:            { textAlign:'left', padding:'10px 16px', fontFamily:'var(--mono)', fontSize:10, letterSpacing:1, color:'var(--muted)', textTransform:'uppercase', borderBottom:'1px solid var(--border)' },
  td:            { padding:'12px 16px', borderBottom:'1px solid var(--border)' },
};