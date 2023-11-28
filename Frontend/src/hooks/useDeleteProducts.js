import { useEffect, useState } from "react";
import axios from "axios";

export const useDeleteProducts = () => {


    const [cancelled, setCancelled] = useState(false);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(null);

    function checkIfIsCancelled() {
        if (cancelled) {
            return;
        }
    }


    const deleteProducts = async (id) => {


        checkIfIsCancelled();

        setLoading(true);

        try {

            await axios.delete(`http://localhost:8080/produtos/${id}`);
           
         
         } catch (error) {

             setError(error.message)

         }

         setLoading(false)

 
        }
    

        useEffect(() => {
            return () => setCancelled(true);
        }, []);

        return {
            deleteProducts,
            error,
            loading,

        }
}