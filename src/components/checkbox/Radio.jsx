/* eslint-disable react/prop-types */
import { useController } from 'react-hook-form';

const Radio = ({ checked, children, control, name, ...rest }) => {
    const { field } = useController({
        control,
        name,
        defaultValue: '',
    });
    return (
        <label>
            <input onChange={() => {}} checked={checked} type="radio" className="hidden-input" {...field} {...rest} />
            <div className="flex items-center gap-x-3 font-medium cursor-pointer">
                <div className={`overflow-hidden w-32 h-[63px] flex items-center justify-center border-2 rounded-md text-sm relative ${ checked ? 'border-green-500 text-green-500 font-semibold' : 'font-medium text-black border-gray-300'}`}>
                    <span>{children}</span>
                    { checked && <div className='absolute -right-[18px] bottom-0 border-t-transparent border-l-transparent border-r-transparent border-[18px] border-b-green-500 z-1000'></div>}
                    { checked && <img className='absolute bottom-[1px] right-[2px] z-100000' width="8px" height="8px" src="https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/productdetailspage/9057d6e718e722cde0e8.svg" alt="" />}
                </div>
            </div>
        </label>
    );
};

export default Radio;
