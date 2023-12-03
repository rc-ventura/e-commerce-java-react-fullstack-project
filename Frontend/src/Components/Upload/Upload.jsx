import { useState } from "react";
import axios from 'axios';

const Upload = ({ onImageUpload }) => {

    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setSelectedFile(file);
        console.log(file);
    };

    const handleUpload = async () => {
        if (selectedFile) {
            const reader = new FileReader();

            const formData = new FormData();
            formData.append('file', selectedFile);

            reader.onloadend = async () => {
                const imageData = reader.result;

                console.log(imageData);

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
                    alert('Upload Success')
                    console.log(response.data);

                    onImageUpload(response.data);

                } catch (error) {
                    console.error('Error submitted upload', error);
                }
            };

            reader.readAsDataURL(selectedFile);
        }
    };

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
        </div>
    );
};

export default Upload;
