import { FC, SyntheticEvent, useState } from 'react';
import { LoginUI } from '@ui-pages';
import { errorSelector, loginUserThunk } from '../../slices/userSlice/userSlice';
import { useDispatch, useSelector } from '../../services/store';

export const Login: FC = () => {
  const dispatch = useDispatch();
  const error = useSelector(errorSelector);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(
      loginUserThunk({
        email: email,
        password: password
      })
    );
  };

  return (
    <LoginUI
      errorText={error || ''}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};
