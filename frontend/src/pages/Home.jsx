import { Link } from "react-router-dom";


function Home() {
    return (
        <div>
            <h1>Welcome to the App</h1>
            <nav>
                <div>
                    <Link to="/login">Login</Link>
                </div>
                <div>
                    <Link to="/register">Register</Link>
                </div>
            </nav>
        </div>
    );
};

export default Home