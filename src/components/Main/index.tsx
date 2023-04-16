// components
import Container from '@/components/Container';
import Wrapper from '@/components/Wrapper';
import Table from '@/components/Table';

// utils
import styles from './styles.module.css';

export default function Main() {
  const handlingTest = async () => {
    console.log('test');
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
            Companies
          </Wrapper>

          <Wrapper title="Units" handlingOptions={handlingTest}>
            Units
          </Wrapper>

          <Wrapper title="Work Orders" handlingOptions={handlingTest}>
            Work Orders
          </Wrapper>
        </aside>
      </Container>
    </main>
  );
}