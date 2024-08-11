/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';

const PostCategoryStyles = styled.div`
    display: inline-block;
    padding: 4px 10px;
    border-radius: 10px;
    color: #6b6b6b;
    font-size: 12px;
    font-weight: 600;
    font-family: 'Montserrat', sans-serif;
    ${(props) =>
        props.type === 'primary' &&
        css`
            background-color: ${(props) => props.theme.grayF3};
        `};
    ${(props) =>
        props.type === 'secondayry' &&
        css`
            background-color: '#fff';
        `}
`;

const PostCategory = ({ children, type = 'primary', className = '', to = '#' }) => {
    return (
        <PostCategoryStyles type={type} className={`post-category ${className}`}>
            <Link to={to}>{children}</Link>
        </PostCategoryStyles>
    );
};

export default PostCategory;
