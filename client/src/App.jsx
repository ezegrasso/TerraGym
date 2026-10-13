import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from '@/contexts/AuthContext'
import AppRoutes from '@/routes'
import { UnsavedProvider } from '@/contexts/UnsavedContext'

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <UnsavedProvider>
          <AppRoutes />
        </UnsavedProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}