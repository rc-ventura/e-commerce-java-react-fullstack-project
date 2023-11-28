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

  const [products, setProducts] = useState([]);

  const SendProducts = (product) => {
    console.log(product)
    setProducts ([ ...products, product])

  }

  const [show, setShow] = useState(false)

  

  return (
  
    <div className="App">
      <Router>
       
        
        <Navbar />

        <Routes>
          <Route exact path='/' element={<DashBoard />} />
          <Route exact path="/addproduct" element={<AddProduct handleAddProduct={product =>SendProducts(product)}  />} />
          <Route exact path="/editProduct/:id" element={<EditProduct/>}/>
          <Route exact path="/viewProduct/:id" element={<ViewProduct/>}/>
          
          <Route exact path="/addCategory" element={<AddCategory show={show} setShow={setShow} />} />
          <Route exact path="/editCategory/:id" element={<EditCategory show={show} setShow={setShow}/>}/>
          
        </Routes>

      </Router>
    </div>



  );

}

export default App;
