import React from 'react'
import { useState } from 'react'
import { useNavigate, Link, useParams } from "react-router-dom";
import { useEffect } from 'react';
import './Product.css'
import Upload from '../Components/Upload/Upload'
import { useFetchProducts } from '../Hooks/useFetchProducts';
import { useFetchCategories } from '../Hooks/useFetchCategories';
import { useEditProducts } from '../Hooks/useEditProducts';
import SnackBar from '../Components/Alerts/SnackBar';

export default function EditProduct({setEditMessage}) {


    let navigate = useNavigate();

    const { id } = useParams();


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


    const onSubmit = async (e) => {
        e.preventDefault();

        if(isChanged) {

        setEditMessage(true)
        const productData = createProductUpdate()

        await updateProduct(productData)
        navigate('/');

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


        <div className='container text-center'>
            <div className='row'>
                <div className='col-md-6 offset md-3 border rounded p-4  shadow'>
                    <h2 className='text-center m-2'> Edit Product</h2>
                    <br />
                    <form onSubmit={(e) => onSubmit(e)}>
                        <div className='mb-2'>
                            <label htmlFor='name' className='form-label'>
                                <strong>Name</strong>
                            </label>
                            <input type={"text"} className="form-control" placeholder='Enter with product name' name='nome'
                                value={nome} onChange={(e) => onInputChange(e)}
                            />

                        </div>
                        <div className='mb-2'>
                            <label htmlFor='price' className='form-label'>
                                <strong>Price</strong>
                            </label>
                            <input type={"number"} className="form-control" placeholder='Enter with price' name='preco'
                                value={preco} onChange={(e) => onInputChange(e)}
                            />

                        </div>
                        <div className='mb-2'>
                            <label htmlFor='qtd' className='form-label'>
                                <strong>Quantity</strong>
                            </label>
                            <input type={"number"} className="form-control" placeholder='Enter with quantity' name='qtd'
                                value={qtd} onChange={(e) => onInputChange(e)}
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
                        <div className='mb-2'>
                            <label htmlFor='file' className='form-label'>
                                <strong className='bold-text'>Image:</strong>

                            </label>
                            <span className='bold-text'>

                                {product.fileStorage && (
                                    <img src={`data:${product.fileStorage.type};base64,${product.fileStorage.data}`}
                                        width='100'
                                        height='80'
                                        alt='logo' />
                                )}
                            </span>


                            <Upload onImageUpload={handleImageUpload} />

                        </div>
                        {!loading && (
                            <button className='btn btn-outline-primary'>
                                Submit
                            </button>)}
                        {loading &&
                            (<button className='btn btn-outline-primary' disabled >
                                Wait...
                            </button>)}
                        {!loading && (
                            <Link className='btn btn-outline-danger mx-2' to='/'>
                                Cancel
                            </Link>)}
                        {changeError && (
                            <SnackBar handleChangeError={setChangeError} message='warning'>{changeError}</SnackBar>
                        )}
                    </form>

                </div>
            </div>
        </div>
    );
}
