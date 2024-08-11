/* eslint-disable react/prop-types */
import styled from 'styled-components';
import PropsTypes from 'prop-types';
import { Link } from 'react-router-dom';

const ButtonStyles = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    padding: 20px 40px;
    line-height: 1;
    color: ${props => variations[props.variation].color};
    background-image: ${props => variations[props.variation]['background-image']};
    margin: ${props => aligns[props.align] || '0'} ;
    font-size: 18px;
    font-weight: 600;
    height: ${(props) => props.height || '66px'};
    outline: none;
    &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }
`;

const variations = {
    primary: {
        'background-image': 'linear-gradient(to right bottom, #00a7b4, #a4d96c)',
        color: '#fff',
    },

    secondary: {
        'background-image': '#fff',
        color: '#23BB86'
    }
}

const aligns = {
    middle: '0 auto'
}

const Button = ({ align, variation = 'primary', to, type = 'button', disabled, onClick = () => {}, children, ...props }) => {
    if (to !== '' && typeof to === 'string') {
        return (
            <Link to={to}>
                <ButtonStyles align={align} variation={variation} disabled={disabled} type={type} {...props}>
                    {children}
                </ButtonStyles>
            </Link>
        );
    }

    return (
        <ButtonStyles align={align} variation={variation} disabled={disabled} type={type} onClick={onClick} {...props}>
            {children}
        </ButtonStyles>
    );
};

Button.propTypes = {
    type: PropsTypes.oneOf(['button', 'submit', 'reset']),
    disabled: PropsTypes.bool,
    onClick: PropsTypes.func,
    children: PropsTypes.node,
};

export default Button;
