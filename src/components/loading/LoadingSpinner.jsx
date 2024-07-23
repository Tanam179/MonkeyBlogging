/* eslint-disable react/prop-types */
import styled from "styled-components";

const SpinnerStyles = styled.div`
    width: ${props => props.size};
    height: ${props => props.size};
    border: ${props => props.borderSized} solid #fff;
    border-top: ${props => props.borderSized} solid transparent;
    border-bottom:${props => props.borderSized} solid transparent;
    border-radius: 1000px;
    display: inline-block;
    animation: spinner 1s infinite linear;

    @keyframes spinner {
        100% { transform: rotate(360deg); }
    }
`

const LoadingSpinner = ({ size = "40px", borderSized = "5px" }) => {
    return (
        <SpinnerStyles size={size} borderSized={borderSized}>
            
        </SpinnerStyles>
    );
};

export default LoadingSpinner;