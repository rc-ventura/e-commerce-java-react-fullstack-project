import { useState, useEffect } from "react";
import axios from "axios";
import { useFetchCategories } from "./useFetchCategories";


export const useAddCategories = () => {

    
    const {loadCategories} = useFetchCategories()
    
    
    const [cancelled, setCancelled] = useState(false);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    
    
    function checkIfIsCancelled() {
        if (cancelled) {
            return;
        }
    }


    const insertCategory = async (category) => {

        checkIfIsCancelled()
        setLoading(true);

        try{

        const categoryResponse = await axios.post("http://localhost:8080/categorias/", category)
        await loadCategories();

        return categoryResponse

        }catch(error) {
            console.error('Error submitting category.', error);
            setError(error.message)

        }

        setLoading(false)

}

useEffect(() => {
    return () => setCancelled(true);
}, []);



useEffect(() => {
    loadCategories();


}, [loadCategories]);



return {
    insertCategory,
    error,
    loading,
}

}