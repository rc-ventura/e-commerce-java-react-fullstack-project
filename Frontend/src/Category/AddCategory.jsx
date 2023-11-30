import React from 'react'
import { useEffect } from 'react'
import { Link, useNavigate } from "react-router-dom";
import { useFetchCategories } from '../hooks/useFetchCategories';
import { useDeleteCategories } from '../hooks/useDeleteCategories';
import { useAddCategories } from '../hooks/useAddCategories';

export default function AddCategory({setShow}) {

    let navigate = useNavigate()


    const {categories,
          error,loading, loadCategories,
          category, setCategory} = useFetchCategories()

    const {deleteCategories} = useDeleteCategories()

    const {insertCategory} = useAddCategories()

    const onInputChange = (e) => {
        setCategory((prevCategory) => ({
            ...prevCategory,
            [e.target.name]: e.target.value
        }));


    };

    useEffect(() => {
        loadCategories();


    }, [category]);


    const onSubmit = async (e) => {

        e.preventDefault()

       insertCategory(category) 
        setCategory({nome:''});

    };

    const handleDelete = async (id) => {
       
        await deleteCategories(id)
        loadCategories()
    }
    

    const handleModal = (id) => {

        const categoriesId = Number(id)
         setShow(true)
        
         navigate(`/editCategory/${categoriesId}`)


    }
    
    return (
        
        <div className='container text-center'>
        
        <div className='row'>
            <div className='col-md-12 offset md-3 border rounded p-6 mt-2 shadow'>
                <h2 className='text-center m-4'> Register Category</h2>
                <br />
                <form onSubmit={(e) => onSubmit(e)}>
                    <div className='mb-3'>
                        <label htmlFor='name' className='form-label'>
                            <strong>Name</strong>
                        </label>
                        <input
                            type={"text"}
                            className="form-control" placeholder="Enter with category's name"
                            name='nome'
                            value={category.nome}
                            onChange={(e) => onInputChange(e)}
                        />

                    </div>
                    <button type='submit' className='btn btn-outline-primary'>Submit</button>
                    <Link className='btn btn-outline-danger mx-2' to="/">Back to Home</Link>


                </form>
                {!loading &&  (
                <div className='container'>
                    <div className='py-5' >
                        <table className="table  text-center border shadow ">
                            <thead>
                                <tr>
                                    <th scope="col ">#</th>

                                    <th scope="col">Name</th>
                                    <th></th>
                                    <th></th>
                                    <th scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody>

                                {categories.map((categories, index) => (

                                    <tr key={categories.id}>
                                        <th scope="row "> {index + 1}</th>

                                        <td>{categories.nome}</td>
                                        <td></td>
                                        <td></td>

                                        <td>
                                        <button
                                                className="btn btn-primary mx-2 mb-2 mt-2"
                                                onClick={() => handleModal(categories.id)}

                                            >
                                                View
                                            </button>
                                            <button
                                                className="btn btn-outline-primary mx-2 mb-2 mt-2"
                                                onClick={() => handleModal(categories.id)}

                                            >
                                                Edit
                                            </button>

                                            <button className='btn btn-danger mx-2 mb-2 mt-2'
                                                onClick={() => handleDelete(categories.id)}
                                            >Delete
                                            </button>

                                        </td>
                                    </tr>
                                ))
                                }
                            </tbody>
                        </table>
                    </div> 
                </div> 
                )}
                            
                    {loading && (
                    <div className='alert alert-warning m-4' role='alert'> 
                    Loading... Please wait just time !!!
           </div> 
           )}
                      {error && (
                      <div className='alert alert-danger m-4' role='alert'>{error}</div>)}
                </div>
                
            </div>
        </div>


    );
}
