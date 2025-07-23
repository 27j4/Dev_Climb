import { useState } from 'react'
import Body from './components/Body'
import Login from './components/Login'
import Profile from './components/Profile'
import {BrowserRouter, Route, Routes, useNavigate} from 'react-router-dom'
import {Provider, useSelector} from 'react-redux'
import appStore from './utils/appStore'
import Feed from './components/Feed'
import Connections from './components/Connections'
import Requests from './components/Requests'
import Chat from './components/Chat'
import Premium from './components/Premium'
import Codechef from './components/codechef'
import Codeforces from './components/codeforces'
import {Toaster} from 'react-hot-toast'
function App() {
  const user = useSelector(store=>store?.user);
  return (
    <div>
    <Toaster/>
    <BrowserRouter basename='/'>
      <Routes>
        <Route path='/' element={<Body/>}>
          <Route path='/' element={<Feed/>}/>
          <Route path='/login' element={user ?<Profile/>:<Login/>}/>
          <Route path='/profile' element={<Profile/>}/>
          <Route path='/connections' element={<Connections/>}/>
          <Route path='/requests' element={<Requests/>}/>
          <Route path='/chatWithFriends/:targetUserId' element={<Chat/>}/>
          <Route path='/premium' element={<Premium/>}/>
          <Route path='/codechef' element={<Codechef/>}/>
          <Route path='/codeforces' element={<Codeforces/>}/>
          
        </Route>
      </Routes>
    </BrowserRouter>
    </div>
  )
}

export default App
