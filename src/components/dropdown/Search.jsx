/* eslint-disable react/prop-types */
import { useDropdown } from "../../contexts/DropdownContext";

const Search = ({ placeholder, ...props }) => {
    const { onChange } = useDropdown();
    return (
        <div className="p-2">
            <input
                type="text"
                placeholder={placeholder}
                className="p-4 outline-none w-full border border-gray-200 rounded"
                onChange={onChange}
                {...props}
            />
        </div>
    );
};

export default Search;
