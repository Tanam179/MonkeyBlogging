/* eslint-disable react/prop-types */
import styled from 'styled-components';
import { useController } from 'react-hook-form';
import { cloneElement } from 'react';

const InputStyles = styled.div`
    position: relative;
    width: 100%;

    input {
        width: 100%;
        padding: ${(props) => (props.icon ? '20px 60px 20px 20px' : '20px')};
        background-color: #fff;
        border-radius: 8px;
        font-weight: 500;
        border: 1px solid #84878b;
        outline: none;
        transition: all 0.3s ease-in-out;

        &::placeholder {
            color: #84878b;
        }

        &:focus {
            border-color: ${(props) => props.theme.primary};
        }

        &:disabled {
            background-color: ${(props) => props.theme.disabledColor};
            cursor: not-allowed;
            border-color: transparent;
        }
    }

    .input-icon {
        position: absolute;
        top: 50%;
        right: 20px;
        transform: translateY(-50%);
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
    }
`;

const Input = ({ name="", type="text", control, onToggle, disabled, children, ...props }) => {
    const {field} = useController({ name, control, defaultValue: "" });
     
    return (
        <InputStyles icon={children ? true : false}>
            <input disabled={disabled} id={name} type={type} {...props} {...field}/>
            { children && cloneElement(children, { className: 'input-icon', onClick: onToggle }) }
        </InputStyles>
    )
};

export default Input;
