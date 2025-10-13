import { FC } from 'react';
import { TLayoutUIProps } from './type';

import styles from './layout.module.css';

export const LayoutUI: FC<TLayoutUIProps> = ({ title, children }) => (
  <div className={styles.layout}>
    <h3 className={styles.layout_title}>{title}</h3>
    {children}
  </div>
);
