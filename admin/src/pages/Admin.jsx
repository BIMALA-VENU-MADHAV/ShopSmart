import AddProduct from "../components/AddProduct"
import ListProd from "../components/ListProd"
import Sidebar from "../components/Sidebar"
import { Routes,Route} from "react-router-dom"
 
const Admin = () => {
  return (
    <div  className="lg:flex">
      <Sidebar />
      <Routes>
        <Route path="/addproduct" element={<AddProduct />}/>
        <Route path="/listproduct" element={<ListProd/>} />
      </Routes>
    </div>
  )
}

export default Admin
