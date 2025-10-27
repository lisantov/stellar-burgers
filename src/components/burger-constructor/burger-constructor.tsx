import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI, Preloader } from '@ui';
import { useDispatch, useSelector } from '../../services/store';
import {
  burgerSelector,
  clearOrderData,
  isLoadingSelector,
  orderBurgerThunk,
  orderDataSelector
} from '../../slices/burgerConstructorSlice/burgerConstructorSlice';
import { Navigate, useNavigate } from 'react-router-dom';
import { isInitSelector, userSelector } from '../../slices/userSlice/userSlice';

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  const constructorItems = useSelector(burgerSelector);
  const isInit = useSelector(isInitSelector);
  const user = useSelector(userSelector);
  const navigate = useNavigate();

  const orderRequest = useSelector(isLoadingSelector);

  const orderModalData = useSelector(orderDataSelector);

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;

    if (isInit && !user) {
      return navigate('/login');
    }

    if (constructorItems.bun || !orderRequest) {
      const orderData = constructorItems.ingredients.map((ing) => ing._id);
      orderData.push(constructorItems.bun._id, constructorItems.bun._id);
      dispatch(orderBurgerThunk(orderData));
    }
  };
  const closeOrderModal = () => dispatch(clearOrderData());

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
