import cn from 'classnames';
import Image from 'next/image';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useForm, SubmitHandler } from 'react-hook-form';

// components
import Spinner from '@/components/Spinner';

// utils
import { AssetProps } from '@/types';
import { useDefault } from '@/contexts/DefaultContext';
import styles from '@/styles/list.module.css';

type IFormInput = { model: string; name: string };

export default function Assets() {
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState<'add' | 'edit'>();
  const { assets, handleAssets } = useDefault();
  const { register, handleSubmit, resetField } = useForm<IFormInput>();
  const [selectedAsset, setSelectedAsset] = useState<AssetProps>();

  const handleAddAsset: SubmitHandler<IFormInput> = async (data) => {
    try {
      setLoading(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/assets`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        },
      );

      if (!response.ok) {
        setLoading(false);
        return toast.error('Error adding asset');
      }

      const newAsset = await response.json();
      const updatedAssets = [...assets, newAsset];
      handleAssets(updatedAssets);
      setMode(undefined);
      setLoading(false);
      resetField('model');
      resetField('name');
      return toast.success('New asset added successfully');
    } catch (error) {
      setLoading(false);
      return toast.error('Error adding new asset');
    }
  };

  const handleFoundAsset = async (id: number) => {
    try {
      setLoading(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/assets/${id}`,
        {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        },
      );

      if (!response.ok) {
        setLoading(false);
        return toast.error('Error found asset');
      }

      const data = await response.json();
      setMode('edit');
      setLoading(false);
      return setSelectedAsset(data);
    } catch (error) {
      setLoading(false);
      return toast.error('Error in found asset');
    }
  };

  const handleEditAsset: SubmitHandler<IFormInput> = async (data) => {
    try {
      setLoading(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/assets/${selectedAsset?.id}`,
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        },
      );

      if (!response.ok) {
        setLoading(false);
        return toast.error('Error updating asset');
      }

      const updatedAsset = await response.json();

      const updatedAssets = assets.map((asset) => {
        if (asset.id === selectedAsset?.id)
          return { ...asset, ...updatedAsset };
        return asset;
      });

      handleAssets(updatedAssets);
      setMode(undefined);
      setLoading(false);
      resetField('model');
      resetField('name');
      return toast.success('Asset updated successfully');
    } catch (error) {
      setLoading(false);
      return toast.error('Error updating asset');
    }
  };

  const handleDeleteAsset = async (id: number) => {
    try {
      setLoading(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/assets/${id}`,
        {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
        },
      );

      if (!response.ok) {
        setLoading(false);
        return toast.error('Error deleting asset');
      }

      const updatedAssets = assets.filter((asset) => asset.id !== id);
      handleAssets(updatedAssets);
      setLoading(false);
      return toast.success('Asset deleted successfully');
    } catch (error) {
      setLoading(false);
      return toast.error('Error deleting asset');
    }
  };

  return (
    <>
      {!mode ? (
        <>
          <ul className={styles.list}>
            {assets.map((asset, index) => (
              <li key={index} className={styles.item}>
                <span className={styles.name}>
                  {asset.name} ({asset.model})
                </span>

                <div className={styles.buttons}>
                  <button
                    type="button"
                    className={styles.edit}
                    onClick={() => handleFoundAsset(asset.id)}
                  >
                    <Image src="/edit.svg" alt="Edit" width={24} height={24} />
                  </button>

                  <button
                    type="button"
                    className={styles.delete}
                    onClick={() => handleDeleteAsset(asset.id)}
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

          {!assets.length && (
            <span className={styles.name}>No asset found...</span>
          )}

          <button
            type="button"
            className={styles.new}
            onClick={() => setMode('add')}
          >
            New Asset
          </button>
        </>
      ) : (
        <>
          {mode === 'add' && (
            <form
              className={styles.form}
              onSubmit={handleSubmit(handleAddAsset)}
            >
              <div className={styles.wrapper}>
                <label htmlFor="name" className={styles.label}>
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  className={styles.input}
                  placeholder="Enter your asset name here"
                  {...register('name', { required: true })}
                />
              </div>

              <div className={styles.wrapper}>
                <label htmlFor="model" className={styles.label}>
                  Model
                </label>
                <input
                  id="model"
                  type="text"
                  className={styles.input}
                  placeholder="Enter your asset model here"
                  {...register('model', { required: true })}
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
                {!loading ? 'Add Asset' : <Spinner />}
              </button>
            </form>
          )}

          {mode === 'edit' && (
            <>
              <form
                className={styles.form}
                onSubmit={handleSubmit(handleEditAsset)}
              >
                <div className={styles.wrapper}>
                  <label htmlFor="name" className={styles.label}>
                    Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    className={styles.input}
                    defaultValue={selectedAsset?.name}
                    placeholder="Enter your asset name here"
                    {...register('name', { required: true })}
                  />
                </div>

                <div className={styles.wrapper}>
                  <label htmlFor="model" className={styles.label}>
                    Model
                  </label>
                  <input
                    id="model"
                    type="text"
                    className={styles.input}
                    defaultValue={selectedAsset?.model}
                    placeholder="Enter your asset model here"
                    {...register('model', { required: true })}
                  />
                </div>

                <button
                  type="button"
                  className={styles.cancel}
                  onClick={() => {
                    resetField('model');
                    resetField('name');
                    setMode(undefined);
                  }}
                >
                  Cancel
                </button>
                <button type="submit" className={cn(styles.new, styles.save)}>
                  {!loading ? 'Save Asset' : <Spinner />}
                </button>
              </form>
            </>
          )}
        </>
      )}
    </>
  );
}
