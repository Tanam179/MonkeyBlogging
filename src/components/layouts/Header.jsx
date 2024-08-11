import styled from 'styled-components';
import Logo from '../logo';
import { NavLink } from 'react-router-dom';
import Button from '../button/Button';
import { useAuth } from '../../contexts/AuthContext';

const HeaderStyles = styled.header`
    background-color: #fff;
    padding: 20px 0;
    .header-main {
        display: flex;
        align-items: center;

        .logo {
            display: block;
            max-width: 50px;
        }

        .menu-list {
            display: flex;
            gap: 30px;
            list-style: none;
            margin-left: 80px;

            .menu-item-link {
                font-size: 18px;
            }
        }

        .search {
            padding: 15px 25px;
            border: 1px solid #ccc;
            border-radius: 8px;
            width: 100%;
            max-width: 320px;
            margin-left: auto;
            display: flex;
            align-items: center;
            position: relative;

            .search-input {
                flex: 1;
                padding-right: 30px;
            }

            .search-icon {
                position: absolute;
                top: 50%;
                right: 20px;
                transform: translateY(-50%);
                display: flex;
                align-items: center;
                justify-content: center;
            }
        }

        .header-button,
        .header-auth {
            margin-left: 20px;
        }

        .header-auth strong {
            color: ${(props) => props.theme.primary};
        }
    }
`;

const menuList = [
    {
        url: '/',
        title: 'Home',
    },
    {
        url: '/blog',
        title: 'Blog',
    },
    {
        url: '/contact',
        title: 'Contact',
    },
];

const Header = () => {
    const { userInfor } = useAuth();
    return (
        <HeaderStyles>
            <div className="container">
                <div className="header-main">
                    <Logo />
                    <nav className="menu">
                        <ul className="menu-list">
                            {menuList.map((item) => (
                                <li className="menu-item" key={item.title}>
                                    <NavLink className="menu-item-link" to={item.url}>
                                        {item.title}
                                    </NavLink>
                                </li>
                            ))}
                        </ul>
                    </nav>
                    <div className="search">
                        <input type="text" className="search-input" placeholder="Search posts..." />
                        <span className="search-icon">
                            <svg
                                width="18"
                                height="17"
                                viewBox="0 0 18 17"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <ellipse
                                    cx="7.66669"
                                    cy="7.05161"
                                    rx="6.66669"
                                    ry="6.05161"
                                    stroke="#999999"
                                    strokeWidth="1.5"
                                />
                                <path
                                    d="M17.0001 15.5237L15.2223 13.9099L14.3334 13.103L12.5557 11.4893"
                                    stroke="#999999"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                />
                                <path
                                    d="M11.6665 12.2964C12.9671 12.1544 13.3706 11.8067 13.4443 10.6826"
                                    stroke="#999999"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                />
                            </svg>
                        </span>
                    </div>
                    {!userInfor ? (
                        <Button variation="primary" to="/login" type="button" className="header-button" height="52px">
                            Login
                        </Button>
                    ) : (
                        <div className="header-auth">
                            <span>
                                Welcome back, <strong>{userInfor?.displayName?.split(' ')?.at(-1) || ''}</strong>
                            </span>
                        </div>
                    )}
                </div>
            </div>
        </HeaderStyles>
    );
};

export default Header;
