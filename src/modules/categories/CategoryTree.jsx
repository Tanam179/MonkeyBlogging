
// import { Checkbox } from "../../components/checkbox";

/* eslint-disable react/prop-types */
const CategoryTree = ({ categories, register, name }) => {
    // Hàm đệ quy để render danh mục và các danh mục con
    const renderCategories = (categories, level = 0) => {
        return (
            <ul className={`flex flex-col tree-level-${level}`}>
                {categories.map((category) => (
                    <li key={category.id}>
                        <div  className={` mb-3`}>
                            <label className="flex gap-x-2 cursor-pointer">
                                <input type="checkbox" {...register(name)} value={category.id}/>
                                { category.name }
                            </label>
                        </div>
                        {category.children && category.children.length > 0 && renderCategories(category.children, level + 1)}
                    </li>
                ))}
            </ul>
        );
    };

    return <div className="bg-gray-100 w-full p-5 rounded-lg">{renderCategories(categories)}</div>
};

export default CategoryTree;
