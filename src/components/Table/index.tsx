import Image from 'next/image';

// utils
import { useDefault } from '@/contexts/DefaultContext';
import styles from './styles.module.css';

export default function Table() {
  const { users } = useDefault();

  return (
    <table>
      <thead className={styles.thead}>
        <tr className={styles.tr}>
          <th className={styles.th}>Nome</th>
          <th className={styles.th}>Email</th>
        </tr>
      </thead>

      <tbody className={styles.tbody}>
        {users.map((user, index) => (
          <tr key={index} className={styles.tr}>
            <td className={styles.td}>
              <div className={styles.info}>
                <Image
                  width={24}
                  height={24}
                  alt="User icon"
                  src="/user-icon.svg"
                />
                <span className={styles.name}>{user.name}</span>
              </div>
            </td>

            <td className={styles.td}>
              <div className={styles.email}>{user.email}</div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
