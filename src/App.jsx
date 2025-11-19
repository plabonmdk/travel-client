
import { Outlet } from 'react-router'

import Navbar from './Components/Navbar'
import Footer from './Components/Footer'


function App() {
 

  return (
    <>
      <Navbar />
     <div className='min-h-screen'>
       <Outlet />
     </div>
     <Footer></Footer>
    </>
  )
}

export default App
