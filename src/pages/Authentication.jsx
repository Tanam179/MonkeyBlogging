/* eslint-disable react/prop-types */
import styled from 'styled-components';

const AuthenticationStyles = styled.div`
    height: 100vh;
    padding: 40px;
    box-sizing: border-box;
    
    .logo {
        display: block;
        margin: 0 auto 20px;
    }
    
    .heading {
        text-align: center;
        color: ${(props) => props.theme.primary};
        font-size: 40px;
        font-weight: 600;
        margin-bottom: 40px;
    }
    
    .field {
        display: flex;
        flex-direction: column;
        gap: 10px;
    }
    form {
        width: 100%;
        max-width: 600px;
        margin: 0 auto;
        padding: 0 20px;
    }

    .have-account, .dont-have-account {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        gap: 5px;
        margin-bottom: 20px;
        font-size: 14px;

        a {
            color: ${(props) => props.theme.primary};
        }
    }
`;

const Authentication = ({ children }) => {
    return (
        <AuthenticationStyles>
            <div className="container">
                <img src="/monkey.png" alt="logo" width="100px" className="logo" />
                <h1 className="heading">Monkey Blogging</h1>
                { children }
            </div>
        </AuthenticationStyles>
    );
};

export default Authentication;
