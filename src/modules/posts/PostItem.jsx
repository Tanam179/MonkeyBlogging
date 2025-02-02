import styled from 'styled-components';
import PostCategory from './PostCategory';
import PostTitle from './PostTitle';
import PostMeta from './PostMeta';
import PostImage from './PostImage';

const PostItemStyles = styled.div`
    .post {
        &-image {
            height: 202px ;
            margin-bottom: 20px;
            display: block;
            width: 100%;
            border-radius: 12px;
        }
        &-category {
            margin-bottom: 16px;
        }
        &-info {
            display: flex;
            align-items: center;
            gap: 12px;
            font-size: 14px;
            font-weight: 600;
            color: #6b6b6b;
            margin-top: auto;
        }
        &-dot {
            display: inline-block;
            width: 4px;
            height: 4px;
            background-color: currentColor;
            border-radius: 100rem;
        }
        &-title {
            margin-bottom: 8px;
        }
    }
`;

const PostItem = () => {
    return (
        <PostItemStyles>
            <PostImage url="https://images.unsplash.com/photo-1570993492881-25240ce854f4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2290&q=80"/>
            <PostCategory>Knowledge</PostCategory>
            <PostTitle>Hướng dẫn setup phòng cực chill dành cho người mới toàn tập</PostTitle>
            <PostMeta></PostMeta>
        </PostItemStyles>
    );
};

export default PostItem;
