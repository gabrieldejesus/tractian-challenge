import { ReactNode } from 'react';
import Image from 'next/image';

import styles from './styles.module.css';

interface WrapperProps {
  title: string;
  handlingOptions: () => void;
  children: ReactNode;
}

export default function Wrapper({
  title,
  handlingOptions,
  children,
}: WrapperProps) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.headline}>
        <h3 className={styles.title}>{title}</h3>
        <button
          type="button"
          className={styles.options}
          onClick={() => handlingOptions()}
        >
          <Image src="/more.svg" alt="More" width={20} height={6} />
        </button>
      </div>
      {children}
    </div>
  );
}
