import { FC, ReactElement } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from '../../services/store';
import {
  isInitSelector,
  isLoadingSelector,
  userSelector
} from '../../slices/userSlice';
import { Preloader } from '@ui';

interface ProtectedRouteProps {
  children: ReactElement;
  onlyUnAuth?: boolean;
}

export const ProtectedRoute: FC<ProtectedRouteProps> = ({
  children,
  onlyUnAuth = false
}: ProtectedRouteProps) => {
  const isInit = useSelector(isInitSelector);
  const isLoading = useSelector(isLoadingSelector);
  const user = useSelector(userSelector);
  const location = useLocation();

  if (isLoading || !isInit) {
    return <Preloader />;
  }

  if (isInit && !onlyUnAuth && !user) {
    return <Navigate replace to='/login' state={{ from: location }} />;
  }

  if (isInit && onlyUnAuth && user) {
    const from = location.state?.from || { pathname: '/' };
    return <Navigate replace to={from} />;
  }

  return children;
};
