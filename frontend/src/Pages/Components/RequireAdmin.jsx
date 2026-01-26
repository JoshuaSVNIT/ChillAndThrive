import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const RequireAdmin = () => {
    const { auth } = useAuth();
    const location = useLocation();

    // Joshua's Admin Code is 5150
    const ADMIN_CODE = 5150;

    // Check if the roles array contains 5150
    const isAdmin = auth?.roles?.includes(ADMIN_CODE);

    return (
        isAdmin
            ? <Outlet /> 
            : auth?.user
                ? <Navigate to="/unauthorized" state={{ from: location }} replace />
                : <Navigate to="/login" state={{ from: location }} replace />
    );
}

export default RequireAdmin;