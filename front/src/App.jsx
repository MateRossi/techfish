import Layout from './layouts/Layout'
import { Routes, Route } from 'react-router-dom'
import MissingPage from './pages/MissingPage'
import LoginPage from './pages/LoginPage'
import LogonPage from './pages/LogonPage'
import TankPage from './pages/TankPage'
import ReadingsProvider from './context/ReadingsContext'
import TankListPage from './pages/TankListPage'
import PersistLogin from './components/PersistLogin'

function App() {
  return (
    <Routes>
      <Route path='/' element={<LoginPage />} />
      <Route path='/register' element={<LogonPage />} />
      
      {/*rotas particulares ao usuário*/}
      <Route element={<PersistLogin />}>
        <Route path='/user' element={<Layout />}>
          <Route path='/user/tanques' element={<TankListPage />} />
          <Route path='user/tanqus/1' element={<ReadingsProvider><TankPage /></ReadingsProvider>} />
        </Route>
      </Route>

      <Route path='*' element={<MissingPage />} />
    </Routes>
  )
}

export default App;
