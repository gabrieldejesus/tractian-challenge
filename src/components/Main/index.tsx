import { useState } from 'react';
import Image from 'next/image';
import dynamic from 'next/dynamic';

// components
import ChecklistView from '@/components/ChecklistView';
import UsersTable from '@/components/UsersTable';
import WorkOrders from '@/components/WorkOrders';
import Container from '@/components/Container';
import Companies from '@/components/Companies';
import Wrapper from '@/components/Wrapper';
import Modal from '@/components/Modal';
import Units from '@/components/Units';
const AssetsView = dynamic(() => import('@/components/AssetsView'));

// utils
import { useDefault } from '@/contexts/DefaultContext';
import { WorkOrderProps } from '@/types';
import styles from './styles.module.css';

export default function Main() {
  const [showModal, setShowModal] = useState(false);
  const [workSelected, setWorkSelected] = useState<WorkOrderProps>();
  const { companies, units, workorders, modalSelected } = useDefault();

  return (
    <main className={styles.main}>
      <Container className={styles.container}>
        <section className={styles.section}>
          <Wrapper title="Assets" setShowModal={setShowModal}>
            <AssetsView />
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

                  <button
                    type="button"
                    className={styles.button}
                    onClick={() => setWorkSelected(work)}
                  >
                    <Image src="/note.svg" alt="Note" width={18} height={18} />
                  </button>
                </li>
              ))}
            </ul>

            {!workorders.length && (
              <span className={styles.title}>No work orders found...</span>
            )}

            {workSelected && (
              <ChecklistView
                workSelected={workSelected}
                setWorkSelected={setWorkSelected}
              />
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
          {modalSelected === 'Work Orders' && <WorkOrders />}
        </Modal>
      )}
    </main>
  );
}
