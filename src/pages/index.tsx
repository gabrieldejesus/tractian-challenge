/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';

// components
import Header from '@/components/Header';
import Main from '@/components/Main';

// utils
import { HomeProps } from '@/types';
import { useDefault } from '@/contexts/DefaultContext';

export default function Home({ users }: HomeProps) {
  const { handleUsers } = useDefault();

  useEffect(() => {
    handleUsers(users);
  }, []);

  return (
    <>
      <Header />
      <Main />
    </>
  );
}

export async function getStaticProps() {
  const users = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`);
  const userData = await users.json();

  return {
    props: { users: userData },
    revalidate: 300,
  };
}
