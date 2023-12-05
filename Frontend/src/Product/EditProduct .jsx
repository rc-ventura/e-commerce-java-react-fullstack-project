import React, { useCallback } from 'react'
import { useState } from 'react'
import { useNavigate, Link, useParams } from "react-router-dom";
import { useEffect } from 'react';
import './Product.css'
import Upload from '../Components/Upload/Upload'
import { useFetchProducts } from '../Hooks/useFetchProducts';
import { useFetchCategories } from '../Hooks/useFetchCategories';
import { useEditProducts } from '../Hooks/useEditProducts';
import SnackBar from '../Components/Alerts/SnackBar';
import { useMessageContext } from '../Context/MessageContext';

export default function EditProduct() {


    let navigate = useNavigate();

    const { id } = useParams();

    const {setEditMessage} = useMessageContext()


    const [fileStorageUpdate, setFileStorageUpdate] = useState({});
    const [categoryUpdated, setCategoryUpdated] = useState('')
    const [isChanged, setIsChanged] = useState(null)
    const [changeError,setChangeError] = useState(false)

    const { updateProduct, imageUpdate, setIsImageAdded, error, loading } = useEditProducts(id)
    const { loadProductsId, product, setProduct } = useFetchProducts(id)
    const { categories, loadCategories } = useFetchCategories()

    const { nome, preco, qtd } = product;



    const onInputChange = (e) => {
        setProduct({ ...product, [e.target.name]: e.target.value });
        setIsChanged(true)
    };

    useEffect(() => {

        loadProductsId();
        loadCategories();
        
    },[id]);

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


    const onSubmit = async (e) => {
        e.preventDefault();

        if(isChanged) {

        setEditMessage(true)
        const productData = createProductUpdate()

        await updateProduct(productData)
        navigate('/dashboard');

        } else {

            setChangeError('Unedited product. It is necessary to change the product or cancel')
        }

        
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
        setIsChanged(true)
    }

    const handleImageUpload = async (imageFile) => {

        setFileStorageUpdate(imageFile)
        setIsImageAdded(true)

        const formDataImage = new FormData()
        formDataImage.append('file', [fileStorageUpdate.data])

        imageUpdate(formDataImage)
        setIsChanged(true)

    }

    return (


        <div className='container d-flex justify-content-center aligh-items-center vh-80'>
                <div className='col-md-6 offset md-3 border rounded p-1   shadow'>
                    <h2 className='text-center m-2'> Edit Product</h2>
                    <form onSubmit={(e) => onSubmit(e)}>
                        <div className='mb-3'>
                            <label  className='form-label'>
                                <strong>Name</strong>
                            </label>
                            <input type={"text"} className="form-control" placeholder='Enter with product name' name='nome'
                                value={nome} onChange={(e) => onInputChange(e)}
                            />

                        </div>
                        <div className='mb-3'>
                            <label  className='form-label'>
                                <strong>Price</strong>
                            </label>
                            <input type={"number"} className="form-control" placeholder='Enter with price' name='preco'
                                value={preco} onChange={(e) => onInputChange(e)}
                            />

                        </div>
                        <div className='mb-2'>
                            <label  className='form-label'>
                                <strong>Quantity</strong>
                            </label>
                            <input type={"number"} className="form-control" placeholder='Enter with quantity' name='qtd'
                                value={qtd} onChange={(e) => onInputChange(e)}
                            />
                            <div className='mt-3 '>
                                <label className='form-label' >
                                    <strong>Categoria</strong>
                                </label>
                                <select
                                    onChange={(e) => handleCategoryChange(e)}
                                    className="form-select"
                                    aria-label='Default select example'
                                    name='categoria'
                                    value={product.categoria.id}
                                >

                                    <option disabled value={''}> {product.categoria.nome}</option>
                                    {categories.map((categoria) => (

                                        <option key={categoria.id} value={categoria.id}>
                                            {categoria.nome}

                                        </option>
                                    ))
                                    }

                                </select>
                            </div>

                        </div>
                        <div className=' align-items-center p-1'>
                            <label  className='form-label py-1'>
                                <strong >Image</strong>

                            </label>
                            <span className=''>

                                {product.fileStorage && (
                                    <img src={`data:${product.fileStorage.type};base64,${product.fileStorage.data}`}
                                        width='100'
                                        height='80'
                                        alt='image product'
                                        style={{ marginBottom: '.8rem' }}
                                        className='img-fluid' />
                                )}
                            </span>

                                    
                            <Upload onImageUpload={handleImageUpload} />

                        </div >
                        <div className= 'd-flex justify-content-between'>
                        {!loading && (
                            <button className='btn btn-outline-primary py-2 btn-small'>
                                Submit
                            </button>)}
                        {loading &&
                            (<button className='btn btn-outline-primary py-2 btn-small' disabled >
                                Wait...
                            </button>)}
                        {!loading && (
                            <Link className='btn btn-outline-danger py-2 btn-small mx-2' to='/dashboard'>
                                Cancel
                            </Link>)}
                        {changeError && (
                            <SnackBar handleChangeError={setChangeError} message='warning'>{changeError}</SnackBar>
                        )}
                        </div>
                    </form>

                </div>
            </div>
        // </div>
    );
}
