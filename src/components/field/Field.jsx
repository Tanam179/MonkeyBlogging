/* eslint-disable react/prop-types */
import styled from 'styled-components';

const FieldStyles = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-bottom: 40px;
`;

const Field = ({ children, ...props }) => {
    return <FieldStyles {...props}>{ children }</FieldStyles>;
};

export default Field;
