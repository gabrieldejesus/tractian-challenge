import cn from 'classnames';
import { ReactNode } from 'react';

import styles from './styles.module.css';

interface ContainerProps {
  children: ReactNode;
  className?: string;
}

export default function Container({
  children,
  className,
  ...rest
}: ContainerProps) {
  return (
    <div className={cn(styles.container, className)} {...rest}>
      {children}
    </div>
  );
}
