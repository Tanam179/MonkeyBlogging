import { useEffect, useState } from 'react';
import slugify from 'slugify';

import Pagination from '../../components/pagination';
import Table from '../../components/table';
import { collection, deleteDoc, doc, onSnapshot, query, where } from 'firebase/firestore';
import { db } from '../../firebase/firebaseConfig';
import Edit from '../../components/actions/Edit';
import Delete from '../../components/actions/Delete';
import View from '../../components/actions/View';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import LabelStatus from '../../components/label/LabelStatus';

const PostManage = () => {
    const [postList, setPostList] = useState([]);
    const [users, setUsers] = useState([]);
    const [categories, setCategories] = useState([]);
    const navigate= useNavigate();

    useEffect(() => {
        const colRef = collection(db, 'users');
        onSnapshot(colRef, (snapshot) => {
            let results = [];
            snapshot.forEach((snap) => {
                results.push({ id: snap.id, ...snap.data()});
            });
            setUsers(results);
        });
    }, []);

    useEffect(() => {
        const colRef = collection(db, 'categories');
        onSnapshot(colRef, (snapshot) => {
            let results = [];
            snapshot.forEach((snap) => {
                results.push({ id: snap.id, ...snap.data()});
            });
            setCategories(results);
        });
    }, []);
    

    useEffect(() => {
        const colRef = collection(db, 'posts');
        onSnapshot(colRef, (snapshot) => {
            let results = [];
            snapshot.forEach((snap) => {
                const date = new Date(snap.data().createdAt.seconds * 1000);
                const formatDate = new Date(date).toLocaleDateString('vi-VI');
                const day = formatDate.split('/')[0].padStart(2, '0');
                const month = formatDate.split('/')[1].padStart(2, '0');
                const year = formatDate.split('/')[2];
                results.push({ id: snap.id, ...snap.data(), createdAt: day + '-' + month + '-' + year});
                console.log(snap.data());
            });
            setPostList(results);
        });
    }, []);

    const handleDeletePost = function(id) {
        Swal.fire({
            title: `Are you sure to delete this post?`,
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const docRef = doc(db, 'posts', id);
                    await deleteDoc(docRef);
                    toast.success('Delete post successfully');
                } catch (error) {
                    toast.error('Delete post failed');
                    console.log(error.message);
                }
            }
        });
    }

    return (
        <div>
            <h1 className="dashboard-heading">Manage post</h1>
            <div className="mb-10 flex justify-end">
                <div className="w-full max-w-[300px]">
                    <input
                        type="text"
                        className="w-full p-4 rounded-lg border border-solid border-gray-300"
                        placeholder="Search post..."
                    />
                </div>
            </div>
            <Table>
                <thead>
                    <tr>
                        <th>Post</th>
                        <th>Slug</th>
                        <th>Category</th>
                        <th>Author</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {postList &&
                        postList.length > 0 &&
                        postList.map((post) => (
                            <tr key={post.id}>
                                <td width="380px">
                                    <div className="flex items-center gap-x-4">
                                        <img
                                            src={post.image}
                                            alt={slugify(post.title)}
                                            className="w-[90px] h-[70px] rounded object-cover"
                                        />
                                        <div className="flex-1">
                                            <h3 className="font-semibold post-manage-title">{post.title}</h3>
                                            <time className="text-sm text-gray-500">Date: {post.createdAt}</time>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <span className="text-black italic">{post.slug.slice(0, 10) + '...'}</span>
                                </td>
                                <td>
                                    <span className="text-gray-500">
                                        {
                                            post.categoryId.map(id => {
                                                return categories.find(cate => cate.id === id).name
                                            }).join(' - ')
                                        }
                                    </span>
                                </td>
                                <td>
                                    <span className="text-gray-500">{users.find(el => el.id == post.userId).fullName}</span>
                                </td>
                                <td>
                                    <LabelStatus type={post.status === 1 ? 'success' : post.status === 2 ? 'warning' : 'danger'}>{ post.status === 1 ? 'Approved' : post.status === 2 ? 'Pending' : 'Reject' }</LabelStatus>
                                </td>
                                <td>
                                    <div className="flex items-center gap-x-3 text-gray-500">
                                        <View onClick={() => navigate(`/${post.slug}`)}/>
                                        <Edit/>
                                        <Delete onClick={() => handleDeletePost(post.id)}/>
                                    </div>
                                </td>
                            </tr>
                        ))}
                </tbody>
            </Table>
            <div className="mt-10">
                <Pagination></Pagination>
            </div>
        </div>
    );
};

export default PostManage;
