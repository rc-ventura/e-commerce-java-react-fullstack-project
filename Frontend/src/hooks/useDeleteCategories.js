import { useEffect, useState } from "react";
import axios from "axios";

export const useDeleteCategories = () => {


    const [cancelled, setCancelled] = useState(false);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(null);

    function checkIfIsCancelled() {
        if (cancelled) {
            return;
        }
    }
   

    const deleteCategories = async (id) => {


        checkIfIsCancelled();

        setLoading(true);

        try {

            await axios.delete((`http://localhost:8080/categorias/${id}`))
           
         
         } catch (error) {

             setError(error.message)

         }

         setLoading(false)

 
        }
    

        useEffect(() => {
            return () => setCancelled(true);
        }, []);

        
        return {
            deleteCategories,
            error,
            loading,

        }
}