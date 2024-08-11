import styled from 'styled-components';
import Button from '../../components/button/Button';

const BannerStyles = styled.div`
    min-height: 520px;
    background-image: linear-gradient(to right bottom, #00a7b4, #a4d96c);
    padding: 40px 0;
    margin-bottom: 60px;

    .banner {
        display: flex;
        justify-content: space-between;
        align-items: center;

        &-content {
            max-width: 600px;
            color: #fff;
        }

        &-heading {
            font-size: 36px;
            margin-bottom: 20px;
            font-weight: 600;
        }

        &-desc {
            line-height: 2;
            margin-bottom: 40px;
            font-weight: 400;
            letter-spacing: 1px;
            font-size: 18px;
        }

        a {
            display: inline-block;
        }
    }
`;

const Banner = () => {
    return (
        <BannerStyles>
            <div className="container">
                <div className="banner">
                    <div className="banner-content">
                        <h1 className="banner-heading">Monkey Blogging</h1>
                        <p className="banner-desc">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis, ex architecto error numquam
                            consectetur molestias cum ipsa dolor perferendis quibusdam. Ab soluta quis nulla voluptatem,
                            blanditiis repudiandae ex corporis ipsam?
                        </p>
                        <Button variation="secondary" to="/login" type='button' >Get started</Button>
                    </div>
                    <div className="banner-image">
                        <img src="/Illustration.png" alt=""/>
                    </div>
                </div>
            </div>
        </BannerStyles>
    );
};

export default Banner;
