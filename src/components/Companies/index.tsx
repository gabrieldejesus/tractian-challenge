import Image from 'next/image';

// utils
import { useDefault } from '@/contexts/DefaultContext';
import styles from './styles.module.css';

export default function Companies() {
  const { companies } = useDefault();

  return (
    <>
      <ul className={styles.list}>
        {companies.map((company, index) => (
          <li key={index} className={styles.item}>
            <span className={styles.name}>{company.name}</span>

            <div className={styles.buttons}>
              <button type="button" className={styles.edit}>
                <Image src="/edit.svg" alt="Edit" width={24} height={24} />
              </button>

              <button type="button" className={styles.delete}>
                <Image src="/delete.svg" alt="Delete" width={24} height={24} />
              </button>
            </div>
          </li>
        ))}
      </ul>

      <button type="button" className={styles.new}>
        New Company
      </button>
    </>
  );
}
