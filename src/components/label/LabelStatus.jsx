import styled from 'styled-components';
import PropTypes from 'prop-types';

const LabelStatusStyles = styled.span`
    display: inline-block;
    padding: 4px 20px;
    text-align: center;
    border-radius: 100px;
    font-size: 13px;
    font-weight: 600;
`;
/**
 *
 * @param type - "default" "success" "warning" "danger"
 * @returns
 */
const LabelStatus = ({ children, type = 'default' }) => {
    let styleClassName = 'text-gray-500 bg-gray-100';
    switch (type) {
        case 'success':
            styleClassName = 'text-green-500 bg-green-100';
            break;
        case 'warning':
            styleClassName = 'text-[#0369a1] bg-[#e0f2fe]';
            break;
        case 'danger':
            styleClassName = 'text-red-500 bg-red-100';
            break;

        default:
            break;
    }
    return <LabelStatusStyles className={styleClassName}>{children}</LabelStatusStyles>;
};
LabelStatus.propTypes = {
    children: PropTypes.node,
    type: PropTypes.oneOf(['default', 'success', 'warning', 'danger']).isRequired,
};
export default LabelStatus;
