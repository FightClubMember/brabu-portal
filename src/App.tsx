import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { UserProvider } from './context/UserContext';
import { Layout } from './components/layout/Layout';
import { OnboardingModal } from './components/auth/OnboardingModal';
import { StudyMode } from './pages/StudyMode';
import { Dashboard } from './pages/Dashboard';
import { CalculatorPage } from './pages/Calculator';
import { SyllabusPage } from './pages/Syllabus';
import { AttendancePage } from './pages/Attendance';
import { MathSuite } from './pages/MathSuite';
import { ResourcesPage } from './pages/Resources';
import { AboutPage } from './pages/About';

function App() {
  return (
    <ThemeProvider>
      <UserProvider>
        <Router>
          <OnboardingModal />
          <Routes>
            <Route path="/study" element={<StudyMode isOpen={true} onClose={() => window.history.back()} />} />
            <Route path="/*" element={
              <Layout>
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/calculator" element={<CalculatorPage />} />
                  <Route path="/syllabus" element={<SyllabusPage />} />
                  <Route path="/attendance" element={<AttendancePage />} />
                  <Route path="/math" element={<MathSuite />} />
                  <Route path="/resources" element={<ResourcesPage />} />
                  <Route path="/about" element={<AboutPage />} />
                  <Route path="*" element={<div className="p-10 text-center text-white/50">Page under construction</div>} />
                </Routes>
              </Layout>
            } />
          </Routes>
        </Router>
      </UserProvider>
    </ThemeProvider>
  );
}

export default App;
