import { useNavigate } from 'react-router-dom';
import StatCard from '../components/StatCard';

const renewals = [
  { date:'Mar 27', name:'Netflix Premium',     amount:'₹649',   status:'active',  dot:'#f87171' },
  { date:'Mar 28', name:'Spotify Family',       amount:'₹179',   status:'danger',  dot:'#fbbf24' },
  { date:'Mar 30', name:'Adobe Creative Cloud', amount:'₹1,675', status:'warning', dot:'#fbbf24' },
  { date:'Apr 1',  name:'GitHub Copilot',       amount:'₹833',   status:'trial',   dot:'#22d3ee' },
];

const badgeClass = { active:'badge-active', danger:'badge-danger', warning:'badge-warning', trial:'badge-trial' };
const badgeText  = { active:'Active', danger:'Duplicate!', warning:'Unused 30d', trial:'Trial→Paid' };

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <div>
      <div style={styles.header}>
        <div>
          <div style={styles.title}>
            Good morning, <span style={{color:'var(--accent2)'}}>Arjun</span> 👋
          </div>
          <div style={styles.sub}>
            14 active subscriptions · ₹6,420/month total
          </div>
        </div>
        <button className="btn btn-primary" onClick={() => navigate('/import')}>
          + Import Transactions
        </button>
      </div>

      <div style={styles.alert}>
        <span style={styles.alertDot} />
        <span>
          <strong>2 duplicate payments detected</strong> — Spotify charged on 2 accounts.{' '}
          <span
            style={{color:'var(--accent2)', cursor:'pointer'}}
            onClick={() => navigate('/duplicates')}
          >
            Review now →
          </span>
        </span>
      </div>

      <div style={styles.grid}>
        <StatCard label="TOTAL MONTHLY"        value="₹6,420" color="var(--red)"     sub="Up ₹520 from last month" />
        <StatCard label="POTENTIAL SAVINGS"    value="₹2,847" color="var(--green)"   sub="3 unused + 2 duplicates" />
        <StatCard label="RENEWALS THIS WEEK"   value="4"      color="var(--amber)"   sub="₹1,299 due in 3 days" />
        <StatCard label="ACTIVE SUBSCRIPTIONS" value="14"     color="var(--accent2)" sub="2 trials converting soon" />
      </div>

      <div className="section-title">Upcoming Renewals</div>
      <div style={styles.card}>
        {renewals.map((r, i) => (
          <div
            key={i}
            style={{
              ...styles.tlItem,
              borderBottom: i < renewals.length - 1 ? '1px solid var(--border)' : 'none',
            }}
          >
            <div style={styles.tlDate}>{r.date}</div>
            <div style={{...styles.tlDot, background:r.dot}} />
            <div style={{flex:1}}>
              <div style={{fontSize:14, fontWeight:700}}>{r.name}</div>
              <div style={{fontFamily:'var(--mono)', fontSize:11, color:'var(--muted)'}}>
                {r.amount}/month
              </div>
            </div>
            <span className={`badge ${badgeClass[r.status]}`}>{badgeText[r.status]}</span>
          </div>
        ))}
      </div>

      <div className="section-title" style={{marginTop:32}}>Quick Actions</div>
      <div style={styles.grid}>
        <div style={styles.actionCard} onClick={() => navigate('/duplicates')}>
          <div style={styles.actionIcon}>⚠️</div>
          <div style={styles.actionTitle}>Review Duplicates</div>
          <div style={styles.actionSub}>2 double charges found</div>
        </div>
        <div style={styles.actionCard} onClick={() => navigate('/subscriptions')}>
          <div style={styles.actionIcon}>✂️</div>
          <div style={styles.actionTitle}>Cancel Unused</div>
          <div style={styles.actionSub}>Adobe unused for 30 days</div>
        </div>
        <div style={styles.actionCard} onClick={() => navigate('/import')}>
          <div style={styles.actionIcon}>📥</div>
          <div style={styles.actionTitle}>Import Transactions</div>
          <div style={styles.actionSub}>Upload CSV or connect bank</div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  header:     { display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:32 },
  title:      { fontSize:28, fontWeight:800, letterSpacing:-0.5 },
  sub:        { fontSize:13, color:'var(--muted)', marginTop:4, fontFamily:'var(--mono)' },
  alert:      { background:'rgba(248,113,113,0.08)', border:'1px solid rgba(248,113,113,0.2)', borderRadius:12, padding:'14px 18px', display:'flex', alignItems:'center', gap:12, marginBottom:24, fontSize:13 },
  alertDot:   { width:8, height:8, borderRadius:'50%', background:'var(--red)', flexShrink:0 },
  grid:       { display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(220px,1fr))', gap:16, marginBottom:32 },
  card:       { background:'var(--surface)', border:'1px solid var(--border)', borderRadius:16, padding:'8px 20px', marginBottom:32 },
  tlItem:     { display:'flex', alignItems:'center', gap:16, padding:'14px 0' },
  tlDate:     { fontFamily:'var(--mono)', fontSize:11, color:'var(--muted)', width:60, flexShrink:0 },
  tlDot:      { width:10, height:10, borderRadius:'50%', flexShrink:0 },
  actionCard: { background:'var(--surface)', border:'1px solid var(--border)', borderRadius:16, padding:24, cursor:'pointer', transition:'all .2s' },
  actionIcon: { fontSize:28, marginBottom:12 },
  actionTitle:{ fontSize:15, fontWeight:700, marginBottom:4 },
  actionSub:  { fontSize:12, color:'var(--muted)', fontFamily:'var(--mono)' },
};