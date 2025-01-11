import Register from '../pages/Register'
import Login from '../pages/Login'
import Home from '../pages/Home'
import Dashboard from '../pages/Dashboard'
import ProtectedRoute from './ProtectedRoute'
import ConditionalDashboard from './ConditionalDashBoard'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

function AppRouter() {

  return (
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
  )
}

export default AppRouter
