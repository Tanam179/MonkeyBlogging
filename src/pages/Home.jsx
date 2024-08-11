import styled from 'styled-components';

import Banner from '../modules/home/Banner';
import Layout from '../components/layouts/Layout';
import HomeFeature from '../modules/home/HomeFeature';
import HomeNewest from '../modules/home/HomeNewest';

const HomeStyles = styled.div``;

const Home = () => {
    return (
        <HomeStyles>
            <Layout>
                <Banner />
                <HomeFeature/>
                <HomeNewest/>
            </Layout>
        </HomeStyles>
    );
};

export default Home;
