import { useState } from 'react';
import Image from 'next/image';

// components
import UsersTable from '@/components/UsersTable';
import Container from '@/components/Container';
import Companies from '@/components/Companies';
import Wrapper from '@/components/Wrapper';
import Modal from '@/components/Modal';
import Units from '@/components/Units';

// utils
import { useDefault } from '@/contexts/DefaultContext';
import styles from './styles.module.css';

export default function Main() {
  const { companies, units, workorders, modalSelected } = useDefault();
  const [showModal, setShowModal] = useState(false);

  return (
    <main className={styles.main}>
      <Container className={styles.container}>
        <section className={styles.section}>
          <Wrapper title="Assets" setShowModal={setShowModal}>
            Assets
          </Wrapper>

          <Wrapper title="Users" setShowModal={setShowModal}>
            <UsersTable tableMode="view" />
          </Wrapper>
        </section>

        <aside className={styles.aside}>
          <Wrapper title="Companies" setShowModal={setShowModal}>
            {companies && (
              <ul className={styles.list}>
                {companies?.map((company, index) => (
                  <li key={index} className={styles.item}>
                    <span className={styles.title}>{company.name}</span>
                  </li>
                ))}
              </ul>
            )}

            {!companies.length && (
              <span className={styles.title}>No company found...</span>
            )}
          </Wrapper>

          <Wrapper title="Units" setShowModal={setShowModal}>
            <ul className={styles.list}>
              {units?.map((unit, index) => (
                <li key={index} className={styles.item}>
                  <span className={styles.title}>{unit.name}</span>
                </li>
              ))}
            </ul>

            {!units.length && (
              <span className={styles.title}>No unit found...</span>
            )}
          </Wrapper>

          <Wrapper title="Work Orders" setShowModal={setShowModal}>
            <ul className={styles.list}>
              {workorders?.map((work, index) => (
                <li key={index} className={styles.item}>
                  <span className={styles.title}>{work.title}</span>
                  <button type="button" className={styles.button}>
                    <Image src="/note.svg" alt="Note" width={18} height={18} />
                  </button>
                </li>
              ))}
            </ul>

            {!workorders.length && (
              <span className={styles.title}>No work orders found...</span>
            )}
          </Wrapper>
        </aside>
      </Container>

      {showModal && (
        <Modal
          title={modalSelected}
          setShowModal={setShowModal}
          description={`Add, edit or delete one of your ${modalSelected.toLowerCase()}.`}
        >
          {modalSelected === 'Companies' && <Companies />}
          {modalSelected === 'Units' && <Units />}
          {modalSelected === 'Users' && <UsersTable tableMode="admin" />}
        </Modal>
      )}
    </main>
  );
}
