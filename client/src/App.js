import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import Menu from './Component/Menu'
import Home from './Pages/Default/Home'
import About from './Pages/Default/About'
import Contact from './Pages/Default/Contact'
import Pnf from './Pages/Default/Pnf'
import Register from './Pages/Auth/Register'
import Login from './Pages/Auth/Login'
import Courses from './Pages/Default/Courses'
import Footer from './Component/Footer'
import Dashboard from './Pages/Dashboard/Dashboard'
import StudentDashboard from './Pages/Dashboard/Student/StudentDashboard'
import TrainerDashboard from './Pages/Dashboard/Trainer/TrainerDashboard'
import AdminDashboard from './Pages/Dashboard/Admin/AdminDashboard'
import PrivateRouter from './PrivateRoute/PrivateRouter'
import AllCourses from './Pages/Dashboard/Trainer/Course/Courses'
import Categories from './Pages/Dashboard/Trainer/Category/Categories'
import TrainerHome from './Pages/Dashboard/Trainer/Home/TrainerHome'
import NewCourse from './Pages/Dashboard/Trainer/Course/NewCourse'
import NewChapter from './Pages/Dashboard/Trainer/chapter/NewChapter'
import UpdateCourse from './Pages/Dashboard/Trainer/Course/UpdateCourse'
import UpdateChapter from './Pages/Dashboard/Trainer/chapter/UpdateChapter'
import CourseDetails from './Pages/Default/CourseDetails'
import AdminHome from './Pages/Dashboard/Admin/Home/AdminHome'
import AdminUsers from './Pages/Dashboard/Admin/Users/AdminUsers'


function App() {
  return (
    <BrowserRouter>
        <Menu/>
        <ToastContainer autoClose={3000} position='top-right' />
          <Routes>
                <Route path={`/`} element={<Home/>} />
                <Route path={`/about`} element={<About/>} />
                <Route path={`/contact`} element={<Contact/>} />
                <Route path={`/courses`} element={<Courses/>} />
                <Route element={<PrivateRouter/>}>
                <Route path={`/course/:id`} element={<CourseDetails/>} />
                  <Route path={`/dashboard`} element={<Dashboard/>} >
                      <Route path={`student`} element={<StudentDashboard/>} />
                      <Route path={`trainer`} element={<TrainerDashboard/>}>
                        <Route path={``} element={<TrainerHome/>} />
                        <Route path={`courses`} element={<AllCourses/>} />
                        <Route path={`courses/new`} element={<NewCourse/>} />
                        <Route path={`courses/update/:id`} element={<UpdateCourse/>} />
                        <Route path={`categories`} element={<Categories/>} />
                        <Route path={`chapter/new`} element={<NewChapter/>} />
                        <Route path={`chapter/edit/:id`} element={<UpdateChapter/>} />
                      </Route>
                      <Route path={`superadmin`} element={<AdminDashboard/>}>
                          <Route path={``} element={<AdminHome/>} />
                          <Route path={`users`} element={<AdminUsers/>} />
                      </Route>
                  </Route>
                </Route>
                <Route path={`/register`} element={<Register/>} />
                <Route path={`/login`} element={<Login/>} />
                <Route path={`/*`} element={<Pnf/>} />
          </Routes>
          {/* <Footer/> */}
    </BrowserRouter>
  )
}

export default App