import Image from 'next/image';
import cn from 'classnames';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useForm, SubmitHandler } from 'react-hook-form';

// components
import Spinner from '@/components/Spinner';

// utils
import { UserProps } from '@/types';
import { useDefault } from '@/contexts/DefaultContext';
import styles from './styles.module.css';

type UsersTableProps = { tableMode: 'view' | 'admin' };
type IFormInput = { name: string; email: string };

export default function UsersTable({ tableMode }: UsersTableProps) {
  const { users, handleUsers } = useDefault();
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState<'add' | 'edit'>();
  const [selectedUser, setSelectedUser] = useState<UserProps>();
  const { register, handleSubmit, resetField } = useForm<IFormInput>();

  const handleAddUser: SubmitHandler<IFormInput> = async (data) => {
    try {
      setLoading(true);
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        setLoading(false);
        return toast.error('Error adding user');
      }

      const newUser = await response.json();
      const updatedUsers = [...users, newUser];
      handleUsers(updatedUsers);
      setMode(undefined);
      setLoading(false);
      resetField('name');
      resetField('email');
      return toast.success('New user added successfully');
    } catch (error) {
      setLoading(false);
      return toast.error('Error adding new user');
    }
  };

  const handleFoundUser = async (id: number) => {
    try {
      setLoading(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/users/${id}`,
        {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        },
      );

      if (!response.ok) {
        setLoading(false);
        return toast.error('Error found user');
      }

      const data = await response.json();
      setMode('edit');
      setLoading(false);
      return setSelectedUser(data);
    } catch (error) {
      setLoading(false);
      return toast.error('Error in found user');
    }
  };

  const handleEditUser: SubmitHandler<IFormInput> = async (data) => {
    try {
      setLoading(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/users/${selectedUser?.id}`,
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        },
      );

      if (!response.ok) {
        setLoading(false);
        return toast.error('Error updating user');
      }

      const updatedUser = await response.json();

      const updatedUsers = users.map((user) => {
        if (user.id === selectedUser?.id) return { ...user, ...updatedUser };
        return user;
      });

      handleUsers(updatedUsers);
      setMode(undefined);
      setLoading(false);
      resetField('name');
      resetField('email');
      return toast.success('User updated successfully');
    } catch (error) {
      setLoading(false);
      return toast.error('Error updating user');
    }
  };

  const handleDeleteUser = async (id: number) => {
    try {
      setLoading(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/users/${id}`,
        {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
        },
      );

      if (!response.ok) {
        setLoading(false);
        return toast.error('Error deleting user');
      }

      const updatedUsers = users.filter((user) => user.id !== id);
      handleUsers(updatedUsers);
      setLoading(false);
      return toast.success('User deleted successfully');
    } catch (error) {
      setLoading(false);
      return toast.error('Error deleting user');
    }
  };

  return (
    <>
      {!mode ? (
        <>
          <table>
            <thead className={styles.thead}>
              <tr className={styles.tr}>
                <th className={styles.th}>Nome</th>
                <th className={styles.th}>Email</th>
                {tableMode === 'admin' && (
                  <td className={styles.th}>Actions</td>
                )}
              </tr>
            </thead>

            <tbody className={styles.tbody}>
              {users.map((user, index) => (
                <tr key={index} className={styles.tr}>
                  <td className={styles.td}>
                    <div className={styles.info}>
                      <Image
                        width={24}
                        height={24}
                        alt="User icon"
                        src="/user-icon.svg"
                      />
                      <span className={styles.name}>{user.name}</span>
                    </div>
                  </td>

                  <td className={styles.td}>
                    <div className={styles.email}>{user.email}</div>
                  </td>

                  {tableMode === 'admin' && (
                    <td className={styles.td}>
                      <div className={styles.buttons}>
                        <button
                          type="button"
                          className={styles.edit}
                          onClick={() => handleFoundUser(user.id)}
                        >
                          <Image
                            src="/edit.svg"
                            alt="Edit"
                            width={24}
                            height={24}
                          />
                        </button>

                        <button
                          type="button"
                          className={styles.delete}
                          onClick={() => handleDeleteUser(user.id)}
                        >
                          <Image
                            src="/delete.svg"
                            alt="Delete"
                            width={24}
                            height={24}
                          />
                        </button>
                      </div>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>

          {tableMode === 'admin' && (
            <button
              type="button"
              className={styles.new}
              onClick={() => setMode('add')}
            >
              New User
            </button>
          )}
        </>
      ) : (
        <>
          {mode === 'add' && (
            <form
              className={styles.form}
              onSubmit={handleSubmit(handleAddUser)}
            >
              <div className={styles.wrapper}>
                <label htmlFor="name" className={styles.label}>
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  className={styles.input}
                  placeholder="Enter your user name here"
                  {...register('name', { required: true })}
                />
              </div>

              <div className={styles.wrapper}>
                <label htmlFor="email" className={styles.label}>
                  E-mail
                </label>
                <input
                  id="email"
                  type="email"
                  className={styles.input}
                  placeholder="Enter your user email here"
                  {...register('email', { required: true })}
                />
              </div>

              <button
                type="button"
                className={styles.cancel}
                onClick={() => {
                  resetField('name');
                  resetField('email');
                  setMode(undefined);
                }}
              >
                Cancel
              </button>

              <button type="submit" className={cn(styles.new, styles.add)}>
                {!loading ? 'Add User' : <Spinner />}
              </button>
            </form>
          )}

          {mode === 'edit' && (
            <>
              <form
                className={styles.form}
                onSubmit={handleSubmit(handleEditUser)}
              >
                <div className={styles.wrapper}>
                  <label htmlFor="name" className={styles.label}>
                    Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    className={styles.input}
                    defaultValue={selectedUser?.name}
                    placeholder="Enter your user name here"
                    {...register('name', { required: true })}
                  />
                </div>

                <div className={styles.wrapper}>
                  <label htmlFor="email" className={styles.label}>
                    E-mail
                  </label>
                  <input
                    id="email"
                    type="email"
                    className={styles.input}
                    defaultValue={selectedUser?.email}
                    placeholder="Enter your user email here"
                    {...register('email', { required: true })}
                  />
                </div>

                <button
                  type="button"
                  className={styles.cancel}
                  onClick={() => {
                    resetField('name');
                    resetField('email');
                    setMode(undefined);
                  }}
                >
                  Cancel
                </button>
                <button type="submit" className={cn(styles.new, styles.save)}>
                  {!loading ? 'Save User' : <Spinner />}
                </button>
              </form>
            </>
          )}
        </>
      )}
    </>
  );
}
