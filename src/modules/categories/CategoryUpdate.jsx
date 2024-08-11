import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { collection, doc, getDoc, getDocs, query, updateDoc, where } from 'firebase/firestore';

import DashboardHeading from '../../drafts/DashboardHeading';
import { useForm } from 'react-hook-form';
import Field from '../../components/field';
import Label from '../../components/label';
import Input from '../../components/input';
import Dropdown from '../../components/dropdown';
import { Radio } from '../../components/checkbox';
import Button from '../../components/button';
import { db } from '../../firebase/firebaseConfig';
import slugify from 'slugify';
import { toast } from 'react-toastify';

const CategoryUpdate = () => {
    const [categories, setCategories] = useState([]);
    const [parentCategory, setParentCategory] = useState('');
    const [searchParams] = useSearchParams();
    const categoryId = searchParams.get('id');
    const navigate = useNavigate();
    const { control, watch, handleSubmit, setValue, reset } = useForm({
        mode: 'onChange',
        defaultValues: {},
    });

    useEffect(() => {
        const getCategories = async function () {
            const colRef = collection(db, 'categories');
            const q = query(colRef, where('status', '==', 1));
            const querySnapshot = await getDocs(q);
            const results = [];
            querySnapshot.forEach((snap) => {
                results.push({ id: snap.id, ...snap.data() });
            });

            setCategories(results);
        };

        getCategories();
    }, []);

    useEffect(() => {
        const fetchData = async function () {
            const colRef = doc(db, 'categories', categoryId);
            const singleDoc = await getDoc(colRef);
            if(singleDoc.data().parentId) {
                const docRefParent = doc(db, 'categories', singleDoc.data().parentId);
                const docSnapParent = await getDoc(docRefParent);
                setParentCategory(docSnapParent.data().name);
            }

            reset({
                ...singleDoc.data(),
            });
            
        };

        fetchData();
    }, [categoryId, reset, categories]);

    const watchStatus = Number(watch('status'));

    if (!categoryId) {
        return null;
    }

    const handleSelectCategory = function (parent) {
        if(parent) {
            setValue('parentId', parent.id);
            setParentCategory(parent.name);
        } else {
            setValue('parentId', '');
            setParentCategory('');
        }
    };

    const handleUpdateCategory = async function (values) {
        try {
            const colRef = doc(db, 'categories', categoryId);
            await updateDoc(colRef, {
                name: values.name,
                slug: slugify(values.slug || values.title, { replacement: '-', remove: /[*+~.,()'"!:@]/g, lower: true, locale: 'vi', trim: true }),
                parentId: values.parentId,
                status: watchStatus,
            });
            toast.success('Update category successfully');
            navigate('/manage/categories')
        } catch (error) {
            toast.error('Update category failed')
        }
    }

    return (
        <div>
            <DashboardHeading title="Update category" />
            <form autoComplete="off" onSubmit={handleSubmit(handleUpdateCategory)}>
                <div className="form-layout">
                    <Field>
                        <Label>Name</Label>
                        <Input control={control} name="name" placeholder="Enter your category name"></Input>
                    </Field>
                    <Field>
                        <Label>Slug</Label>
                        <Input control={control} name="slug" placeholder="Enter your slug"></Input>
                    </Field>
                </div>
                <div className="form-layout">
                    <Field>
                        <Label>Danh mục cha</Label>
                        <Dropdown>
                            <Dropdown.Select placeholder={parentCategory || 'Parent category'} />
                            <Dropdown.List>
                                <Dropdown.Option key="none" onClick={() => handleSelectCategory('')}>No parent</Dropdown.Option>
                                {categories.map((cate) => (
                                    <Dropdown.Option key={cate.id} onClick={() => handleSelectCategory(cate)}>
                                        {cate.name}
                                    </Dropdown.Option>
                                ))}
                            </Dropdown.List>
                        </Dropdown>
                    </Field>
                    <Field>
                        <Label>Status</Label>
                        <div className="flex flex-wrap gap-x-5">
                            <Radio name="status" control={control} checked={watchStatus === 1} value={1}>
                                Approved
                            </Radio>
                            <Radio name="status" control={control} checked={watchStatus === 2} value={2}>
                                Unapproved
                            </Radio>
                        </div>
                    </Field>
                </div>
                <Button type="submit" kind="primary" className="mx-auto">
                    Update category 
                </Button>
            </form>
        </div>
    );
};

export default CategoryUpdate;
