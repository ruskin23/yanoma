import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const ConditionalDashboard = ({ children }) => {
    const { isLoggedIn } = useAuth();

    if (isLoggedIn) {
        console.log('navigating to dashboard from conditional');
        return <Navigate to="/dashboard" />
    }

    return children
}

export default ConditionalDashboard