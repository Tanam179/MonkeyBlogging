/* eslint-disable react/prop-types */

import { useDropdown } from "../../contexts/DropdownContext";

const Option = ({ children, onClick }) => {
    const { setShow } = useDropdown();

    const handleClick = function() {
        onClick();
        setShow(false);
    }

    return (
        <div className="px-5 py-4 cursor-pointer flex items-center justify-between hover:bg-gray-100" onClick={handleClick}>
            {children}
        </div>
    );
};

export default Option;
