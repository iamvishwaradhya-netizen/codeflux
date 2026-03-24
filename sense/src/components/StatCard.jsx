export default function StatCard({ label, value, sub, color = 'var(--text)', onClick }) {
  return (
    <div style={{...styles.card, cursor: onClick ? 'pointer' : 'default'}} onClick={onClick}>
      <div style={styles.label}>{label}</div>
      <div style={{...styles.value, color}}>{value}</div>
      <div style={styles.sub}>{sub}</div>
    </div>
  );
}

const styles = {
  card:  { background:'var(--surface)', border:'1px solid var(--border)', borderRadius:16, padding:24 },
  label: { fontFamily:'var(--mono)', fontSize:10, letterSpacing:1, color:'var(--muted)', textTransform:'uppercase', marginBottom:10 },
  value: { fontSize:30, fontWeight:800, letterSpacing:-1 },
  sub:   { fontSize:12, color:'var(--muted)', marginTop:6, fontFamily:'var(--mono)' },
};