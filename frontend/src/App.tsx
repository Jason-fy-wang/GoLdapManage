import './App.css'
import { Routes, Route, Navigate, Outlet } from 'react-router'
import { Login } from './pages/Login'
import axios from 'axios'
import {gettoken} from './pages/api/apis'
import { Detail } from './pages/Detail'
import {RecordInfo} from './pages/RecordInfo'
import { Display } from './component/Display'
import { Ladd } from './component/Ladd'
//axios.defaults.baseURL="http://192.168.20.21:8080/api/v1"
axios.defaults.baseURL="/api/v1"

function App() {

  const ProtectRoute = () => {
    const t = gettoken()
    if (!t) {
      return <Navigate to='login' replace/>;
    }
    return <Outlet/>;
  }

  return (
    <>
      <Routes>
        <Route path='login' element={<Login/>}/>
        <Route path='/' element={<Login/>}/>
        <Route element={ProtectRoute()}>
          <Route path='detail' element={<Detail/>}>
            <Route path='record' element={<RecordInfo/>}>
              <Route path='display' element={<Display/>}/>
              <Route path='add' element={<Ladd/>} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </>
  )
}

export default App
