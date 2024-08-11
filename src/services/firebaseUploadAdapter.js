import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../firebase/firebaseConfig';

const createFirebaseUploadAdapter = (loader) => {
    const upload = () => {
        return new Promise((resolve, reject) => {
            loader.file
                .then((file) => {
                    const storageRef = ref(storage, `images/${file.name}`);
                    uploadBytes(storageRef, file)
                        .then((snapshot) => {
                            getDownloadURL(snapshot.ref)
                                .then((url) => {
                                    resolve({ default: url });
                                })
                                .catch(reject);
                        })
                        .catch(reject);
                })
                .catch(reject);
        });
    };

    const abort = () => {
        // Implement abort logic if necessary
    };

    return {
        upload,
        abort,
    };
};

export default createFirebaseUploadAdapter;
