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
            <div className={styles.photo}>
              <Image
                alt="User"
                width={44}
                height={44}
                src="/images/user.jpeg"
              />
            </div>

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
