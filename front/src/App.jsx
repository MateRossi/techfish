import ReadingsPage from './pages/ReadingsPage'
import Layout from './layouts/Layout'
import { Routes, Route } from 'react-router-dom'
import MissingPage from './pages/MissingPage'
import LoginPage from './pages/LoginPage'
import LogonPage from './pages/LogonPage'

function App() {
  return (
    <Routes>
      <Route path='/login' element={<LoginPage />}/>
      <Route path='/logon' element={<LogonPage />} />
      <Route path='/' element={<Layout />}>
        {/* Rotas publicas */}
        <Route path='monitoramento' element={<ReadingsPage />} />
      </Route>

      <Route path='*' element={<MissingPage />} />
    </Routes>
  )
}

export default App;
