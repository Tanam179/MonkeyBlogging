import { useForm } from 'react-hook-form';
import DashboardHeading from '../../drafts/DashboardHeading';
import Input from '../../components/input';
import Label from '../../components/label';
import Field from '../../components/field';
import { Radio } from '../../components/checkbox';
import Button from '../../components/button';
import slugify from 'slugify';
import Dropdown from '../../components/dropdown';
import { useEffect, useState } from 'react';
import { addDoc, collection, getDocs, query, serverTimestamp, where } from 'firebase/firestore';
import { db } from '../../firebase/firebaseConfig';
import { toast } from 'react-toastify';

const CategoryAddNew = () => {
    const {
        control,
        setValue,
        watch,
        reset,
        handleSubmit,
    } = useForm({
        mode: 'onChange',
        defaultValues: {
            name: '',
            slug: '',
            parentId: '',
            status: '',
            createdAt: new Date()
        },
    });

    const [categories, setCategories] = useState([]);
    const [parentCategory, setParentCategory] = useState('');

    const watchStatus = Number(watch('status'));

    const handleAddNewCategory = async function (values) {
        const newValues = { ...values };
        newValues.slug = slugify(newValues.name || newValues.slug, {
            replacement: '-',
            remove: /[*+~.,()'"!:@]/g,
            lower: true,
            locale: 'vi',
            trim: true,
        });

        try {
            const colRef = collection(db, 'categories');
            const newCate = await addDoc(colRef, {
                name: newValues.name,
                slug: newValues.slug,
                parentId: newValues.parentId,
                status: Number(newValues.status),
                createdAt: serverTimestamp()
            })
            setCategories(prev => [...prev, { id: newCate.id, ...newValues}])
            toast.success('Create new category successfully');

        } catch (error) {
            toast.error('Create category failed')
            console.log(error.message);
        } finally {
            reset();
            setParentCategory('');
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

    const handleSelectCategory = function(parent) {
        setValue('parentId', parent.id);
        setParentCategory(parent.name);
    }

    return (
        <div>
            <DashboardHeading title="New category" desc="Add new category"></DashboardHeading>
            <form autoComplete="off" onSubmit={handleSubmit(handleAddNewCategory)}>
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
                                {categories.map((cate) => (
                                    <Dropdown.Option
                                        key={cate.id}
                                        onClick={() => handleSelectCategory(cate)}
                                    >
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
                    Add new category
                </Button>
            </form>
        </div>
    );
};

export default CategoryAddNew;
