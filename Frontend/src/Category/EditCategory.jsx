import { useParams } from "react-router-dom"
import ModalMenu from "../Components/ModalMenu/ModalMenu"
import { useEffect } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { useFetchCategories } from "../hooks/useFetchCategories"

export default function EditCategory ({ show, setShow})  {

    const {id} = useParams()

    let navigate = useNavigate()

    const {currentCategory, setCurrentCategory, loadCategoryId} = useFetchCategories(id)
    
    useEffect(() => {
       
        loadCategoryId();

    }, []);

    const onInputChangeCategory = (e) => {
        setCurrentCategory({...currentCategory, nome: e.target.value})
    }


    const onSubmitUpdate = async (e) => {
        e.preventDefault()

            try {

          await axios.put(`http://localhost:8080/categorias/${id}`, currentCategory)
  
  
          alert("Update Category Success");
          navigate('/addCategory')
  
      } catch (error) {
        console.error('Error updating category', error)
        alert("Error updating category");

      }
    }
   

    return (
        <>
        <ModalMenu  
        currentCategory={currentCategory}
        onInputChangeCategory={onInputChangeCategory}
        handleOnSubmit={onSubmitUpdate}
        setShow={setShow}
        show={show}
    
         />
         </>
        
    )
}


    