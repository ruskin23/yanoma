import './App.css'
import Register from './pages/Register'
import Login from './pages/Login'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import { AuthProvider } from './routers/AuthContext'
import ProtectedRoute from './routers/ProtectedRoute'
import ConditionalDashboard from './routers/ConditionalDashBoard'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

function App() {

  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={(
            <ConditionalDashboard>
              <Home />
            </ConditionalDashboard>)}
          />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />

          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App
