import styled from 'styled-components';
import PostCategory from './PostCategory';
import PostTitle from './PostTitle';
import PostImage from './PostImage';

const PostNewestLargeStyles = styled.div`
    .post {
        &-image {
            display: block;
            margin-bottom: 16px;
            height: 433px;
            border-radius: 16px;
        }
        &-category {
            display: inline-block;
            padding: 8px 12px;
            border-radius: 8px;
            color: #6b6b6b;
            font-size: 14px;
            font-weight: 600;
            background-color: #f3edff;
            margin-bottom: 16px;
        }
        &-info {
            display: flex;
            align-items: center;
            gap: 12px;
            font-size: 14px;
            font-weight: 600;
            margin-left: auto;
        }
        &-dot {
            display: inline-block;
            width: 4px;
            height: 4px;
            background-color: currentColor;
            border-radius: 100rem;
        }
        &-title {
            margin-bottom: 12px;
        }
    }
`;

const PostNewestLarge = () => {
    return (
        <PostNewestLargeStyles>
            <PostImage url="https://images.unsplash.com/photo-1510519138101-570d1dca3d66?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2294&q=80"/>
            <PostCategory>Knowledge</PostCategory>
            <PostTitle size="large">Hướng dẫn setup phòng cực chill dành cho người mới toàn tập</PostTitle>
            <div className="post-info">
                <span className="post-time">Mar 23</span>
                <span className="post-dot"></span>
                <span className="post-author">Andiez Le</span>
            </div>
        </PostNewestLargeStyles>
    );
};

export default PostNewestLarge;
