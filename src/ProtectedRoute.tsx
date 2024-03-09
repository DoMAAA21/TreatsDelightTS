import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from './hooks';

interface ProtectedRouteProps {
    children: ReactNode;
    allowedRoles?: string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, allowedRoles }) => {
    const { isAuthenticated, user } = useAppSelector(state => state.auth);
    if (!isAuthenticated || !user) {
        return <Navigate to="/restricted" />;
    }

    if (allowedRoles && !allowedRoles.includes(user.role.toLowerCase())) {
        return <Navigate to="/restricted" />;
    }

    return <>{children}</>;
};

export default ProtectedRoute
