import cn from 'classnames';
import Image from 'next/image';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useForm, SubmitHandler } from 'react-hook-form';

// components
import Spinner from '@/components/Spinner';

// utils
import { WorkOrderProps } from '@/types';
import { useDefault } from '@/contexts/DefaultContext';
import styles from '@/styles/list.module.css';

interface IFormInput {
  title: string;
  description: string;
  status: 'in progress' | 'completed';
  priority: 'high' | 'medium' | 'low';
}

export default function WorkOrders() {
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState<'add' | 'edit'>();
  const { workorders, handleWorkOrders } = useDefault();
  const { register, handleSubmit, resetField } = useForm<IFormInput>();
  const [selectedWorkOrder, setSelectedWorkOrder] = useState<WorkOrderProps>();

  const handleAddWorkOrder: SubmitHandler<IFormInput> = async (data) => {
    try {
      setLoading(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/workorders`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        },
      );

      if (!response.ok) {
        setLoading(false);
        return toast.error('Error adding work order');
      }

      const newWorkOrder = await response.json();
      const updatedWorkOrders = [...workorders, newWorkOrder];
      handleWorkOrders(updatedWorkOrders);
      setMode(undefined);
      setLoading(false);
      resetField('title');
      resetField('description');
      resetField('status');
      resetField('priority');
      return toast.success('New work order added successfully');
    } catch (error) {
      setLoading(false);
      return toast.error('Error adding new work order');
    }
  };

  const handleFoundWorkOrders = async (id: number) => {
    try {
      setLoading(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/workorders/${id}`,
        {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        },
      );

      if (!response.ok) {
        setLoading(false);
        return toast.error('Error found work order');
      }

      const data = await response.json();
      setMode('edit');
      setLoading(false);
      return setSelectedWorkOrder(data);
    } catch (error) {
      setLoading(false);
      return toast.error('Error in found work order');
    }
  };

  const handleEditWorkOrder: SubmitHandler<IFormInput> = async (data) => {
    try {
      setLoading(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/workorders/${selectedWorkOrder?.id}`,
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        },
      );

      if (!response.ok) {
        setLoading(false);
        return toast.error('Error adding work order');
      }

      const updatedWorkOrder = await response.json();

      const updatedWorkOrders = workorders.map((work) => {
        if (work.id === selectedWorkOrder?.id)
          return { ...work, ...updatedWorkOrder };
        return work;
      });

      handleWorkOrders(updatedWorkOrders);
      setMode(undefined);
      setLoading(false);
      resetField('title');
      resetField('description');
      resetField('status');
      resetField('priority');
      return toast.success('Work order updated successfully');
    } catch (error) {
      setLoading(false);
      return toast.error('Error updating Work order');
    }
  };

  const handleDeleteWorkOrder = async (id: number) => {
    try {
      setLoading(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/workorders/${id}`,
        {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
        },
      );

      if (!response.ok) {
        setLoading(false);
        return toast.error('Error deleting work order');
      }

      const updatedWorkOrders = workorders.filter((work) => work.id !== id);
      handleWorkOrders(updatedWorkOrders);
      setLoading(false);
      return toast.success('Work order deleted successfully');
    } catch (error) {
      setLoading(false);
      return toast.error('Error deleting work order');
    }
  };

  return (
    <>
      {!mode ? (
        <>
          <ul className={styles.list}>
            {workorders.map((work, index) => (
              <li key={index} className={styles.item}>
                <span className={styles.name}>{work.title}</span>

                <div className={styles.buttons}>
                  <button
                    type="button"
                    className={styles.edit}
                    onClick={() => handleFoundWorkOrders(work.id)}
                  >
                    <Image src="/edit.svg" alt="Edit" width={24} height={24} />
                  </button>

                  <button
                    type="button"
                    className={styles.delete}
                    onClick={() => handleDeleteWorkOrder(work.id)}
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

          {!workorders.length && (
            <span className={styles.name}>No Work Orders found...</span>
          )}

          <button
            type="button"
            className={styles.new}
            onClick={() => setMode('add')}
          >
            New Work Order
          </button>
        </>
      ) : (
        <>
          {mode === 'add' && (
            <form
              className={styles.form}
              onSubmit={handleSubmit(handleAddWorkOrder)}
            >
              <div className={styles.wrapper}>
                <label htmlFor="title" className={styles.label}>
                  Title
                </label>
                <input
                  id="title"
                  type="text"
                  className={styles.input}
                  placeholder="Enter your work order title here"
                  {...register('title', { required: true })}
                />
              </div>

              <div className={styles.wrapper}>
                <label htmlFor="description" className={styles.label}>
                  Description
                </label>
                <textarea
                  id="description"
                  className={styles.textarea}
                  {...register('description', { required: true })}
                  placeholder="Enter your work order description here"
                />
              </div>

              <div className={styles.wrapper}>
                <label htmlFor="status" className={styles.label}>
                  Status
                </label>
                <select
                  id="status"
                  className={styles.select}
                  {...register('status', { required: true })}
                >
                  <option value="in progress" className={styles.option}>
                    In Progress
                  </option>

                  <option value="completed" className={styles.option}>
                    Completed
                  </option>
                </select>
              </div>

              <div className={styles.wrapper}>
                <label htmlFor="priority" className={styles.label}>
                  Priority
                </label>
                <select
                  id="priority"
                  className={styles.select}
                  {...register('priority', { required: true })}
                >
                  <option value="high" className={styles.option}>
                    High
                  </option>
                  <option value="medium" className={styles.option}>
                    Medium
                  </option>
                  <option value="low" className={styles.option}>
                    Low
                  </option>
                </select>
              </div>

              <button
                type="button"
                className={styles.cancel}
                onClick={() => {
                  resetField('title');
                  setMode(undefined);
                }}
              >
                Cancel
              </button>

              <button type="submit" className={cn(styles.new, styles.add)}>
                {!loading ? 'Add Work Order' : <Spinner />}
              </button>
            </form>
          )}

          {mode === 'edit' && (
            <>
              <form
                className={styles.form}
                onSubmit={handleSubmit(handleEditWorkOrder)}
              >
                <div className={styles.wrapper}>
                  <label htmlFor="title" className={styles.label}>
                    Title
                  </label>
                  <input
                    id="title"
                    type="text"
                    className={styles.input}
                    defaultValue={selectedWorkOrder?.title}
                    placeholder="Enter your work order title here"
                    {...register('title', { required: true })}
                  />
                </div>

                <div className={styles.wrapper}>
                  <label htmlFor="description" className={styles.label}>
                    Description
                  </label>
                  <textarea
                    id="description"
                    className={styles.textarea}
                    defaultValue={selectedWorkOrder?.description}
                    {...register('description', { required: true })}
                    placeholder="Enter your work order description here"
                  />
                </div>

                <div className={styles.wrapper}>
                  <label htmlFor="status" className={styles.label}>
                    Status
                  </label>
                  <select
                    id="status"
                    className={styles.select}
                    defaultValue={selectedWorkOrder?.status}
                    {...register('status', { required: true })}
                  >
                    <option value="in progress" className={styles.option}>
                      In Progress
                    </option>

                    <option value="completed" className={styles.option}>
                      Completed
                    </option>
                  </select>
                </div>

                <div className={styles.wrapper}>
                  <label htmlFor="priority" className={styles.label}>
                    Priority
                  </label>
                  <select
                    id="priority"
                    className={styles.select}
                    defaultValue={selectedWorkOrder?.priority}
                    {...register('priority', { required: true })}
                  >
                    <option value="high" className={styles.option}>
                      High
                    </option>
                    <option value="medium" className={styles.option}>
                      Medium
                    </option>
                    <option value="low" className={styles.option}>
                      Low
                    </option>
                  </select>
                </div>

                <button
                  type="button"
                  className={styles.cancel}
                  onClick={() => {
                    resetField('title');
                    resetField('description');
                    resetField('status');
                    resetField('priority');
                    setMode(undefined);
                  }}
                >
                  Cancel
                </button>
                <button type="submit" className={cn(styles.new, styles.save)}>
                  {!loading ? 'Save Work Orders' : <Spinner />}
                </button>
              </form>
            </>
          )}
        </>
      )}
    </>
  );
}
