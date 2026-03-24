export default function SubCard({ sub, onCancel }) {
  const badgeClass = sub.status === 'active'  ? 'badge-active'
                   : sub.status === 'trial'   ? 'badge-trial'
                   : 'badge-danger';
  const badgeText  = sub.status === 'trial'   ? 'Trial'
                   : sub.status === 'flagged' ? 'Review'
                   : 'Active';

  return (
    <div style={{...styles.card, ...(sub.status === 'flagged' ? styles.flagged : {})}}>
      <div style={{...styles.icon, background: sub.color + '22', fontSize:20}}>
        {sub.icon}
      </div>
      <div style={styles.info}>
        <div style={styles.name}>
          {sub.name}{' '}
          <span className={`badge ${badgeClass}`}>{badgeText}</span>
        </div>
        <div style={styles.meta}>
          {sub.email} · Renews {sub.renewal}
        </div>
      </div>
      <div style={styles.amount}>
        ₹{sub.amount.toLocaleString('en-IN')}
        <span style={styles.cycle}>/mo</span>
      </div>
      <button className="btn btn-danger btn-sm" onClick={() => onCancel(sub)}>
        Cancel
      </button>
    </div>
  );
}

const styles = {
  card:    { background:'var(--surface)', border:'1px solid var(--border)', borderRadius:14, padding:'16px 20px', display:'flex', alignItems:'center', gap:16, marginBottom:10, transition:'all .2s' },
  flagged: { borderColor:'rgba(248,113,113,0.3)', background:'rgba(248,113,113,0.04)' },
  icon:    { width:44, height:44, borderRadius:12, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 },
  info:    { flex:1, minWidth:0 },
  name:    { fontSize:15, fontWeight:700 },
  meta:    { fontFamily:'var(--mono)', fontSize:11, color:'var(--muted)', marginTop:2 },
  amount:  { fontSize:18, fontWeight:800, fontFamily:'var(--mono)', color:'var(--red)', whiteSpace:'nowrap' },
  cycle:   { fontSize:11, color:'var(--muted)', fontWeight:400 },
};