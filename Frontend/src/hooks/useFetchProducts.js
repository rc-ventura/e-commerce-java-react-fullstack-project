import { useState, useEffect } from "react";
import axios from "axios";

export const useFetchProducts = (id) => {

    const [products, setProducts] = useState([])
    const [product, setProduct] = useState({

        nome: "",
        preco: "",
        qtd: "",
        categoria: "",
        fileStorage: "",
    });

    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(null);
    const [cancelled, setCancelled] = useState(false);


    function checkIfIsCancelled() {
        if (cancelled) {
            return;
        }
    }

    const loadProducts = async () => {


        checkIfIsCancelled();

        setLoading(true);

        try {

            const result = await axios.get(`http://localhost:8080/produtos`)
            setProducts(result.data);

        } catch (error) {

            setError(error.message)
        }

        setLoading(false)

    }


    
    const loadProductsId = async () => {


        checkIfIsCancelled();

        setLoading(true);

        try {

            const result = await axios.get(`http://localhost:8080/produtos/${id}`)
            setProduct(result.data);

        } catch (error) {

            setError(error.message)
        }

        setLoading(false)

    }

    useEffect(() => {
        loadProducts();
    }, []);
    

    useEffect(() => {
        return () => setCancelled(true);
    }, []);


    return {
        error,
        loading,
        loadProductsId,
        loadProducts,
        products,
        setProducts,
        product,
        setProduct,

    }
}