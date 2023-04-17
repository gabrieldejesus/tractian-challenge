import { Dispatch, ReactNode, SetStateAction } from 'react';
import Image from 'next/image';

import styles from './styles.module.css';

export interface ModalProps {
  title: string;
  description: string;
  children?: ReactNode;
  setShowModal: Dispatch<SetStateAction<boolean>>;
}

export default function Modal({
  title,
  children,
  description,
  setShowModal,
}: ModalProps) {
  return (
    <div className={styles.modal} onClick={() => setShowModal(false)}>
      <div className={styles.content} onClick={(e) => e.stopPropagation()}>
        <div>
          <h2 className={styles.title}>{title}</h2>
          <p className={styles.paragraph}>{description}</p>

          <button
            type="button"
            className={styles.close}
            onClick={() => setShowModal(false)}
          >
            <Image src="/close.svg" alt="Close" width={16} height={16} />
          </button>
        </div>

        <div className={styles.body}>{children}</div>
      </div>
    </div>
  );
}
