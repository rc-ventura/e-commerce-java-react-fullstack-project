import {useEffect} from 'react';
import { Link } from 'react-router-dom';
import { useFetchProducts } from '../../hooks/useFetchProducts';
import { useDeleteProducts } from '../../hooks/useDeleteProducts';

export default function DashBoard() {

    
    const {products, loadProducts, error, loading,} = useFetchProducts()
    const {deleteProducts} = useDeleteProducts()
    
    useEffect(()=> {
      
        loadProducts()

    }, [])


    const handleDelete = async (id) => {
       
        await deleteProducts(id)
        loadProducts()
    }

    return (
        <div className='container'>
            <div className='py-4'>
                {!loading &&   (
                <table className="table text-center border shadow ">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Image</th>
                            <th scope="col">Name</th>
                            <th scope="col">Price</th>
                            <th scope="col">Quantity</th>
                            <th scope="col">Category</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        
                        {products.map((item, index) => (
                            
                            <tr key={item.id}>
                                <th scope="row">{index + 1}</th>
                                <td>
                                    {item.fileStorage && item.fileStorage.data && (
                                        <img
                                            src={`data:${item.fileStorage.type};base64,${item.fileStorage.data}`}
                                            width='100'
                                            height='80'
                                            alt='logo'
                                        />
                                        
                                    )} 
                                </td>
                                <td>{item.nome}</td>
                                <td>$ {item.preco}</td>
                                <td>{item.qtd}</td>
                                <td>{item.categoria.nome}</td>
                                <td>
                                    <Link className='btn btn-primary mx-2' to={`/viewProduct/${item.id}`}>
                                        View
                                    </Link>
                                    <Link className='btn btn-outline-primary mx-2' to={`/editProduct/${item.id}`}>
                                        Edit
                                    </Link>
                                    <button className='btn btn-danger mx-2' onClick={() => handleDelete(item.id)}>
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                )} 
                {loading && ( <div className='alert alert-warning' role='alert'> 
                        Loading... Please wait just time !!!
                    </div>
                ) }
                {error && <div className='alert alert-danger' role='alert'> {error} </div>}
                    
            </div>
        </div>
    );
}