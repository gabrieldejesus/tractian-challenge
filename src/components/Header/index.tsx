import Link from 'next/link';
import Image from 'next/image';

// components
import Container from '@/components/Container';

import styles from './styles.module.css';

export default function Header() {
  return (
    <header className={styles.header}>
      <Container className={styles.container}>
        <Link href="/" className={styles.link}>
          <Image
            src="/logo.svg"
            alt="Logo Tractian"
            width={147}
            height={20}
            priority
          />
        </Link>

        <div className={styles.user}>
          <button type="button" className={styles.button}>
            <Image src="/bell.svg" alt="Bell" width={32} height={32} />
          </button>

          <div className={styles.infoUser}>
            <Image
              alt="User"
              width={434}
              height={434}
              src="/images/user.jpeg"
              className={styles.images}
            />

            <div className={styles.info}>
              <span className={styles.name}>Gabriel de Jesus</span>
              <span className={styles.role}>Operator</span>
            </div>
          </div>
        </div>
      </Container>
    </header>
  );
}
