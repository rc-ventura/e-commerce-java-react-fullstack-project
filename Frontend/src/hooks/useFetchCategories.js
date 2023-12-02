import { useState, useEffect } from "react";
import axios from "axios";


export const useFetchCategories = (id) => {

    const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState({
        nome: '',
    })

    const [currentCategory, setCurrentCategory] = useState({

        name: '',
    })

    const [cancelled, setCancelled] = useState(false);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(null);

    function checkIfIsCancelled() {
        if (cancelled) {
            return;
        }
    }

    const loadCategories = async () => {

        checkIfIsCancelled();

        setLoading(true);

        try {

            const result = await axios.get('http://localhost:8080/categorias');
            setCategories(result.data);

        } catch (error) {

            setError(error.message)
        }

        setLoading(false)
    };

    const loadCategoryId = async () => {
        const response = await axios.get(`http://localhost:8080/categorias/${id}`);
        setCurrentCategory(response.data)
    };

    
    

    useEffect(() => {
        return () => setCancelled(true);
    }, []);


    return {
        categories,
        setCategories,
        category,
        setCategory,
        loadCategories,
        error,
        loading,
        currentCategory,
        setCurrentCategory,
        loadCategoryId,

    }
}
