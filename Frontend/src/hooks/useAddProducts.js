import { useState, useEffect } from "react";
import axios from "axios";

export const useAddProducts = () => {


    const [nome, setNome] = useState('');
    const [preco, setPreco] = useState('');
    const [qtd, setQtd] = useState('');
    const [categorySelected, setCategorySelected] = useState(null);
    const [fileStorage, setFileStorage] = useState({});
    const [isImageAdded, setIsImageAdded] = useState (false)
    const [errorUpload, setErrorUpload] = useState(null);


    const [cancelled, setCancelled] = useState(false);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);



    function checkIfIsCancelled() {
        if (cancelled) {
            return;
        }
    }

    const insertProduct = async () => {
    
        checkIfIsCancelled()

    if (!isImageAdded) {

        setErrorUpload('Please, upload an image!')
        console.log(errorUpload)
        return
    }
        setLoading(true);
        


    try {

        const productData = createProduct()
    
        const productResponse = await axios.post('http://localhost:8080/produtos', productData);
        console.log(productResponse.data)
        return productResponse.data


    } catch (error) {
        console.error('Error submitting product.', error);
        setError(error.message)


    }

    setLoading(false)

};

    const createProduct = () => {
        
        const product = {
            nome,
            preco,
            fileStorage: {
                id: fileStorage.id,
                name: fileStorage.name,
                size: fileStorage.size,
                data: fileStorage.data,
                type: fileStorage.type,
            },
            categoria: {
                id: categorySelected.id,
                nome: categorySelected.nome,
            },
            qtd,
        };

        return product
    }


        useEffect(() => {
            return () => setCancelled(true);
        }, []);

        return {
            insertProduct,
            error,
            setLoading,
            loading,
            nome,
            setNome,
            qtd,
            setQtd,
            preco,
            setPreco,
            categorySelected,
            setCategorySelected,
            fileStorage,
            setFileStorage,
            isImageAdded,
            setIsImageAdded,
            errorUpload,


        }
}