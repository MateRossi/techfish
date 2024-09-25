import Layout from './layouts/Layout'
import { Routes, Route } from 'react-router-dom'
import MissingPage from './pages/MissingPage'
import LoginPage from './pages/LoginPage'
import LogonPage from './pages/LogonPage'
import TanqueListPage from './pages/TanqueListPage'
import PersistLogin from './components/PersistLogin'
import TanquePage from './pages/TanquePage'
import FasesPage from './pages/FasesPage'
import EspeciesPage from './pages/EspeciesPage'
import Faturamento from './pages/FaturamentoPage'
import AparelhosPage from './pages/AparelhosPage'
import HomePage from './pages/HomePage'

function App() {
  return (
    <Routes>
      <Route path='/auth' element={<LoginPage />} />
      <Route path='/register' element={<LogonPage />} />

      {/*rotas particulares ao usuário*/}
      <Route element={<PersistLogin />}>
        <Route path='/' element={<Layout />}>
          <Route path='/' element={<HomePage />} />
          <Route path='/users/:userId/tanques' element={<TanqueListPage />} />
          <Route path='/users/:userId/aparelhos' element={<AparelhosPage />} />
          {/*<Route path='/user/:userId/tanque/:tanqueId' element={<ReadingsProvider><TankPage /></ReadingsProvider>} />*/}
          <Route path='/users/:userId/tanques/:tanqueId' element={<TanquePage />} />
          <Route path='/users/:userId/fases' element={<FasesPage />} />
          <Route path='/users/:userId/especies' element={<EspeciesPage />} />
          <Route path='/users/:userId/faturamento' element={<Faturamento />} />
        </Route>
      </Route>

      <Route path='*' element={<MissingPage />} />
    </Routes>
  )
}

export default App;
