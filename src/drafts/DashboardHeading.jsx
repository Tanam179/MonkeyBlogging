/* eslint-disable react/prop-types */

const DashboardHeading = ({ title = '', children}) => {
    return (
        <div className="mb-10 flex items-center justify-between">
            <h1 className="dashboard-heading">{title}</h1>
            {children}
        </div>
    );
};

export default DashboardHeading;
