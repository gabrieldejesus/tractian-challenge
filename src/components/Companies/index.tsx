import Image from 'next/image';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

// utils
import { CompanyProps } from '@/types';
import { useDefault } from '@/contexts/DefaultContext';
import styles from './styles.module.css';

export default function Companies() {
  const { companies, handleCompanies } = useDefault();

  const handleAddCompany = async () => {
    console.log('add');
  };

  const handleEditCompany = async (id: number) => {
    console.log(id);
  };

  const handleDeleteCompany = async (id: number) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/companies/${id}`,
        {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
        },
      );

      if (!response.ok) {
        return toast.error('Error deleting company');
      }

      const updatedCompanies = companies.filter((company) => company.id !== id);
      handleCompanies(updatedCompanies);
      return toast.success('Company deleted successfully');
    } catch (error) {
      return toast.error('Error deleting company');
    }
  };

  return (
    <>
      <ul className={styles.list}>
        {companies.map((company, index) => (
          <li key={index} className={styles.item}>
            <span className={styles.name}>{company.name}</span>

            <div className={styles.buttons}>
              <button
                type="button"
                className={styles.edit}
                onClick={() => handleEditCompany(company.id)}
              >
                <Image src="/edit.svg" alt="Edit" width={24} height={24} />
              </button>

              <button
                type="button"
                className={styles.delete}
                onClick={() => handleDeleteCompany(company.id)}
              >
                <Image src="/delete.svg" alt="Delete" width={24} height={24} />
              </button>
            </div>
          </li>
        ))}
      </ul>

      {!companies.length && (
        <span className={styles.name}>No company found...</span>
      )}

      <button
        type="button"
        className={styles.new}
        onClick={() => handleAddCompany()}
      >
        New Company
      </button>
    </>
  );
}
