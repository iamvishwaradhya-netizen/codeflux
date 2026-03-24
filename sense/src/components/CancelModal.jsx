import { useState } from 'react';

const steps = [
  'Verify identity',
  'Navigate to cancellation page',
  'Confirm cancellation',
  'Remove from dashboard',
];

export default function CancelModal({ sub, onClose, onConfirm }) {
  const [step, setStep] = useState(0);

  const runFlow = () => {
    let i = 1;
    const t = setInterval(() => {
      setStep(i);
      i++;
      if (i > 4) {
        clearInterval(t);
        setTimeout(() => {
          onConfirm(sub);
          onClose();
          setStep(0);
        }, 500);
      }
    }, 600);
  };

  if (!sub) return null;
  const annual = (sub.amount * 12).toLocaleString('en-IN');

  return (
    <div style={styles.overlay} onClick={onClose}>
      <div style={styles.modal} onClick={e => e.stopPropagation()}>
        <div style={styles.title}>Cancel Subscription</div>
        <div style={styles.subText}>Cancelling {sub.name}</div>

        <div style={{marginBottom:8}}>
          {steps.map((s, i) => (
            <div key={i} style={styles.stepRow}>
              <div style={{...styles.stepNum, ...(step > i ? styles.stepDone : {})}}>
                {step > i ? '✓' : i + 1}
              </div>
              <div style={{paddingTop:8}}>
                <div style={styles.stepTitle}>{s}</div>
                <div style={styles.stepDesc}>Step {i + 1} of cancel flow</div>
              </div>
            </div>
          ))}
        </div>

        <div style={styles.saving}>
          Save ₹{sub.amount}/month = ₹{annual}/year
        </div>

        <div style={styles.actions}>
          <button className="btn btn-primary" onClick={runFlow}>Proceed to Cancel</button>
          <button className="btn btn-ghost" onClick={onClose}>Not Now</button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  overlay:  { position:'fixed', inset:0, background:'rgba(0,0,0,0.7)', zIndex:100, display:'flex', alignItems:'center', justifyContent:'center', backdropFilter:'blur(4px)' },
  modal:    { background:'var(--surface)', border:'1px solid var(--border2)', borderRadius:20, padding:32, maxWidth:480, width:'90%' },
  title:    { fontSize:18, fontWeight:800, marginBottom:6 },
  subText:  { fontFamily:'var(--mono)', fontSize:12, color:'var(--muted)', marginBottom:24 },
  stepRow:  { display:'flex', gap:14, marginBottom:16, alignItems:'flex-start' },
  stepNum:  { width:36, height:36, borderRadius:'50%', background:'var(--surface2)', border:'1px solid var(--border2)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:13, fontWeight:700, color:'var(--accent2)', flexShrink:0 },
  stepDone: { background:'rgba(52,211,153,0.1)', borderColor:'var(--green)', color:'var(--green)' },
  stepTitle:{ fontSize:14, fontWeight:700 },
  stepDesc: { fontFamily:'var(--mono)', fontSize:11, color:'var(--muted)' },
  saving:   { background:'rgba(52,211,153,0.08)', border:'1px solid rgba(52,211,153,0.2)', borderRadius:10, padding:'12px 16px', fontFamily:'var(--mono)', fontSize:12, color:'var(--green)', margin:'16px 0' },
  actions:  { display:'flex', gap:10 },
};