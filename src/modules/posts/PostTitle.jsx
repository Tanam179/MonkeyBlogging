/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';

const PostTitleStyles = styled.h3`
    font-weight: 600;
    line-height: 1.5;
    display: -webkit-box;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    font-family: 'Montserrat', sans-serif;
    ${(props) =>
        props.size === 'normal' &&
        css`
            font-size: 16px;
        `};
    ${(props) =>
        props.size === 'large' &&
        css`
            font-size: 22px;
        `};
`;

const PostTitle = ({ className = '', children, size = 'normal', to = '' }) => {
    return (
        <PostTitleStyles size={size} className={`post-title ${className}`}>
            <Link to={to}>{children}</Link>
        </PostTitleStyles>
    );
};

export default PostTitle;
