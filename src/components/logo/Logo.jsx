import { Link } from "react-router-dom";

const Logo = () => {
    return (
        <Link to="/">
            <img className="logo" src="/monkey.png" alt="logo" />
        </Link>
    );
};

export default Logo;