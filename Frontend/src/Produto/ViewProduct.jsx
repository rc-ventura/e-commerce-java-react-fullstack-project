import './Product.css'
import  { Link, useParams} from "react-router-dom";
import { useEffect } from 'react';
import { useFetchProducts } from '../hooks/useFetchProducts';


export default function ViewProduct() {
    
    const {id} = useParams();

    
    const {product,loadProductsId, error, loading,} = useFetchProducts(id)


    useEffect(() => {
        loadProductsId();

    }, []);



    return (

        <div className='container text-center p-2'>
            <div className='row'>
                <div className='col-md-6 offset md-3 border rounded p-4 mt-2 shadow'>
                    <h2 className='text-center m-4 ' > Product Details</h2>
                    <div className='card'>
                        <div className='card-header'> 
                            <ul className='list-group list-group-flush'>
                                
                                <li className='list-group-item p-4 mb-2'>
                                    <b className='bold-text'> Id:</b>
                                    {product.id}  </li>
                                
                                <li className='list-group-item mb-2' >
                                    <b className='bold-text'> Image:</b>
                                    {product.fileStorage && (
                                        <img src= {`data:${product.fileStorage.type};base64,${product.fileStorage.data}`} width='100' height='80' alt='logo' />
                                        )}
                                      </li>


                                <li className='list-group-item mb-2'>
                                    <b className='bold-text'> Name:</b> 
                                    {product.nome}   </li>



                                <li className='list-group-item mb-2'>
                                    <b className='bold-text'> Price:</b>   
                                      ${product.preco}
                                      
                                       </li>


                                <li className='list-group-item mb-2'>
                                    <b className='bold-text'> Quantity:</b> 
                                    {product.qtd} </li>
                                
                                <li className='list-group-item mb-2'>
                                    <b className='bold-text'> Categoria:</b>
                                    {product.categoria.nome}  </li>

                            </ul>
                        </div>
                    </div>
                    <Link className='btn btn-primary my-2' to={"/"}> Back to Home</Link>
                </div>
            </div>
        </div>
    );
}

