import './App.css'
import { AuthProvider } from './routers/AuthContext'
import { TokenProvider } from './routers/TokenContext'
import AppRouter from './routers/AppRoutes'

function App() {

  return (
    <TokenProvider>
      <AuthProvider>
        <AppRouter />
      </AuthProvider>
    </TokenProvider>
  )
}

export default App
