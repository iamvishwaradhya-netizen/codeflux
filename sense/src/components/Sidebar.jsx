import { NavLink } from 'react-router-dom';

const navItems = [
  { path: '/',               label: 'Dashboard',       badge: false },
  { path: '/subscriptions',  label: 'Subscriptions',   badge: true  },
  { path: '/import',         label: 'Import Data',      badge: false },
  { path: '/duplicates',     label: 'Duplicate Guard',  badge: true  },
  { path: '/analytics',      label: 'Analytics',        badge: false },
  { path: '/settings',       label: 'Settings',         badge: false },
];

export default function Sidebar() {
  return (
    <aside style={styles.sidebar}>
      <div style={styles.logo}>
        <div style={styles.logoMark}>
          Sub<span style={{color:'var(--accent2)'}}>Sense</span>
        </div>
        <div style={styles.logoSub}>SUBSCRIPTION RADAR</div>
      </div>
      <nav>
        {navItems.map(item => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === '/'}
            style={({ isActive }) => ({
              ...styles.navItem,
              ...(isActive ? styles.navActive : {}),
            })}
          >
            {item.label}
            {item.badge && <span style={styles.dot} />}
          </NavLink>
        ))}
      </nav>
      <div style={styles.navBottom}>
        <div style={styles.miniCard}>
          <div style={styles.miniLabel}>MONTHLY WASTE</div>
          <div style={styles.miniValue}>₹2,847</div>
          <div style={styles.miniSub}>3 unused services detected</div>
        </div>
      </div>
    </aside>
  );
}

const styles = {
  sidebar:   { width:240, borderRight:'1px solid var(--border)', padding:'28px 0', display:'flex', flexDirection:'column', height:'100vh', position:'sticky', top:0, background:'rgba(17,17,24,0.9)', backdropFilter:'blur(20px)' },
  logo:      { padding:'0 24px 28px', borderBottom:'1px solid var(--border)', marginBottom:24 },
  logoMark:  { fontSize:20, fontWeight:800, letterSpacing:-0.5 },
  logoSub:   { fontFamily:'var(--mono)', fontSize:10, color:'var(--muted)', marginTop:2, letterSpacing:1 },
  navItem:   { display:'flex', alignItems:'center', gap:10, padding:'10px 24px', fontSize:13, fontWeight:500, color:'var(--muted)', textDecoration:'none', borderLeft:'2px solid transparent', transition:'all .2s', margin:'1px 0' },
  navActive: { color:'var(--text)', borderLeftColor:'var(--accent)', background:'rgba(124,109,250,0.08)' },
  dot:       { width:6, height:6, borderRadius:'50%', background:'var(--red)', marginLeft:4 },
  navBottom: { marginTop:'auto', padding:'16px 24px 8px', borderTop:'1px solid var(--border)' },
  miniCard:  { background:'var(--surface2)', border:'1px solid var(--border)', borderRadius:12, padding:14 },
  miniLabel: { fontFamily:'var(--mono)', fontSize:10, color:'var(--muted)', letterSpacing:.5, marginBottom:6 },
  miniValue: { fontSize:22, fontWeight:700, color:'var(--red)' },
  miniSub:   { fontSize:11, color:'var(--muted)', marginTop:2 },
};