/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';

// components
import Header from '@/components/Header';
import Main from '@/components/Main';

// utils
import { HomeProps } from '@/types';
import { useDefault } from '@/contexts/DefaultContext';

export default function Home({
  users,
  companies,
  units,
  workorders,
}: HomeProps) {
  const { handleUsers, handleCompanies, handleUnits, handleWorkorders } =
    useDefault();

  useEffect(() => {
    handleUsers(users);
    handleCompanies(companies);
    handleUnits(units);
    handleWorkorders(workorders);
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
  const usersData = await users.json();

  const companies = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/companies`);
  const companiesData = await companies.json();

  const units = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/units`);
  const unitsData = await units.json();

  const workorders = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/workorders`,
  );

  const workordersData = await workorders.json();

  return {
    props: {
      users: usersData,
      companies: companiesData,
      units: unitsData,
      workorders: workordersData,
    },
    revalidate: 300,
  };
}
