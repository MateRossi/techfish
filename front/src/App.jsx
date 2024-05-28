import Layout from './layouts/Layout'
import { Routes, Route } from 'react-router-dom'
import MissingPage from './pages/MissingPage'
import LoginPage from './pages/LoginPage'
import LogonPage from './pages/LogonPage'
import TankPage from './pages/TankPage'
import ReadingsProvider from './context/ReadingsContext'
import TankListPage from './pages/TankListPage'

function App() {
  return (
    <Routes>
      <Route path='/login' element={<LoginPage />}/>
      <Route path='/logon' element={<LogonPage />} />
      <Route path='/' element={<Layout />}>
        {/* Rotas publicas */}
        {/*<Route path='monitoramento' element={<ReadingsPage />} />*/}
        <Route path='tanques' element={<TankListPage />} />
        <Route path='tanque' element={<ReadingsProvider><TankPage /></ReadingsProvider>}/>
      </Route>

      <Route path='*' element={<MissingPage />} />
    </Routes>
  )
}

export default App;
