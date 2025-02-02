import { deleteObject, getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { useState } from 'react';

const useFirebaseImage = function (getValues, setValue) {
    const [progress, setProgress] = useState(0);
    const [image, setImage] = useState('');

    const handleUploadImage = (file) => {
        const storage = getStorage();
        const storageRef = ref(storage, 'images/' + file.name);
        const uploadTask = uploadBytesResumable(storageRef, file);
        uploadTask.on(
            'state_changed',
            (snapshot) => {
                const progressPercent = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setProgress(progressPercent);
                switch (snapshot.state) {
                    case 'paused':
                        break;
                    case 'running':
                        break;
                    default:
                }
            },
            (error) => {
                console.log('Error', error);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    // console.log('File available at', downloadURL);
                    setImage(downloadURL);
                });
            },
        );
    };
    const handleSelectImage = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        setValue('image_name', file.name);
        handleUploadImage(file);
    };

    const handleDeleteImage = () => {
        const storage = getStorage();
        const imageRef = ref(storage, 'images/' + getValues('image_name'));
        deleteObject(imageRef)
            .then(() => {
                console.log('Remove image successfully');
                setImage('');
                setProgress(0);
            })
            .catch((error) => {
                console.log('handleDeleteImage ~ error', error);
                console.log('Can not delete image');
            });
    };

    return { image, progress, setProgress, setImage, handleSelectImage, handleDeleteImage}
};

export default useFirebaseImage;
