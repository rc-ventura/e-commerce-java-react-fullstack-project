import Navbar from "./Components/Navbar/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import EditProduct from "./Produto/EditProduct ";
import ViewProduct from "./Produto/ViewProduct";
import AddCategory from "./Category/AddCategory";
import { useState } from "react";
import AddProduct from "./Produto/AddProduct";
import EditCategory from "./Category/EditCategory";
import DashBoard from "./Pages/DashBoard/DashBoard";
import Home from "./Pages/Home/Home";

function App() {

  const [show, setShow] = useState(false)
  const [successMessage, setSuccessMessage] = useState(false)
  const [editMessage, setEditMessage] = useState(false)
  const [deleteMessage, setDeleteMessage] = useState(false)

  const [products, setProducts] = useState([]);

  const SendProducts = (product) => {
    console.log(product)
    setProducts ([ ...products, product])

  }

  

  return (
  
    <div className="App">
      <Router>
       
        
        <Navbar />

        <Routes>
          <Route exact path='/'
           element={<DashBoard
                   setSuccessMessage={setSuccessMessage} 
                   successMessage={successMessage}
                   setEditMessage={setEditMessage}
                   editMessage={editMessage}
                   setDeleteMessage={setDeleteMessage}
                   deleteMessage={deleteMessage}
                   />} />

          <Route exact path="/addproduct" element={<AddProduct setSuccessMessage={setSuccessMessage} handleAddProduct={product =>SendProducts(product)}  />} />
          <Route exact path="/editProduct/:id" element={<EditProduct setEditMessage={setEditMessage} />}/>
          <Route exact path="/viewProduct/:id" element={<ViewProduct/>}/>
          
          <Route exact path="/addCategory" 
          element={
           <AddCategory 
            show={show} 
            setShow={setShow} 
            setDeleteMessage={setDeleteMessage}
            deleteMessage={deleteMessage}  
            setSuccessMessage={setSuccessMessage} 
            successMessage={successMessage}
            setEditMessage={setEditMessage}
            editMessage={editMessage}
            />} />
          
          <Route exact path="/editCategory/:id" element={<EditCategory show={show} setShow={setShow}/>}/>
          
        </Routes>

      </Router>
    </div>



  );

}

export default App;
