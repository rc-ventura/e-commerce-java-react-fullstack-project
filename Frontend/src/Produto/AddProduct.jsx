import {useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Upload from '../Components/Upload/Upload';
import { useFetchCategories } from '../hooks/useFetchCategories';
import { useAddProducts } from '../hooks/useAddProducts';

const AddProduct = ({ handleAddProduct }) => {
    
    let navigate = useNavigate();

    
    const [formError, setFormError] = useState("");

    const {categories, loadCategories, error, loading, } = useFetchCategories()
    
    const {nome,setNome,
           preco,setPreco,
           qtd,setQtd, insertProduct,
           setCategorySelected,
           setFileStorage,
           setIsImageAdded} = useAddProducts()


    useEffect(() => {
        
        loadCategories()
    }, []);
    

    const handleImageUpload = (imageData) => {
        setFileStorage(imageData);
        setIsImageAdded(true)
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        setFormError('')

        try {
            const productResponse = await insertProduct()

            if (productResponse !== undefined) {
                handleAddProduct(productResponse);
                navigate('/')
        }
    } catch (error) {

            setFormError('Error submiting product, please try later')
        
        }       
    };


    return (
        <div className='container text-center'>
            <div className='row'>
                <div className='col-md-6 offset md-3 border rounded p-1 mt-2 shadow'>
                    <h2 className='text-center m-3'> Register Product</h2>
                    <br />

                    <form onSubmit={onSubmit}>
                        <div className='mb-2'>
                            <label htmlFor='name' className='form-label'>
                                <strong>Name</strong>
                            </label>
                            <input
                                type='text'
                                className='form-control'
                                placeholder='Enter with product name'
                                required
                                name='name'
                                value={nome}
                                onChange={(e) => setNome(e.target.value)}
                            />
                        </div>
                        <div className='mb-2'>
                            <label htmlFor='price' className='form-label'>
                                <strong>Price</strong>
                            </label>
                            <input
                                type='number'
                                className='form-control'
                                required
                                placeholder='Enter with price'
                                name='price'
                                value={preco}
                                onChange={(e) => setPreco(e.target.value)}
                            />
                        </div>
                        <div className='mb-2'>
                            <label htmlFor='qtd' className='form-label'>
                                <strong>Quantity</strong>
                            </label>
                            <input
                                type='number'
                                className='form-control'
                                placeholder='Enter with quantity'
                                name='qtd'
                                required
                                value={qtd}
                                onChange={(e) => setQtd(e.target.value)}
                            />
                            <br></br>
                        </div>
                        <div className='mb-5 '>
                            <label htmlFor='categoria' className='form-label'>
                                <strong>Categories</strong>
                            </label>
                            <select
                                onChange={(e) =>
                                    setCategorySelected(
                                        categories.find((cat) => cat.id === parseInt(e.target.value))
                                    )
                                }
                                className='form-select'
                                aria-label='Default select example'
                                name='categoria'
                                required
                                defaultValue=''
                            >
                                <option disabled value={''}>
                                    Selected a category
                                </option>
                                {categories.map((categoria) => (
                                    <option key={categoria.id} value={categoria.id}>
                                        {categoria.nome}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <Upload onImageUpload={handleImageUpload} />
                       
                        {!loading && 
                        (<button type='submit' className='btn btn-outline-primary'>
                            Submit
                        </button>) }
                        
                        {loading && 
                        (<button disabled type='submit' className='btn btn-outline-primary'>
                            Wait...
                        </button>) }
                        
                        <Link className='btn btn-outline-danger mx-2' to='/'>
                            Cancel
                        </Link>
                        
                        {error && (
                             <div className='alert alert-danger' role='alert'> 
                            {error}
                        </div>
                        )}
                       
                        {formError && 
                        (  <div className='alert alert-danger' role='alert'> 
                            {formError}
                        </div>) }
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddProduct;
