import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "@hooks/index";
import { selectCurrentToken } from "@state/auth/authSlice";

export default function RequireAuth() {
    const token = useAppSelector(selectCurrentToken);
    const location = useLocation();

    return (
        // temporary solution
        token
            ? <Outlet/>
            : <Navigate to='/login' state={{ from: location }} replace />
    )
}