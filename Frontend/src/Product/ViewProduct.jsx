import './Product.css'
import  { Link, useParams} from "react-router-dom";
import { useEffect, useCallback } from 'react';
import { useFetchProducts } from '../Hooks/useFetchProducts';
import CardViewProduct from '../Components/CardViewProduct/CardViewProduct';

export default function ViewProduct() {
    
    const {id} = useParams();

    
    const {product,loadProductsId, error, loading,} = useFetchProducts(id)


    const fetchProductId = useCallback(async () => {
        await loadProductsId()
    },[loadProductsId])

    useEffect(() => {
        fetchProductId();

    }, [ ]);



    return (


    <div className='container text-center p-2'>
        <div className='row'>
            <div className='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow'>
                <h2 className='text-center m-4'>Product Details</h2>
                
                    <CardViewProduct product={product}/>

                       
                <Link className='btn btn-primary my-2' to={"/dashboard"}>Back to Home</Link>
                {loading && (
                    <p className='alert alert-warning' role='alert'>Loading...</p>
                )}
                {error && (
                    <p className='alert alert-danger' role='alert'>Error loading product. Please try again.</p>
                )}
            </div>
        </div>
    </div>
);

}

