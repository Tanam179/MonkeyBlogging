/* eslint-disable react/prop-types */
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import DashboardHeader from './DashboardHeader';
import DashboardSideBar from './DashboardSideBar';
import { useAuth } from '../../contexts/AuthContext';
import NotFound from '../../pages/NotFound';

const DashboardStyles = styled.div`
    max-width: 1600px;
    margin: 0 auto;

    .dashboard {
        &-heading {
            font-weight: bold;
            font-size: 36px;
            color: ${(props) => props.theme.primary};
            letter-spacing: 1px;
        }

        &-main {
            display: grid;
            grid-template-columns: 300px minmax(0, 1fr);
            padding: 40px 20px;
            gap: 0 40px;
        }
    }
`;
const DashboardLayout = () => {
    const { userInfor } = useAuth();
    if (!userInfor) return <NotFound></NotFound>;

    return (
        <DashboardStyles>
            <DashboardHeader></DashboardHeader>
            <div className="dashboard-main">
                <DashboardSideBar></DashboardSideBar>
                <div className="dashboard-children">
                    <Outlet></Outlet>
                </div>
            </div>
        </DashboardStyles>
    );
};

export default DashboardLayout;
