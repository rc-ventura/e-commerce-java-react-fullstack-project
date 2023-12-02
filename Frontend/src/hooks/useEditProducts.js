import { useState, useEffect } from "react"
import axios from "axios";
import { useFetchProducts } from "./useFetchProducts";

export const useEditProducts = (id) => {


    const { product, loadProductsId } = useFetchProducts(id)

    const [cancelled, setCancelled] = useState(false);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(null);

    const [updateError, setUpdateError] = useState(null)
    const [isImageAdded, setIsImageAdded] = useState(null)




    function checkIfIsCancelled() {
        if (cancelled) {
            return;
        }
    }

    const updateProduct = async (productData) => {

        checkIfIsCancelled()

        setLoading(true);

        try {

            const productResponse = await axios.put(`http://localhost:8080/produtos/${id}`, productData);
            return productResponse.data


        } catch (error) {
            console.error('Error updating product.', error);
            setError(error.message)

            setLoading(false)
        }

    }

    const imageUpdate = async (formDataImage) => {

        checkIfIsCancelled()

        if (!isImageAdded) {

            setUpdateError('Please, upload an image!')
            return
        }

        setLoading(true);

        try {

            if (product && product.fileStorage) {
                await axios.put(
                    `http://localhost:8080/produtos/${id}/addFiles/${product.fileStorage.id}`, formDataImage, {

                    headers: {
                        'Content-Type': 'multipart/form-data'
                    },
                }
                );
            } else {
                setUpdateError('Product or image is null or undefined')
            }
        } catch (error) {
            console.error(error.message)

            setUpdateError('Error updating image. Please try again')

        }

        setLoading(false);


    }

    useEffect(() => {
        loadProductsId()
    }, []);



    useEffect(() => {
        return () => setCancelled(true);
    }, []);

    return {
        error,
        loading,
        updateProduct,
        updateError,
        imageUpdate,
        isImageAdded,
        setIsImageAdded,
    }

}