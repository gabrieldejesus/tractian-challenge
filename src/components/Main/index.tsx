import { useState } from 'react';

// components
import Container from '@/components/Container';
import Wrapper from '@/components/Wrapper';
import Table from '@/components/Table';
import Modal from '@/components/Modal';
import List from '@/components/List';

// utils
import { useDefault } from '@/contexts/DefaultContext';
import styles from './styles.module.css';

export default function Main() {
  const { companies, units } = useDefault();
  const [showModal, setShowModal] = useState(false);

  const handlingTest = async () => {
    console.log('test');
    setShowModal(true);
  };

  return (
    <main className={styles.main}>
      <Container className={styles.container}>
        <section className={styles.section}>
          <Wrapper title="Assets" handlingOptions={handlingTest}>
            Assets
          </Wrapper>

          <Wrapper title="Users" handlingOptions={handlingTest}>
            <Table />
          </Wrapper>
        </section>

        <aside className={styles.aside}>
          <Wrapper title="Companies" handlingOptions={handlingTest}>
            <List companies={companies} />
          </Wrapper>

          <Wrapper title="Units" handlingOptions={handlingTest}>
            <List units={units} />
          </Wrapper>

          <Wrapper title="Work Orders" handlingOptions={handlingTest}>
            Work Orders
          </Wrapper>
        </aside>
      </Container>

      {showModal && <Modal setShowModal={setShowModal} />}
    </main>
  );
}
