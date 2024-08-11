/* eslint-disable react/prop-types */
import { DropdownProvider } from '../../contexts/DropdownContext';

const Dropdown = ({ children, ...props }) => {
    return (
        <DropdownProvider {...props}>
            <div className="relative inline-block w-full">
                { children }
            </div>
        </DropdownProvider>
    );
};

export default Dropdown;
