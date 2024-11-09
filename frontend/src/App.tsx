import './styles/App.css';
import LoginPage from './pages/loginPage';
import { DashboardPage } from './pages/dashboardPage';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import RegisterPage from './pages/registerPage';
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          {/* <Route path="/register" element={<RegisterPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} /> */}
          <Route path="/dashboard" element={<DashboardPage />}>
            {/* <Route path="devices" element={<DevicesPage />} />
            <Route path="profile" element={<ProfilePage />} /> */}
          </Route>
          <Route path="*" element={<Navigate to="/" replace />}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
