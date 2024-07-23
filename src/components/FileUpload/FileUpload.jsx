'use client'
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UploadFile = () => {
    const [image, setImage] = useState(null);
    const [files, setImages] = useState([]);

    const [courseName, setCourseName] = useState('');
    const [moduleNum, setModuleNum] = useState('');
    const [fileName, setFileName] = useState('');

    const onChangeHandler = (e) => {
        if (e.target.files.length > 0) {
            setImage(e.target.files[0]);
        }
    };

    const FetchAllFiles = async () => {
        try {
            const response = await axios.get("/api/upload-image");
            const files = response.data.files;
            setImages(files);
        } catch (error) {
            console.log(error.message);
        }
    };

    const onSubmitHandler = async (e) => {
        e.preventDefault();

        try {
            if (!image) {
                console.error('No image selected');
                return;
            }

            const formData = new FormData();
            formData.append('image', image);
            formData.append('fileName', fileName);
            formData.append('courseName', courseName);
            formData.append('moduleNum', moduleNum);

            console.log("Sending data:", {
                fileName,
                courseName,
                moduleNum
            });

            await axios.post('/api/upload-image', formData);

            await FetchAllFiles();
        } catch (error) {
            console.error('Error uploading file:', error.message);
        }
    };

    useEffect(() => {
        FetchAllFiles();
    }, []);

    return (
        <>
            <form onSubmit={onSubmitHandler}>
                <input type="file" onChange={onChangeHandler} />
                <input
                    type="text"
                    id='fileName'
                    name='fileName'
                    value={fileName}
                    onChange={(e) => setFileName(e.target.value)}
                />
                <input
                    type="text"
                    id='courseName'
                    name='courseName'
                    value={courseName}
                    onChange={(e) => setCourseName(e.target.value)}
                />
                <input
                    type="text"
                    id='moduleNum'
                    name='moduleNum'
                    value={moduleNum}
                    onChange={(e) => setModuleNum(e.target.value)}
                />
                <button type="submit">Upload</button>
            </form>

            <div>
                {files.map((cur, i) => (
                    <div key={i}>
                        <a href="">
                            <img src={cur.image_url} alt="uploaded" />
                        </a>
                    </div>
                ))}
            </div>
        </>
    );
};

export default UploadFile;
