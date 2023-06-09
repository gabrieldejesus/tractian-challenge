/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';

// components
import Header from '@/components/Header';
import Main from '@/components/Main';

// utils
import { HomeProps } from '@/types';
import { useDefault } from '@/contexts/DefaultContext';

export default function Home({
  assets,
  users,
  companies,
  units,
  workorders,
}: HomeProps) {
  const {
    handleAssets,
    handleUsers,
    handleCompanies,
    handleUnits,
    handleWorkOrders,
  } = useDefault();

  useEffect(() => {
    handleAssets(assets);
    handleUsers(users);
    handleCompanies(companies);
    handleUnits(units);
    handleWorkOrders(workorders);
  }, []);

  return (
    <>
      <Header />
      <Main />
    </>
  );
}

export async function getStaticProps() {
  const assets = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/assets`);
  const assetsData = await assets.json();

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
      assets: assetsData,
      users: usersData,
      companies: companiesData,
      units: unitsData,
      workorders: workordersData,
    },
    revalidate: 300,
  };
}
