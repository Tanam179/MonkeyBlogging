import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import slugify from 'slugify';
import styled from 'styled-components';
import { addDoc, collection, getDocs, query, serverTimestamp, where } from 'firebase/firestore';

import Field from '../../components/field';
import Label from '../../components/label';
import ImageUpload from '../../components/image/ImageUpload';
import { postStatus } from '../../utils/constants';
import { Radio } from '../../components/checkbox';
import Button from '../../components/button';
import Input from '../../components/input';
import useFirebaseImage from '../../hooks/useFirebaseImage';
import Toggle from '../../components/toggle/Toggle';
import { db } from '../../firebase/firebaseConfig';
import { useAuth } from '../../contexts/AuthContext';
import { toast } from 'react-toastify';
import CategoryTree from '../categories/CategoryTree';
import MyCkEditor from '../../components/ckeditor/CkEditor';

const PostAddNewStyles = styled.div``;

const PostAddNew = () => {
    const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState();
    const [categoryTree, setCategoryTree] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const { register, control, watch, setValue, handleSubmit, getValues, reset } = useForm({
        mode: 'onChange',
        defaultValues: {
            title: '',
            slug: '',
            status: 2,
            categoryId: [],
            isFeature: false,
        },
    });

    const watchStatus = watch('status');
    const watchIsFeature = watch('isFeature');
    const { image, progress, setProgress, setImage, handleDeleteImage, handleSelectImage } = useFirebaseImage(
        getValues,
        setValue,
    );

    const { userInfor } = useAuth();

    const addPostHandler = async (values) => {
        const cloneValues = { ...values };
        cloneValues.slug = slugify(values.slug || values.title, {
            replacement: '-',
            remove: /[*+~.,()'"!:@]/g,
            lower: true,
            locale: 'vi',
            trim: true,
        });
        cloneValues.status = Number(values.status);
        setIsLoading(true);
        try {
            const colRef = collection(db, 'posts');
            await addDoc(colRef, {
                title: cloneValues.title,
                slug: cloneValues.slug,
                status: cloneValues.status,
                categoryId: cloneValues.categoryId,
                isFeature: cloneValues.isFeature,
                image,
                content: cloneValues.content,
                userId: userInfor.uid,
                createdAt: serverTimestamp(),
            });
            toast.success('Create new post successfully');
        } catch (err) {
            toast.error('Create new post fail');
            console.log(err);
        } finally {
            reset();
            setImage(null);
            setProgress(0);
            setCategory(null);
            setIsLoading(false);
        }
    };

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

    // const handleSelectCategory = function (id, value) {
    //     setValue('categoryId', id);
    //     setCategory(value);
    // };

    useEffect(() => {
        function buildCategoryTree(categories) {
            // Tạo một đối tượng để lưu các danh mục theo ID
            let categoryMap = {};
            categories.forEach((category) => {
                categoryMap[category.id] = { ...category, children: [] };
            });

            // Tạo cây phân cấp
            let tree = [];
            categories.forEach((category) => {
                if (!category.parentId) {
                    // Nếu không có parentId, thêm vào gốc của cây
                    tree.push(categoryMap[category.id]);
                } else {
                    // Nếu có parentId, thêm vào mảng children của danh mục cha
                    categoryMap[category.parentId]?.children.push(categoryMap[category.id]);
                }
            });

            return tree;
        }

        if (categories.length > 0) {
            const categoryTree = buildCategoryTree(categories);
            setCategoryTree(categoryTree);
        }
    }, [categories]);

    return (
        <PostAddNewStyles>
            <div className="flex items-center justify-between mb-10">
                <h1 className="dashboard-heading">Add new post</h1>
                <Button to="/dashboard" variation="primary" className="header-button" height="52px">
                    Write new post
                </Button>
            </div>
            <form onSubmit={handleSubmit(addPostHandler)}>
                <div className="grid grid-cols-2 gap-x-10 mb-10">
                    <Field>
                        <Label>Title</Label>
                        <Input control={control} placeholder="Enter your title" name="title" required></Input>
                    </Field>
                    <Field>
                        <Label>Slug</Label>
                        <Input control={control} placeholder="Enter your slug" name="slug"></Input>
                    </Field>
                </div>
                <div className=" flex gap-x-10 mb-10">
                    <Field className="flex-1">
                        <Label>Image</Label>
                        <ImageUpload
                            onChange={handleSelectImage}
                            handleDeleteImage={handleDeleteImage}
                            className="h-[250px]"
                            progress={progress}
                            image={image}
                        ></ImageUpload>
                    </Field>
                    <Field className="flex-1">
                        <Label>Category</Label>
                        <CategoryTree register={register} name="categoryId" categories={categoryTree} />
                    </Field>
                </div>
                <div>
                    <Field>
                        <Label>Content</Label>
                        <Controller
                            name="content"
                            control={control}
                            defaultValue=""
                            render={({ field: { onChange, value } }) => (
                                <MyCkEditor
                                    data={value}
                                    onChange={(event, editor) => {
                                        const data = editor.getData();
                                        onChange(data); // Lấy giá trị HTML của CKEditor
                                    }}
                                    title={watch('title')}
                                />
                            )}
                        />
                    </Field>
                </div>
                <div className="grid grid-cols-2 gap-x-10 mb-10">
                    <Field>
                        <Label>Is a feature post</Label>
                        <Toggle on={watchIsFeature === true} onClick={() => setValue('isFeature', !watchIsFeature)} />
                    </Field>
                    <Field>
                        <Label>Status</Label>
                        <div className="flex items-center gap-x-5">
                            <Radio
                                name="status"
                                control={control}
                                checked={Number(watchStatus) === postStatus.APPROVED}
                                value={postStatus.APPROVED}
                            >
                                Approved
                            </Radio>
                            <Radio
                                name="status"
                                control={control}
                                checked={Number(watchStatus) === postStatus.PENDING}
                                value={postStatus.PENDING}
                            >
                                Pending
                            </Radio>
                            <Radio
                                name="status"
                                control={control}
                                checked={Number(watchStatus) === postStatus.REJECTED}
                                value={postStatus.REJECTED}
                            >
                                Reject
                            </Radio>
                        </div>
                    </Field>
                </div>
                <Button type="submit" className="mx-auto" isLoading={isLoading} disabled={isLoading}>
                    Add new post
                </Button>
            </form>
        </PostAddNewStyles>
    );
};

export default PostAddNew;
