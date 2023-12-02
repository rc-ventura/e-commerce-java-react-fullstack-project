import { useState, useEffect  } from "react";
import axios from "axios";

export const useEditCategories = (id) => {

    const [cancelled, setCancelled] = useState(false);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    function checkIfIsCancelled() {
        if (cancelled) {
            return;
        }
    }

    const updateCategory = async (currentCategory) => {

        checkIfIsCancelled()
        setLoading(true);

        try {
            const categoryResponse = await axios.put(`http://localhost:8080/categorias/${id}`, currentCategory)
            return categoryResponse

        }catch(error) {
            console.error ("Error update category.", error)
            setError(error.message)


        }

        setLoading(false)

    }

    useEffect(() => {
        return () => setCancelled(true);
    }, []);

    return {
        updateCategory,
        loading,
        error,
    }
}


