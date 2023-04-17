import { useState } from 'react';

// components
import Container from '@/components/Container';
import Companies from '@/components/Companies';
import Wrapper from '@/components/Wrapper';
import Table from '@/components/Table';
import Modal from '@/components/Modal';
import List from '@/components/List';

// utils
import { useDefault } from '@/contexts/DefaultContext';
import styles from './styles.module.css';

export default function Main() {
  const { companies, units, modalSelected } = useDefault();
  const [showModal, setShowModal] = useState(false);

  return (
    <main className={styles.main}>
      <Container className={styles.container}>
        <section className={styles.section}>
          <Wrapper title="Assets" setShowModal={setShowModal}>
            Assets
          </Wrapper>

          <Wrapper title="Users" setShowModal={setShowModal}>
            <Table />
          </Wrapper>
        </section>

        <aside className={styles.aside}>
          <Wrapper title="Companies" setShowModal={setShowModal}>
            <List companies={companies} />
          </Wrapper>

          <Wrapper title="Units" setShowModal={setShowModal}>
            <List units={units} />
          </Wrapper>

          <Wrapper title="Work Orders" setShowModal={setShowModal}>
            Work Orders
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
        </Modal>
      )}
    </main>
  );
}
