import { Dispatch, ReactNode, SetStateAction } from 'react';
import Image from 'next/image';

import styles from './styles.module.css';

interface WrapperProps {
  title: string;
  children: ReactNode;
  setShowModal: Dispatch<SetStateAction<boolean>>;
}

// utils
import { useDefault } from '@/contexts/DefaultContext';

export default function Wrapper({
  title,
  children,
  setShowModal,
}: WrapperProps) {
  const { handleModalSelected } = useDefault();

  return (
    <div className={styles.wrapper}>
      <div className={styles.headline}>
        <h3 className={styles.title}>{title}</h3>
        <button
          type="button"
          className={styles.options}
          onClick={() => {
            setShowModal(true);
            handleModalSelected(title);
          }}
        >
          <Image src="/more.svg" alt="More" width={20} height={6} />
        </button>
      </div>
      {children}
    </div>
  );
}
