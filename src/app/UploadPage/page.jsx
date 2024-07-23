// pages/index.js или pages/_app.js

import FileUpload from '@/components/FileUpload/FileUpload';

const HomePage = () => {
    return (
        <div>
            <h1>Домашняя страница</h1>
            <FileUpload />
        </div>
    );
};

export default HomePage;
