/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import slugify from 'slugify';
import styled from 'styled-components';

import PostCategory from './PostCategory';
import PostTitle from './PostTitle';
import PostMeta from './PostMeta';
import PostImage from './PostImage';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase/firebaseConfig';

const PostFeatureItemStyles = styled.div`
    width: 100%;
    border-radius: 15px;
    position: relative;
    height: 169px;

    .post {
        &-image {
            width: 100%;
            height: 100%;
            border-radius: 16px;
        }
        &-overlay {
            position: absolute;
            inset: 0;
            border-radius: 16px;
            background: linear-gradient(
                179.77deg,
                #6b6b6b 36.45%,
                rgba(163, 163, 163, 0.622265) 63.98%,
                rgba(255, 255, 255, 0) 99.8%
            );
            mix-blend-mode: multiply;
            opacity: 0.6;
        }
        &-content {
            position: absolute;
            z-index: 10;
            padding: 20px;
            color: white;
            bottom: 20px;
        }
        &-top {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 16px;
        }
        &-dot {
            display: inline-block;
            width: 4px;
            height: 4px;
            background-color: currentColor;
            border-radius: 100rem;
        }
        &-title {
            color: white;
        }
    }

    @media screen and (min-width: 1024px) {
        height: 300px;
    }
`;
const PostFeatureItem = ({ data }) => {
    const [category, setCategory] = useState('');
    const [author, setAuthor] = useState('');
    const [createdAt, setCreatedAt] = useState('');

    useEffect(() => {
        const getPostInfo = async function () {
            if(typeof data.categoryId === 'string') {
                const docRef = doc(db, 'categories', data.categoryId);
                const docSnap = await getDoc(docRef);
                setCategory(docSnap.data());
            } else if(typeof data.categoryId === 'object') {
                data.categoryId.forEach(async (id) => {
                    const docRef = doc(db, 'categories', id);
                    const docSnap = await getDoc(docRef);
                    setCategory(prev => [...prev, docSnap.data()]);
                })
            }

            const docRefAuthor = doc(db, 'users', data.userId);
            const docSnapAuthor = await getDoc(docRefAuthor);
            setAuthor(docSnapAuthor.data());
        };

        getPostInfo();
    }, [data.categoryId, data.userId]);

    useEffect(() => {
        const date = new Date(data.createdAt.seconds * 1000);
        const formatDate = new Date(date).toLocaleDateString('vi-VI');
        const day = formatDate.split('/')[0].padStart(2, '0');
        const month = formatDate.split('/')[1].padStart(2, '0');
        const year = formatDate.split('/')[2];
        setCreatedAt(`${day}-${month}-${year}`)
    }, [data]);

    console.log(category);

    return (
        <PostFeatureItemStyles>
            <PostImage url={data.image} />
            <div className="post-overlay"></div>
            <div className="post-content">
                <div className="post-top">
                    <PostCategory to={category[0]?.slug || category?.slug}>{ category[0]?.name || category?.name  }</PostCategory>
                    <PostMeta to={slugify(String(author.fullName)) || '/'} date={createdAt} author={author.fullName}></PostMeta>
                </div>
                <PostTitle size="large" to={data.slug}>
                    {data.title}
                </PostTitle>
            </div>
        </PostFeatureItemStyles>
    );
};

export default PostFeatureItem;
