import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Subscriptions from './pages/Subscriptions';
import ImportData from './pages/ImportData';
import DuplicateGuard from './pages/DuplicateGuard';
import Analytics from './pages/Analytics';
import Settings from './pages/Settings';
import './styles/global.css';

export default function App() {
  return (
    <BrowserRouter>
      <div style={{ display: 'flex', minHeight: '100vh' }}>
        <Sidebar />
        <main style={{ flex: 1, padding: 40, overflowY: 'auto' }}>
          <Routes>
            <Route path="/"              element={<Dashboard />}     />
            <Route path="/subscriptions" element={<Subscriptions />} />
            <Route path="/import"        element={<ImportData />}    />
            <Route path="/duplicates"    element={<DuplicateGuard />}/>
            <Route path="/analytics"     element={<Analytics />}     />
            <Route path="/settings"      element={<Settings />}      />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}