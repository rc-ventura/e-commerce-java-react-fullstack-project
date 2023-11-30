import React from 'react'
import axios from "axios";
import { useState } from 'react'
import  {useNavigate, Link, useParams} from "react-router-dom";
import { useEffect } from 'react';
import './Product.css'
import Upload from '../Components/Upload/Upload'
import { useFetchProducts } from '../hooks/useFetchProducts';
import { useFetchCategories } from '../hooks/useFetchCategories';
import { useEditProducts } from '../hooks/useEditProducts';


export default function EditProduct () {
  

let navigate = useNavigate();

const {id} = useParams();


const [fileStorageUpdate, setFileStorageUpdate] = useState({});
const [categoryUpdated, setCategoryUpdated] = useState('')

const {updateProduct, imageUpdate, isImageAdded, setIsImageAdded} = useEditProducts(id)

const {loadProductsId, error, loading, product, setProduct} = useFetchProducts(id)
const {categories, loadCategories} = useFetchCategories()

const {nome,preco,qtd} = product;

 

const onInputChange=(e)=>{
    setProduct({...product, [e.target.name]: e.target.value});

};

useEffect(()=>{

    loadProductsId();
    loadCategories();
},

[]);

const createProductUpdate = () => {

        const productDataUpdate = {
            nome,
            preco,
            categoria: categoryUpdated.id ? { 
                id: categoryUpdated.id,
                nome: categoryUpdated.nome,
            }
            : product.categoria,
            qtd,
            fileStorage: fileStorageUpdate.id ? {
                id: fileStorageUpdate.id, 
                name: fileStorageUpdate.name,
                data: fileStorageUpdate.data,
                size: fileStorageUpdate.size,
                type: fileStorageUpdate.type,
            }
            : product.fileStorage,
        }

        return productDataUpdate
}


const onSubmit= async (e)=> {
    e.preventDefault();
     
    const productData = createProductUpdate()

    await updateProduct(productData)

    navigate('/');

};



const handleCategoryChange = (e) => {
    let selectedCategoryId = parseInt(e.target.value)
    let selectedCategory = categories.find((cat) => cat.id === selectedCategoryId)

    setCategoryUpdated(selectedCategory) 
    setProduct({
        ...product,
        categoria: {
            id: selectedCategoryId ? selectedCategory.id : null,
            nome: selectedCategory.nome ? selectedCategory.nome : null,
        }
    })
}

const handleImageUpload = async (imageFile) => {

    setFileStorageUpdate(imageFile)
    setIsImageAdded(true)

    const formDataImage = new FormData()
    formDataImage.append('file',  [fileStorageUpdate.data])
    
    imageUpdate(formDataImage)


}

return (


    <div className='container text-center'>
        <div className='row'>
            <div className='col-md-6 offset md-3 border rounded p-4  shadow'>
                <h2 className='text-center m-2'> Edit Product</h2>
                <br />
               <form   onSubmit={(e) => onSubmit(e)}>
                <div className='mb-2'>
                    <label htmlFor='name' className='form-label'>
                        <strong>Name</strong>
                    </label>
                    <input type={"text"} className="form-control" placeholder='Enter with product name' name='nome'
                     value={nome} onChange={(e)=>onInputChange(e)}
                    />

                </div>
                <div className='mb-2'>
                    <label htmlFor='price' className='form-label'>
                        <strong>Price</strong>
                    </label>
                    <input type={"number"} className="form-control" placeholder='Enter with price' name='preco'
                     value={preco} onChange={(e)=>onInputChange(e)}
                    />

                </div>
                <div className='mb-2'>
                    <label htmlFor='qtd' className='form-label'>
                        <strong>Quantity</strong>
                    </label>
                    <input type={"number"} className="form-control" placeholder='Enter with quantity' name='qtd' 
                    value={qtd} onChange={(e)=>onInputChange(e)}
                    />
                    <br></br>
                        <div className='mb-2 '>
                        <label htmlFor='categoria' className='form-label' >
                                <strong>Categoria</strong>
                            </label>
                            <select 
                            onChange={(e) => handleCategoryChange(e)} 
                            className="form-select" 
                            aria-label='Default select example'  
                            name='categoria'
                            value={product.categoria.id}
                             >
                                
                                <option  disabled value={''}> {product.categoria.nome}</option>
                                { categories.map((categoria) =>(
                                    
                                    <option key={categoria.id} value={categoria.id}>
                                         {categoria.nome} 
                                     
                                     </option>  
                                 ))


                                }

                                </select>
                                </div>
                                
                </div>
                <div className='mb-2'>
                    <label htmlFor='file' className='form-label'>
                        <strong className='bold-text'>Image:</strong>

                    </label>
                    <span className='bold-text'>

                    {product.fileStorage && (
                    <img src= {`data:${product.fileStorage.type};base64,${product.fileStorage.data}`} 
                    width='100' 
                    height='80'
                    alt='logo' />
                                        )}
                                        </span>
                    

                    <Upload onImageUpload={handleImageUpload} />
                    
                </div>
                <button type='submit' className='btn btn-outline-primary'>Submit</button>
                <Link className='btn btn-outline-danger mx-2' to="/">Cancel</Link>
                </form>

            </div>
        </div>
    </div>
);
}
