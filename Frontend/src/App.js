//routes
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

//hooks
import { useState } from "react";

//pages
import EditProduct from "./Product/EditProduct ";
import ViewProduct from "./Product/ViewProduct";
import AddCategory from "./Category/AddCategory";
import AddProduct from "./Product/AddProduct";
import EditCategory from "./Category/EditCategory";
import DashBoard from "./Pages/DashBoard/DashBoard";
import Home from "./Pages/Home/Home";

//components
import NavMenu from "./Components/NavMenu/NavMenu";
import Footer from "./Components/Footer/Footer";

//context
import { MessageContextProvider } from "./Context/MessageContext";


function App() {

  const [show, setShow] = useState(false)
  const [products, setProducts] = useState([]);


  const SendProducts = (product) => {
    console.log(product)
    setProducts([...products, product])

  }


  return (

    <div className="App">

      <MessageContextProvider>
        <Router>

          <NavMenu />
          
          <Routes>
            <Route exact path="/home" element={<Home />}/>

            <Route exact path='/dashboard'
              element={<DashBoard

              />} />

            <Route exact path="/addproduct"
              element={<AddProduct
                handleAddProduct={product => SendProducts(product)} />} />

            <Route exact path="/editProduct/:id"
              element={<EditProduct
              />} />

            <Route exact path="/viewProduct/:id" element={<ViewProduct />} />

            {/* <Route exact path="/viewCategory/:id" element={<ViewProduct/>}/> */}


            <Route exact path="/addCategory"
              element={
                <AddCategory
                  show={show}
                  setShow={setShow}
                />} />

            <Route exact path="/editCategory/:id" element={<EditCategory show={show} setShow={setShow} />} />

          </Routes>
        </Router>
      </MessageContextProvider>
    </div>



  );

}

export default App;
