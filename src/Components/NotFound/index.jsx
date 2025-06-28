// File: NotFound404.jsx
import './NotFound.css'; // Make sure to import the CSS
import { Link } from 'react-router-dom';

const NotFound404 = () => {
    return (
        <div className="notfound-container">
            <div className="notfound-content">
                <h1 className="notfound-title">404</h1>
                <p className="notfound-subtitle">Page Not Found</p>
                <p className="notfound-text">
                    The page you're looking for doesn’t exist or has been moved.
                </p>
                <Link to={'/'} className="notfound-button">Go Home</Link>
            </div>
        </div>
    );
};

export default NotFound404;
