import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Upload from '../Components/Upload/Upload';
import { useFetchCategories } from '../Hooks/useFetchCategories';
import { useAddProducts } from '../Hooks/useAddProducts';
import SnackBar from '../Components/Alerts/SnackBar';
import  './Product.css'
import { useMessageContext } from '../Context/MessageContext';

const AddProduct = ({ handleAddProduct }) => {

    let navigate = useNavigate();

    const [isImageAdded, setIsImageAdded] = useState(false)
    const [errorUpload, setErrorUpload] = useState(false);
    const [isError, setIsError] = useState(false);

    const { categories, loadCategories } = useFetchCategories()

    const { nome, setNome,
        preco, setPreco, loading,
        qtd, setQtd, insertProduct,
        setCategorySelected,
        setFileStorage,
    } = useAddProducts()

    const {setSuccessMessage} = useMessageContext()


    useEffect(() => {

        loadCategories()

    }, []);


    const handleImageUpload = (imageData) => {
        setFileStorage(imageData);
        setIsImageAdded(true)
    };

    const onSubmit = async (e) => {
        e.preventDefault();

        if (!isImageAdded) {
            setErrorUpload('Please upload an image')
       
        } else {

            try{

            const responseProduct = await insertProduct()

            handleAddProduct(responseProduct)
            setSuccessMessage(true)

            navigate('/dashboard')

        } catch (error) {
                setIsError(error)
        }
    }
}

    return (
        <div className='container d-flex justify-content-center aligh-items-center vh-80'>
                <div className='col-md-6 offset md-3 border rounded p-1 mt-2 shadow'>
                    <h2 className='text-center m-2'> Register Product</h2>
                    <br />

                    <form onSubmit={onSubmit}>
                        <div className='mb-3'>
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
                        <div className='mb-3'>
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
                        <div className='mb-1'>
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
                            <label  className='form-label'>
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

                        <div className= 'd-flex justify-content-between '>
                        {!loading &&
                            (<button className='btn btn-outline-primary py-2 btn-small  '>
                                Submit
                            </button>)}

                        {loading &&
                            (<button className='btn btn-outline-primary py-2 btn-small' disabled >
                                Wait...
                            </button>)}
                            

                        {!loading && (<Link className='btn btn-outline-danger mx-2  py-2 btn-small' to='/dashboard'>
                            Cancel
                        </Link>)}

                         </div> 

                        {errorUpload && (
                            <SnackBar handleErrorUpload={setErrorUpload} message='danger'>{errorUpload}</SnackBar>
                        )}

                        {isError &&
                            (<SnackBar handleErrorSubmit={setIsError} message='danger'>{isError}</SnackBar>
                            )}

                    </form>

                </div>

            </div>



    );
            

};



export default AddProduct;
