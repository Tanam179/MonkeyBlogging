/* eslint-disable react/prop-types */
import { Fragment } from "react";
import { useDropdown } from "../../contexts/DropdownContext";

const List = ({ children }) => {
    const { show } = useDropdown();
    return (
        <Fragment>
            {show && <div className="absolute top-full left-0 w-full bg-white shadow-sm">{children}</div>}
        </Fragment>
    );
};

export default List;
