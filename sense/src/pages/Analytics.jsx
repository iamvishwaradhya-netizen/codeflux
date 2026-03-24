import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { monthlySpend } from '../data/subscriptions';
import StatCard from '../components/StatCard';

const categories = [
  { name:'🎬 Entertainment', count:4, monthly:1826, pct:28 },
  { name:'💼 Productivity',  count:3, monthly:2828, pct:44 },
  { name:'☁️ Cloud',         count:2, monthly:499,  pct:8  },
  { name:'🎧 Music',         count:2, monthly:358,  pct:6  },
  { name:'🏃 Fitness',       count:2, monthly:849,  pct:13 },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload?.length) return (
    <div style={{background:'var(--surface2)', border:'1px solid var(--border2)', borderRadius:8, padding:'10px 14px', fontFamily:'var(--mono)', fontSize:12}}>
      <div style={{color:'var(--muted)'}}>{label}</div>
      <div style={{color:'var(--accent2)', fontWeight:700}}>
        ₹{payload[0].value.toLocaleString('en-IN')}
      </div>
    </div>
  );
  return null;
};

export default function Analytics() {
  return (
    <div>
      <div style={styles.header}>
        <div>
          <div style={styles.title}>
            Spend <span style={{color:'var(--accent2)'}}>Analytics</span>
          </div>
          <div style={styles.sub}>6 months of subscription data</div>
        </div>
      </div>

      <div style={styles.chartCard}>
        <div style={styles.chartTitle}>Monthly Subscription Spend (₹)</div>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={monthlySpend} barSize={36}>
            <XAxis
              dataKey="month"
              tick={{fill:'var(--muted)', fontSize:12, fontFamily:'var(--mono)'}}
              axisLine={false}
              tickLine={false}
            />
            <YAxis hide />
            <Tooltip content={<CustomTooltip />} cursor={{fill:'rgba(255,255,255,0.03)'}} />
            <Bar dataKey="amount" radius={[6,6,0,0]}>
              {monthlySpend.map((entry, i) => (
                <Cell
                  key={i}
                  fill={i === monthlySpend.length - 1 ? 'var(--red)' : 'var(--accent)'}
                  opacity={i === monthlySpend.length - 1 ? 1 : 0.6}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div style={styles.grid}>
        <StatCard label="TOP CATEGORY"       value="Entertainment" color="var(--accent2)" sub="₹1,826/month" />
        <StatCard label="LONGEST UNUSED"     value="Adobe CC"      color="var(--amber)"   sub="42 days inactive" />
        <StatCard label="AVG PRICE INCREASE" value="+18%"          color="var(--red)"     sub="vs last year" />
      </div>

      <div className="section-title">Spend by Category</div>
      <div style={styles.tableCard}>
        <table style={styles.table}>
          <thead>
            <tr>
              {['Category','Services','Monthly','Annual','% of Total'].map(h => (
                <th key={h} style={styles.th}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {categories.map(c => (
              <tr key={c.name}>
                <td style={styles.td}>{c.name}</td>
                <td style={{...styles.td, fontFamily:'var(--mono)'}}>{c.count}</td>
                <td style={{...styles.td, fontFamily:'var(--mono)', color:'var(--red)'}}>
                  ₹{c.monthly.toLocaleString('en-IN')}
                </td>
                <td style={{...styles.td, fontFamily:'var(--mono)'}}>
                  ₹{(c.monthly * 12).toLocaleString('en-IN')}
                </td>
                <td style={{...styles.td, width:140}}>
                  <div style={styles.barBg}>
                    <div style={{...styles.barFill, width:`${c.pct}%`}} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const styles = {
  header:    { display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:32 },
  title:     { fontSize:28, fontWeight:800, letterSpacing:-0.5 },
  sub:       { fontSize:13, color:'var(--muted)', marginTop:4, fontFamily:'var(--mono)' },
  chartCard: { background:'var(--surface)', border:'1px solid var(--border)', borderRadius:16, padding:28, marginBottom:24 },
  chartTitle:{ fontSize:14, fontWeight:700, marginBottom:20 },
  grid:      { display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(200px,1fr))', gap:16, marginBottom:32 },
  tableCard: { background:'var(--surface)', border:'1px solid var(--border)', borderRadius:16, overflow:'hidden' },
  table:     { width:'100%', borderCollapse:'collapse', fontSize:13 },
  th:        { textAlign:'left', padding:'10px 16px', fontFamily:'var(--mono)', fontSize:10, letterSpacing:1, color:'var(--muted)', textTransform:'uppercase', borderBottom:'1px solid var(--border)' },
  td:        { padding:'14px 16px', borderBottom:'1px solid var(--border)' },
  barBg:     { background:'rgba(124,109,250,0.15)', borderRadius:4, height:6, overflow:'hidden' },
  barFill:   { height:'100%', background:'var(--accent)', borderRadius:4, transition:'width .5s' },
};