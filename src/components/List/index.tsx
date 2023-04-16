import { CompanyProps, UnitProps } from '@/types';

import styles from './styles.module.css';

export interface ListProps {
  companies?: CompanyProps[];
  units?: UnitProps[];
}

export default function List({ companies, units }: ListProps) {
  return (
    <>
      {companies && (
        <ul className={styles.list}>
          {companies?.map((company, index) => (
            <li key={index} className={styles.item}>
              <span className={styles.title}>{company.name}</span>
            </li>
          ))}
        </ul>
      )}

      {units && (
        <ul className={styles.list}>
          {units?.map((unit, index) => (
            <li key={index} className={styles.item}>
              <span className={styles.title}>{unit.name}</span>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
