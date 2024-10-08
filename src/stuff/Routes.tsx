import React from 'react'
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom'

// components
import Home from '../pages/home'

// auth components
import SignIn from '../pages/auth/signIn'
import SignUp from '../pages/auth/signUp'

// user components
import Profile from '../pages/user/profile'
import UserList from '../pages/user/list'

// manga components
import Manga from '../pages/manga'

const AppRoutes: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="sign-in" element={<SignIn />} />
        <Route path="sign-up" element={<SignUp />} />
        <Route path="/user">
          <Route path="my-list" element={<UserList />} />
          <Route path="profile" element={<Profile />} />
        </Route>
        <Route path="manga">
          <Route path="info/:term" element={<Manga />} />
          {/* <Route path="info/:term" element={<MangaDetail />} /> */}
        </Route>
        {/* <Route path="*" element={<>Not Found</>} /> */}
      </Routes>
    </Router>
  )
}

export default AppRoutes
