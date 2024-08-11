/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useContext, useState } from 'react';

const DropdownContext = createContext();

const DropdownProvider = function (props) {
    const [show, setShow] = useState(false);
    const toggle = () => {
        setShow(!show);
    };

    return <DropdownContext.Provider value={{ show, setShow, toggle }}>{props.children}</DropdownContext.Provider>;
}
const useDropdown = function () {
    const context = useContext(DropdownContext);
    if (typeof context === 'undefined') throw new Error('useDropdown must be used within DropdownProvider');
    return context;
}
export { useDropdown, DropdownProvider };
