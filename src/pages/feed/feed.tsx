import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import {
  feedsSelector,
  getFeedsThunk,
  isLoadingSelector
} from '../../slices/feedSlice';

export const Feed: FC = () => {
  const dispatch = useDispatch();
  const orders: TOrder[] = useSelector(feedsSelector);
  const isLoading = useSelector(isLoadingSelector);

  useEffect(() => {
    handleRefresh();
  }, []);

  const handleRefresh = () => {
    dispatch(getFeedsThunk());
  };

  if (!orders.length || isLoading) {
    return <Preloader />;
  }

  return <FeedUI orders={orders} handleGetFeeds={handleRefresh} />;
};
