import { useState } from "react";
import axios from 'axios';
import SnackBar from "../Alerts/SnackBar";

const Upload = ({ onImageUpload }) => {

    const [selectedFile, setSelectedFile] = useState(null);
    const [errorUpload, setErrorUpload] = useState(null)
    const [alertUpload, setAlertUpload] = useState(null)
    const [successUpload, setSucessUpload] = useState(null)


    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setSelectedFile(file);
    };

    const handleUpload = async () => {
        if (selectedFile) {
            const reader = new FileReader();

            const formData = new FormData();
            formData.append('file', selectedFile);

            reader.onloadend = async () => {


                try {
                    const response = await axios.post(
                        'http://localhost:8080/upload', formData, {
                    },
                        {
                            headers: {
                                'Content-Type': 'multipart/form-data'
                            },
                        }
                    );
                    
                    setSucessUpload('Upload image success')

                    onImageUpload(response.data);
                 
                } catch (error) {

                    setErrorUpload('Error submitted upload')
                }
            } 
            reader.readAsDataURL(selectedFile);

            } else {
                 setAlertUpload('Attention, upload an image')
            }

        }
    

    return (
        <div>
            <input
                type="file"
                className="mb-4"
                onChange={handleFileChange}
                accept="image/*" />

            <button
                type="button"
                className="btn btn-primary mx-2"
                onClick={handleUpload}>Upload</button>

            {/* {selectedFile && (
                <img
                    width='80'
                    src={URL.createObjectURL(selectedFile)}
                    alt="Selected" />
            )} */}
             {errorUpload && (
            <SnackBar handleUploadError={setErrorUpload} message='danger'>{errorUpload}</SnackBar>
        )}
        {alertUpload && (
            <SnackBar handleUploadAlert={setAlertUpload} message='warning'>{alertUpload}</SnackBar>
        )}
        {successUpload && (
            <SnackBar handleUploadSuccess={setSucessUpload} message='success'>{successUpload}</SnackBar>
        )}
        </div>
       
    );
};

export default Upload;
