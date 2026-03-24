import { useState } from 'react';
import SubCard from '../components/SubCard';
import CancelModal from '../components/CancelModal';
import { subscriptionsData } from '../data/subscriptions';

const tabs = ['all', 'active', 'flagged', 'trial'];

export default function Subscriptions() {
  const [filter, setFilter]     = useState('all');
  const [subs, setSubs]         = useState(subscriptionsData);
  const [selected, setSelected] = useState(null);
  const [showAdd, setShowAdd]   = useState(false);
  const [form, setForm]         = useState({ name:'', amount:'', cycle:'Monthly', email:'' });

  const filtered = filter === 'all' ? subs : subs.filter(s => s.status === filter);

  const handleCancel = (sub) => {
    setSubs(prev => prev.filter(s => s.id !== sub.id));
    setSelected(null);
  };

  const handleAdd = () => {
    if (!form.name) return;
    setSubs(prev => [...prev, {
      id: Date.now(), ...form,
      amount: Number(form.amount) || 0,
      icon:'📦', color:'#7c6dfa',
      status:'active', renewal:'Custom', category:'Other',
    }]);
    setShowAdd(false);
    setForm({ name:'', amount:'', cycle:'Monthly', email:'' });
  };

  return (
    <div>
      <div style={styles.header}>
        <div>
          <div style={styles.title}>
            All <span style={{color:'var(--accent2)'}}>Subscriptions</span>
          </div>
          <div style={styles.sub}>
            AI-detected from your transaction history
          </div>
        </div>
        <button className="btn btn-primary" onClick={() => setShowAdd(true)}>+ Add Manual</button>
      </div>

      <div style={styles.tabs}>
        {tabs.map(t => (
          <div
            key={t}
            style={{...styles.tab, ...(filter === t ? styles.tabActive : {})}}
            onClick={() => setFilter(t)}
          >
            {t.charAt(0).toUpperCase() + t.slice(1)}{' '}
            ({t === 'all' ? subs.length : subs.filter(s => s.status === t).length})
          </div>
        ))}
      </div>

      <div>
        {filtered.map(sub => (
          <SubCard key={sub.id} sub={sub} onCancel={setSelected} />
        ))}
        {filtered.length === 0 && (
          <div style={styles.empty}>No subscriptions found.</div>
        )}
      </div>

      {selected && (
        <CancelModal sub={selected} onClose={() => setSelected(null)} onConfirm={handleCancel} />
      )}

      {showAdd && (
        <div style={styles.overlay} onClick={() => setShowAdd(false)}>
          <div style={styles.modal} onClick={e => e.stopPropagation()}>
            <div style={styles.modalTitle}>+ Add Subscription</div>
            <div style={styles.modalSub}>Manually add a recurring subscription</div>
            <div style={styles.row}>
              <div style={{flex:1}}>
                <div className="input-label">SERVICE NAME</div>
                <input
                  className="input"
                  placeholder="e.g. Netflix"
                  value={form.name}
                  onChange={e => setForm({...form, name:e.target.value})}
                />
              </div>
              <div style={{flex:1}}>
                <div className="input-label">AMOUNT (₹)</div>
                <input
                  className="input"
                  type="number"
                  placeholder="499"
                  value={form.amount}
                  onChange={e => setForm({...form, amount:e.target.value})}
                />
              </div>
            </div>
            <div style={{marginBottom:16}}>
              <div className="input-label">BILLING CYCLE</div>
              <select
                className="input"
                value={form.cycle}
                onChange={e => setForm({...form, cycle:e.target.value})}
                style={{background:'var(--surface2)', color:'var(--text)'}}
              >
                <option>Monthly</option>
                <option>Yearly</option>
                <option>Weekly</option>
              </select>
            </div>
            <div style={{marginBottom:20}}>
              <div className="input-label">EMAIL ID</div>
              <input
                className="input"
                placeholder="Which account is this under?"
                value={form.email}
                onChange={e => setForm({...form, email:e.target.value})}
              />
            </div>
            <div style={{display:'flex', gap:10}}>
              <button className="btn btn-primary" onClick={handleAdd}>Save</button>
              <button className="btn btn-ghost" onClick={() => setShowAdd(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  header:     { display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:32 },
  title:      { fontSize:28, fontWeight:800, letterSpacing:-0.5 },
  sub:        { fontSize:13, color:'var(--muted)', marginTop:4, fontFamily:'var(--mono)' },
  tabs:       { display:'flex', gap:4, background:'var(--surface2)', borderRadius:10, padding:4, marginBottom:24, width:'fit-content' },
  tab:        { padding:'8px 16px', borderRadius:8, fontSize:13, fontWeight:600, cursor:'pointer', color:'var(--muted)', transition:'all .2s' },
  tabActive:  { background:'var(--surface)', color:'var(--text)', boxShadow:'0 1px 3px rgba(0,0,0,0.3)' },
  empty:      { textAlign:'center', color:'var(--muted)', fontFamily:'var(--mono)', padding:40 },
  overlay:    { position:'fixed', inset:0, background:'rgba(0,0,0,0.7)', zIndex:100, display:'flex', alignItems:'center', justifyContent:'center', backdropFilter:'blur(4px)' },
  modal:      { background:'var(--surface)', border:'1px solid var(--border2)', borderRadius:20, padding:32, maxWidth:480, width:'90%' },
  modalTitle: { fontSize:18, fontWeight:800, marginBottom:6 },
  modalSub:   { fontFamily:'var(--mono)', fontSize:12, color:'var(--muted)', marginBottom:24 },
  row:        { display:'flex', gap:12, marginBottom:16 },
};