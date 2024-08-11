import { useEffect, useState } from 'react';
import { collection, onSnapshot, doc, deleteDoc, query, where, getDocs, limit, startAfter, getDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

import Delete from '../../components/actions/Delete';
import Edit from '../../components/actions/Edit';
import View from '../../components/actions/View';
import Button from '../../components/button';
import LabelStatus from '../../components/label/LabelStatus';
import Table from '../../components/table';
import DashboardHeading from '../../drafts/DashboardHeading';
import { db } from '../../firebase/firebaseConfig';

const CategoryManage = () => {
    const [categoryList, setCategoryList] = useState([]);
    const [categoryFilter, setCategoryFilter] = useState([]);
    const [dataTotalCout, setDataTotalCout] = useState(0);
    const [parentCategory, setParentCategory] = useState('');
    const [filter, setFilter] = useState('');
    const [lastDoc, setLastDoc] = useState();
    const navigate = useNavigate();

    const getPageSize = async function() {
        const colRef = collection(db, 'categories');
        onSnapshot(colRef, snapshot => {
            setDataTotalCout(snapshot.size)
        })
    }

    useEffect(() => {
        getPageSize();
    }, [])

    const handleLoadMore = async function () {
        const nextRef = query(collection(db, 'categories'), startAfter(lastDoc), limit(1));

        onSnapshot(nextRef, (snapshot) => {
            let results = [];
            const lastVisible = snapshot.docs[snapshot.docs.length - 1];

            snapshot.forEach((snap) => {
                results.push({ id: snap.id, ...snap.data() });
            });
            setLastDoc(lastVisible);
            setCategoryList(results);
        });
    };

    useEffect(() => {
        const colRef = collection(db, 'categories');
        const queries = query(colRef, limit(1))
        onSnapshot(queries, (snapshot) => {
            let results = [];
            const lastVisible = snapshot.docs[snapshot.docs.length - 1];
            snapshot.forEach((snap) => {
                if(snap.data().parentId) {
                    const docRef = doc(db, 'categories', snap.data().parentId);
                    getDoc(docRef).then(data => setParentCategory(data.data().name))
                }
                results.push({ id: snap.id, ...snap.data() });
            });
            
            setLastDoc(lastVisible);
            setCategoryList(results);
        });
    }, []);

    useEffect(() => {
        let timer;
        if (filter) {
            timer = setTimeout(() => {
                const colRef = collection(db, 'categories');
                const upperCaseFirstLetter = filter[0].toUpperCase() + filter.slice(1);
                console.log(upperCaseFirstLetter);
                const queries = query(
                    colRef,
                    where('name', '>=', upperCaseFirstLetter),
                    where('name', '<=', upperCaseFirstLetter + '\uf8ff'),
                );
                getDocs(queries).then((snapshot) => {
                    let results = [];
                    console.log(snapshot);
                    snapshot.forEach((snap) => {
                        results.push({ id: snap.id, ...snap.data() });
                    });

                    setCategoryFilter(results);
                });
            }, 500);
        }

        return function () {
            clearTimeout(timer);
        };
    }, [filter]);

    const handleDelete = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const docRef = doc(db, 'categories', id);
                    await deleteDoc(docRef);
                    toast.success('Delete category successfully');
                } catch (error) {
                    toast.error('Delete category failed');
                    console.log(error.message);
                }
            }
        });
    };

    return (
        <div>
            <DashboardHeading title="Categories" desc="Manage your category">
                <Button to="/manage/add-category">Create new category</Button>
            </DashboardHeading>
            <div className="flex justify-end mb-5">
                <input
                    onChange={(e) => setFilter(e.target.value)}
                    className="px-6 py-4 border border-gray-300 rounded-lg"
                    type="text"
                    name="search"
                    placeholder="Search category..."
                />
            </div>
            <Table>
                <thead>
                    <tr>
                        <th>NAME</th>
                        <th>SLUG</th>
                        <th>PARENT</th>
                        <th>STATUS</th>
                        <th>ACTIONS</th>
                    </tr>
                </thead>
                <tbody>
                    {categoryFilter.length > 0
                        ? categoryFilter.map((category) => (
                              <tr key={category.id}>
                                  <td>{category.name}</td>
                                  <td>
                                      <span className="italic text-gray-400">{category.slug}</span>
                                  </td>
                                  <td>{category.parentId ? parentCategory : 'No Parent'}</td>
                                  <td>
                                      <LabelStatus type={`${category.status == 1 ? 'success' : 'danger'}`}>
                                          {category.status == 1 ? 'Approved' : 'Unapproved'}
                                      </LabelStatus>
                                  </td>
                                  <td>
                                      <div className="flex items-center gap-x-3">
                                          <View />
                                          <Edit onClick={() => navigate(`/manage/update-category?id=${category.id}`)} />
                                          <Delete onClick={() => handleDelete(category.id)} />
                                      </div>
                                  </td>
                              </tr>
                          ))
                        : categoryList.map((category) => (
                              <tr key={category.id}>
                                  <td>{category.name}</td>
                                  <td>
                                      <span className="italic text-gray-400">{category.slug}</span>
                                  </td>
                                  <td>{category.parentId ? parentCategory : 'No Parent'}</td>
                                  <td>
                                      <LabelStatus type={`${category.status == 1 ? 'success' : 'danger'}`}>
                                          {category.status == 1 ? 'Approved' : 'Unapproved'}
                                      </LabelStatus>
                                  </td>
                                  <td>
                                      <div className="flex items-center gap-x-3">
                                          <View />
                                          <Edit onClick={() => navigate(`/manage/update-category?id=${category.id}`)} />
                                          <Delete onClick={() => handleDelete(category.id)} />
                                      </div>
                                  </td>
                              </tr>
                          ))}
                </tbody>
            </Table>
            <button onClick={handleLoadMore}>Load more</button>
        </div>
    );
};

export default CategoryManage;
