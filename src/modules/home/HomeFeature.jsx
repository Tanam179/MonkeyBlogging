import { useEffect, useState } from 'react';
import { collection, limit, onSnapshot, query, where } from 'firebase/firestore';
import styled from 'styled-components';

import PostFeatureItem from '../posts/PostFeatureItem';
import Heading from '../../components/layouts/Heading';
import { db } from '../../firebase/firebaseConfig';

const HomeFeatureStyles = styled.div``;

const HomeFeature = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const colRef = collection(db, 'posts');
        const queries = query(colRef, where('status', '==', 1), where('isFeature', '==', true), limit(4));
        onSnapshot(queries, (snapShot) => {
            const results = [];
            snapShot.forEach(item => {
                results.push({ id: item.id, ...item.data() })
            });
            setPosts(results);
        });

    }, [])


    // if(posts.length < 0) {
    //     return null
    // }

    // console.log(posts);

    return (
        <HomeFeatureStyles className="home-block">
            <div className="container">
                <Heading>Bài viết nổi bật</Heading>
                <div className="grid-layout">
                    { posts && posts.length > 0 && posts.map(post => <PostFeatureItem key={post.id} data={post}/>)}
                </div>
            </div>
        </HomeFeatureStyles>
    );
};

export default HomeFeature;
