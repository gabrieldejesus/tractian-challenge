import cn from 'classnames';
import Image from 'next/image';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useForm, SubmitHandler } from 'react-hook-form';

// components
import Spinner from '@/components/Spinner';

// utils
import { CompanyProps } from '@/types';
import { useDefault } from '@/contexts/DefaultContext';
import styles from '@/styles/list.module.css';

type IFormInput = { name: string };

export default function Companies() {
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState<'add' | 'edit'>();
  const { companies, handleCompanies } = useDefault();
  const { register, handleSubmit, resetField } = useForm<IFormInput>();
  const [selectedCompany, setSelectedCompany] = useState<CompanyProps>();

  const handleAddCompany: SubmitHandler<IFormInput> = async (data) => {
    try {
      setLoading(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/companies`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        },
      );

      if (!response.ok) {
        setLoading(false);
        return toast.error('Error adding company');
      }

      const newCompany = await response.json();
      const updatedCompanies = [...companies, newCompany];
      handleCompanies(updatedCompanies);
      setMode(undefined);
      setLoading(false);
      resetField('name');
      return toast.success('New company added successfully');
    } catch (error) {
      setLoading(false);
      return toast.error('Error adding new company');
    }
  };

  const handleFoundCompany = async (id: number) => {
    try {
      setLoading(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/companies/${id}`,
        {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        },
      );

      if (!response.ok) {
        setLoading(false);
        return toast.error('Error found company');
      }

      const data = await response.json();
      setMode('edit');
      setLoading(false);
      return setSelectedCompany(data);
    } catch (error) {
      setLoading(false);
      return toast.error('Error in found company');
    }
  };

  const handleEditCompany: SubmitHandler<IFormInput> = async (data) => {
    try {
      setLoading(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/companies/${selectedCompany?.id}`,
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        },
      );

      if (!response.ok) {
        setLoading(false);
        return toast.error('Error updating company');
      }

      const updatedCompany = await response.json();

      const updatedCompanies = companies.map((company) => {
        if (company.id === selectedCompany?.id)
          return { ...company, ...updatedCompany };
        return company;
      });

      handleCompanies(updatedCompanies);
      setMode(undefined);
      setLoading(false);
      resetField('name');
      return toast.success('Company updated successfully');
    } catch (error) {
      setLoading(false);
      return toast.error('Error updating company');
    }
  };

  const handleDeleteCompany = async (id: number) => {
    try {
      setLoading(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/companies/${id}`,
        {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
        },
      );

      if (!response.ok) {
        setLoading(false);
        return toast.error('Error deleting company');
      }

      const updatedCompanies = companies.filter((company) => company.id !== id);
      handleCompanies(updatedCompanies);
      setLoading(false);
      return toast.success('Company deleted successfully');
    } catch (error) {
      setLoading(false);
      return toast.error('Error deleting company');
    }
  };

  return (
    <>
      {!mode ? (
        <>
          <ul className={styles.list}>
            {companies.map((company, index) => (
              <li key={index} className={styles.item}>
                <span className={styles.name}>{company.name}</span>

                <div className={styles.buttons}>
                  <button
                    type="button"
                    className={styles.edit}
                    onClick={() => handleFoundCompany(company.id)}
                  >
                    <Image src="/edit.svg" alt="Edit" width={24} height={24} />
                  </button>

                  <button
                    type="button"
                    className={styles.delete}
                    onClick={() => handleDeleteCompany(company.id)}
                  >
                    <Image
                      src="/delete.svg"
                      alt="Delete"
                      width={24}
                      height={24}
                    />
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
            onClick={() => setMode('add')}
          >
            New Company
          </button>
        </>
      ) : (
        <>
          {mode === 'add' && (
            <form
              className={styles.form}
              onSubmit={handleSubmit(handleAddCompany)}
            >
              <div className={styles.wrapper}>
                <label htmlFor="name" className={styles.label}>
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  className={styles.input}
                  placeholder="Enter your company name here"
                  {...register('name', { required: true })}
                />
              </div>

              <button
                type="button"
                className={styles.cancel}
                onClick={() => {
                  resetField('name');
                  setMode(undefined);
                }}
              >
                Cancel
              </button>

              <button type="submit" className={cn(styles.new, styles.add)}>
                {!loading ? 'Add Company' : <Spinner />}
              </button>
            </form>
          )}

          {mode === 'edit' && (
            <>
              <form
                className={styles.form}
                onSubmit={handleSubmit(handleEditCompany)}
              >
                <div className={styles.wrapper}>
                  <label htmlFor="name" className={styles.label}>
                    Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    className={styles.input}
                    defaultValue={selectedCompany?.name}
                    placeholder="Enter your company name here"
                    {...register('name', { required: true })}
                  />
                </div>

                <button
                  type="button"
                  className={styles.cancel}
                  onClick={() => {
                    resetField('name');
                    setMode(undefined);
                  }}
                >
                  Cancel
                </button>
                <button type="submit" className={cn(styles.new, styles.save)}>
                  {!loading ? 'Save Company' : <Spinner />}
                </button>
              </form>
            </>
          )}
        </>
      )}
    </>
  );
}
