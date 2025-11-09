// import React, { useState } from 'react'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import { Home } from './Pages/Home'
import { Notes } from './Pages/Notes'
import { Task } from './Pages/Task'
import { SavedTasks } from './Pages/SavedTasks'
import { About } from './Pages/About'
// import { SavedTask } from "./Pages/SavedTask"
import { NavBar } from './Components/NavBar'


export const App: React.FC = () => {
  return ( 
    <div className='bg-gray-200 min-h-screen'>
      <NavBar />
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/Task' element={<Task/>}/>
          <Route path='/Saved-Tasks' element={<SavedTasks/>}/>
          <Route path='/Notes' element={<Notes/>}/>
          <Route path='/About' element={<About/>}/>
        </Routes>
        </div>
  )
}

// const App = () => {
//   return (
//     <div className="text-8xl font-bold">
//       hiiiii
//     </div>
//   )
// }

// export default App
