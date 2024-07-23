import { Link } from "react-router-dom";
import styled from "styled-components";

const NotFoundStyles = styled.div`
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 40px;

    .heading {
        font-size: 60px;
        font-weight: 600;
        margin-bottom: 20px;
        text-align: center;
    }

    .back-home-button {
        background-image: linear-gradient(to right bottom, #00a7b4, #a4d96c);
        color: #fff;
        padding: 15px 25px;
        border-radius: 8px;
        display: flex;
        align-items: flex-start;
        gap: 10px;
    }
`


const NotFound = () => {
    return (
        <NotFoundStyles>
            <Link to="/">
                <img srcSet="/monkey.png 2x" alt="logo" />
            </Link>
            <h1 className="heading">Oops! Page not found</h1>
            <Link to="/" className="back-home-button">
                <span>&larr;</span>
                <span>Back to home</span>
            </Link>
        </NotFoundStyles>
    );
};

export default NotFound;