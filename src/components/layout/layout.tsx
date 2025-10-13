import { FC, ReactElement } from 'react';
import { TLayoutProps } from './type';
import { LayoutUI } from '../ui/layout';

export const Layout: FC<TLayoutProps> = ({ title, children }) => (
  <LayoutUI title={title}>{children}</LayoutUI>
);
