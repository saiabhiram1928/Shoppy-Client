import { Outlet } from "react-router-dom"
import Header from "./components/headerComp/Header"
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const App = () => {
  return (
    <div className="">
    <Header/>
    <main className="py-2 flex items-center justify-center">
      <div className="container">
        <Outlet/>
      </div>
    </main>
    <ToastContainer/>
    </div>
  )
}
export default App