import cn from 'classnames';
import Image from 'next/image';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useForm, SubmitHandler } from 'react-hook-form';

// components
import Spinner from '@/components/Spinner';

// utils
import { UnitProps } from '@/types';
import { useDefault } from '@/contexts/DefaultContext';
import styles from '@/components/Companies/styles.module.css';

type IFormInput = { name: string };

export default function Units() {
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState<'add' | 'edit'>();
  const { units, handleUnits } = useDefault();
  const { register, handleSubmit, resetField } = useForm<IFormInput>();
  const [selectedUnit, setSelectedUnit] = useState<UnitProps>();

  const handleAddUnit: SubmitHandler<IFormInput> = async (data) => {
    try {
      setLoading(true);
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/units`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        setLoading(false);
        return toast.error('Error adding unit');
      }

      const newUnit = await response.json();
      const updatedUnits = [...units, newUnit];
      handleUnits(updatedUnits);
      setMode(undefined);
      setLoading(false);
      resetField('name');
      return toast.success('New unit added successfully');
    } catch (error) {
      setLoading(false);
      return toast.error('Error adding new unit');
    }
  };

  const handleFoundUnit = async (id: number) => {
    try {
      setLoading(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/units/${id}`,
        {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        },
      );

      if (!response.ok) {
        setLoading(false);
        return toast.error('Error found unit');
      }

      const data = await response.json();
      setMode('edit');
      setLoading(false);
      return setSelectedUnit(data);
    } catch (error) {
      setLoading(false);
      return toast.error('Error in found unit');
    }
  };

  const handleEditUnit: SubmitHandler<IFormInput> = async (data) => {
    try {
      setLoading(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/units/${selectedUnit?.id}`,
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        },
      );

      if (!response.ok) {
        setLoading(false);
        return toast.error('Error updating unit');
      }

      const updatedUnit = await response.json();

      const updatedUnits = units.map((unit) => {
        if (unit.id === selectedUnit?.id) return { ...unit, ...updatedUnit };
        return unit;
      });

      handleUnits(updatedUnits);
      setMode(undefined);
      setLoading(false);
      resetField('name');
      return toast.success('Unit updated successfully');
    } catch (error) {
      setLoading(false);
      return toast.error('Error updating unit');
    }
  };

  const handleDeleteUnit = async (id: number) => {
    try {
      setLoading(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/units/${id}`,
        {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
        },
      );

      if (!response.ok) {
        setLoading(false);
        return toast.error('Error deleting unit');
      }

      const updatedUnits = units.filter((unit) => unit.id !== id);
      handleUnits(updatedUnits);
      setLoading(false);
      return toast.success('Unity deleted successfully');
    } catch (error) {
      setLoading(false);
      return toast.error('Error deleting unit');
    }
  };

  return (
    <>
      {!mode ? (
        <>
          <ul className={styles.list}>
            {units.map((unit, index) => (
              <li key={index} className={styles.item}>
                <span className={styles.name}>{unit.name}</span>

                <div className={styles.buttons}>
                  <button
                    type="button"
                    className={styles.edit}
                    onClick={() => handleFoundUnit(unit.id)}
                  >
                    <Image src="/edit.svg" alt="Edit" width={24} height={24} />
                  </button>

                  <button
                    type="button"
                    className={styles.delete}
                    onClick={() => handleDeleteUnit(unit.id)}
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

          {!units.length && (
            <span className={styles.name}>No units found...</span>
          )}

          <button
            type="button"
            className={styles.new}
            onClick={() => setMode('add')}
          >
            New Unit
          </button>
        </>
      ) : (
        <>
          {mode === 'add' && (
            <form
              className={styles.form}
              onSubmit={handleSubmit(handleAddUnit)}
            >
              <div className={styles.wrapper}>
                <label htmlFor="name" className={styles.label}>
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  className={styles.input}
                  placeholder="Enter your unit name here"
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
                {!loading ? 'Add Unit' : <Spinner />}
              </button>
            </form>
          )}

          {mode === 'edit' && (
            <>
              <form
                className={styles.form}
                onSubmit={handleSubmit(handleEditUnit)}
              >
                <div className={styles.wrapper}>
                  <label htmlFor="name" className={styles.label}>
                    Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    className={styles.input}
                    defaultValue={selectedUnit?.name}
                    placeholder="Enter your unit name here"
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
                  {!loading ? 'Save Unit' : <Spinner />}
                </button>
              </form>
            </>
          )}
        </>
      )}
    </>
  );
}
