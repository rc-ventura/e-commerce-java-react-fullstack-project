import { useParams } from "react-router-dom"
import ModalMenu from "../Components/ModalMenu/ModalMenu"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useFetchCategories } from "../Hooks/useFetchCategories"
import { useEditCategories } from "../Hooks/useEditCategories"

export default function EditCategory ({ show, setShow})  {

    const {id} = useParams()

    let navigate = useNavigate()

    const {currentCategory, setCurrentCategory, loadCategoryId} = useFetchCategories(id)
    const {updateCategory, error, loading} = useEditCategories(id)

    useEffect(() => {
       
        loadCategoryId();

    }, []);

    const onInputChangeCategory = (e) => {
        setCurrentCategory({...currentCategory, nome: e.target.value})
    }


    const onSubmitUpdate = async (e) => {
        e.preventDefault()

       await updateCategory(currentCategory)
        
        navigate('/addCategory')
  
      
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


    