import {useContext, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { useFetchProducts } from '../../Hooks/useFetchProducts';
import { useDeleteProducts } from '../../Hooks/useDeleteProducts';
import SnackBar from '../../Components/Alerts/SnackBar';
import { useMessageContext } from '../../Context/MessageContext';

export default function DashBoard() {

    const { 
        successMessage,
        setSuccessMessage,
        setEditMessage,
        editMessage,
        deleteMessage,
        setDeleteMessage,} = useMessageContext()
    
    const {products, loadProducts, error, loading,} = useFetchProducts()
    const {deleteProducts} = useDeleteProducts()
    
    
    useEffect(()=> {
      
        loadProducts()

    }, [])


    const handleDelete = async (id) => {
        setDeleteMessage(true)
       
        await deleteProducts(id)
        loadProducts()
    }

    return (
        <div>
        <h1 className='text-center m-4'>My Dashboard</h1>
        <div className='container'>
            <div className='py-3 '>
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
                                <th scope="row ">{index + 1}</th>
                                <td>
                                    {item.fileStorage && item.fileStorage.data && (
                                        <img
                                            src={`data:${item.fileStorage.type};base64,${item.fileStorage.data}`}
                                            width='50'
                                            height='50'
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
                {successMessage && (
                            <SnackBar 
                            handleSuccessMessage={setSuccessMessage} 
                            message='success'>Product added successfully</SnackBar>
                        )} 
                {editMessage && (
                            <SnackBar 
                            handleEditMessage={setEditMessage} 
                            message='success'>Product edited successfully</SnackBar>
                        )} 
                {deleteMessage && (
                            <SnackBar 
                            handleDeleteMessage={setDeleteMessage} 
                            message='success'>Product deleted successfully</SnackBar>
                        )} 
            </div>
        </div>
        </div>
    );
}
