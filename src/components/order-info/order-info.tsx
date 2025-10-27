import { FC, useEffect, useMemo } from 'react';
import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { TIngredient, TOrder } from '@utils-types';
import { useDispatch, useSelector } from '../../services/store';
import { ingredientsSelector } from '../../slices/ingredientsSlice/ingredientsSlice';
import { useLocation, useParams } from 'react-router-dom';
import {
  feedByNumberSelector,
  getFeedsThunk,
  isInitSelector as feedsInitSelector
} from '../../slices/feedSlice/feedSlice';
import {
  getOrdersThunk,
  isInitSelector as orderInitSelector,
  orderByNumberSelector
} from '../../slices/ordersSlice/ordersSlice';
import { NotFound404 } from '@pages';

export const OrderInfo: FC = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const location = useLocation();

  const handleProfileOrder = () =>
    useSelector((state) =>
      orderByNumberSelector(state)(Number(params.number!))
    );

  const handleFeedOrder = () =>
    useSelector((state) => feedByNumberSelector(state)(Number(params.number!)));

  const isCurrentOrdersInit = location.pathname.includes('profile')
    ? useSelector(orderInitSelector)
    : useSelector(feedsInitSelector);

  const orderData = location.pathname.includes('profile')
    ? handleProfileOrder()
    : handleFeedOrder();

  const ingredients: TIngredient[] = useSelector(ingredientsSelector);

  useEffect(() => {
    if (location.pathname.includes('profile')) dispatch(getOrdersThunk());
    else if (location.pathname.includes('feed')) dispatch(getFeedsThunk());
  }, []);

  /* Готовим данные для отображения */
  const orderInfo = useMemo(() => {
    if (!orderData || !ingredients.length) return null;

    const date = new Date(orderData.createdAt);

    type TIngredientsWithCount = {
      [key: string]: TIngredient & { count: number };
    };

    const ingredientsInfo = orderData.ingredients.reduce(
      (acc: TIngredientsWithCount, item) => {
        if (!acc[item]) {
          const ingredient = ingredients.find((ing) => ing._id === item);
          if (ingredient) {
            acc[item] = {
              ...ingredient,
              count: 1
            };
          }
        } else {
          acc[item].count++;
        }

        return acc;
      },
      {}
    );

    const total = Object.values(ingredientsInfo).reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );

    return {
      ...orderData,
      ingredientsInfo,
      date,
      total
    };
  }, [orderData, ingredients]);

  // Если в адресе страницы находится номер несуществующего заказа, то показываем ошибку
  if (!orderData && isCurrentOrdersInit) return <NotFound404 />;

  if (!orderInfo) {
    return <Preloader />;
  }

  return <OrderInfoUI orderInfo={orderInfo} />;
};
