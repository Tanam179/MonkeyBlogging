import styled from 'styled-components';

import Layout from '../components/layouts/Layout';
import PostImage from '../modules/posts/PostImage';
import PostCategory from '../modules/posts/PostCategory';
import PostMeta from '../modules/posts/PostMeta';
import PostItem from '../modules/posts/PostItem';
import Heading from '../components/layouts/Heading';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';

const PostDetailsPageStyles = styled.div`
    padding-bottom: 100px;
    .post {
        &-blog-post {
            display: flex;
        }
        &-feature {
            width: 100%;
            height: auto;
            margin-bottom: 20px;
            border-radius: 10px;
        }
        &-heading {
            font-weight: bold;
            font-size: 36px;
            margin-bottom: 16px;

            &-block {
                display: flex;
                gap: 20px;
                align-items: center;
                margin-bottom: 15px;
            }
        }
        &-info {
            flex: 1;
        }
        &-content {
            width: 100%;
            text-align: justify;

            ul {
                list-style: disc;
                li {
                    margin-bottom: 10px;
                    padding-left: 40px;
                    margin-left: 0;
                }
            }
        }
    }

    .single-post {
        width: 70%;
    }
    .author {
        margin-top: 40px;
        margin-bottom: 80px;
        display: flex;
        border-radius: 20px;
        background-color: ${(props) => props.theme.grayF3};
        &-image {
            width: 200px;
            height: 200px;
            flex-shrink: 0;
            border-radius: inherit;
        }
        &-image img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-radius: inherit;
        }
        &-content {
            flex: 1;
            padding: 20px;
        }
        &-name {
            font-weight: bold;
            margin-bottom: 10px;
            font-size: 20px;
        }
        &-desc {
            font-size: 14px;
            line-height: 2;
        }
    }
    @media screen and (max-width: 1023.98px) {
        padding-bottom: 40px;
        .post {
            &-header {
                flex-direction: column;
            }
            &-feature {
                height: auto;
            }
            &-heading {
                font-size: 26px;
            }
            &-content {
                margin: 40px 0;
            }
        }
        .author {
            flex-direction: column;
            &-image {
                width: 100%;
                height: auto;
            }
        }
    }
`;

const PostDetails = () => {
    const { slug } = useParams();
    const [post, setPost] = useState({});

    useEffect(() => {
        const getPostDetails = async function () {
            const colRef = collection(db, 'posts');
            const queries = query(colRef, where('slug', '==', slug));
            const querySnapshot = await getDocs(queries);
            querySnapshot.forEach((doc) => {
                setPost(doc.data());
            });
        };

        getPostDetails();
    }, [slug]);
    
    return (
        <PostDetailsPageStyles>
            <Layout>
                <div className="container">
                    <div className="post-blog-post">
                        <article className="single-post">
                            <div className="post-header">
                                <div className="post-info">
                                    <h1 className="post-heading">{post.title}</h1>
                                    <div className="post-heading-block">
                                        <PostCategory>Kiến thức</PostCategory>
                                        <PostMeta date='12-10-2020'></PostMeta>
                                    </div>
                                </div>
                                <PostImage
                                    url="https://images.unsplash.com/photo-1649837867356-6c7ef7057f32?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80"
                                    className="post-feature w-full"
                                ></PostImage>
                            </div>
                            <div className="post-content">
                                <div className="entry-content" dangerouslySetInnerHTML={{ __html: post.content }}></div>
                                <div className="author">
                                    <div className="author-image">
                                        <img
                                            src="https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80"
                                            alt=""
                                        />
                                    </div>
                                    <div className="author-content">
                                        <h3 className="author-name">Evondev</h3>
                                        <p className="author-desc">
                                            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dignissimos non
                                            animi porro voluptates quibusdam optio nulla quis nihil ipsa error delectus
                                            temporibus nesciunt, nam officiis adipisci suscipit voluptate eum totam!
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </article>
                    </div>
                    <div className="post-related">
                        <Heading>Bài viết liên quan</Heading>
                        <div className="grid-layout grid-layout--primary">
                            <PostItem></PostItem>
                            <PostItem></PostItem>
                            <PostItem></PostItem>
                            <PostItem></PostItem>
                        </div>
                    </div>
                </div>
            </Layout>
        </PostDetailsPageStyles>
    );
};

export default PostDetails;
