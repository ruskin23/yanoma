import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import NavBar from "../components/NavBar";

const ProtectedRoute = () => {
    const { isLoggedIn } = useAuth();

    if (!isLoggedIn) {
        return <Navigate to='/login' />;
    }

    return (
        <>
            <NavBar />
            <Outlet />
        </>
    );
}

export default ProtectedRoute;