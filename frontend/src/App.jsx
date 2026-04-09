import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LendingProvider } from './context/LendingContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import ApplyLoan from './pages/ApplyLoan';
import History from './pages/History';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <LendingProvider>
      <Router>
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/apply" element={<ApplyLoan />} />
            <Route path="/history" element={<History />} />
          </Routes>
          <Toaster 
            position="top-center"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#363636',
                color: '#fff',
                borderRadius: '12px',
              },
              success: {
                duration: 3000,
                iconTheme: {
                  primary: '#22c55e',
                  secondary: '#fff',
                },
              },
              error: {
                duration: 4000,
                iconTheme: {
                  primary: '#ef4444',
                  secondary: '#fff',
                },
              },
            }}
          />
        </div>
      </Router>
    </LendingProvider>
  );
}

export default App;