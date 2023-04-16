import { Dispatch, SetStateAction } from 'react';
import styles from './styles.module.css';

type ModalProps = { setShowModal: Dispatch<SetStateAction<boolean>> };

export default function Modal({ setShowModal }: ModalProps) {
  return (
    <div className={styles.modal} onClick={() => setShowModal(false)}>
      <div className={styles.content} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>header</div>
        <div className={styles.body}>body</div>
      </div>
    </div>
  );
}
