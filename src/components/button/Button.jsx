import styled from 'styled-components';
import PropsTypes from 'prop-types';

const ButtonStyles = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    padding: 20px 40px;
    line-height: 1;
    color: #fff;
    background-image: linear-gradient(to right bottom, #00a7b4, #a4d96c);
    font-size: 18px;
    font-weight: 600;
    height: ${(props) => props.height || '66px'};
    outline: none;
    &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }
`;

const Button = ({ type = 'button', disabled, onClick = () => {}, children, ...props }) => {
    return (
        <ButtonStyles
            disabled={disabled}
            type={type}
            onClick={onClick}
            {...props}
        >
            {children}
        </ButtonStyles>
    );
};

Button.propTypes = {
    type: PropsTypes.oneOf(['button', 'submit', 'reset']).isRequired,
    disabled: PropsTypes.bool,
    onClick: PropsTypes.func,
    children: PropsTypes.node,
}

export default Button;
