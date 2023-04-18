import { Dispatch, SetStateAction } from 'react';
import Image from 'next/image';
import cn from 'classnames';

// utils
import { WorkOrderProps } from '@/types';
import styles from './styles.module.css';

interface ChecklistViewProps {
  workSelected: WorkOrderProps;
  setWorkSelected: Dispatch<SetStateAction<WorkOrderProps | undefined>>;
}

export default function ChecklistView({
  workSelected,
  setWorkSelected,
}: ChecklistViewProps) {
  return (
    <div
      className={styles.checklist}
      onClick={() => setWorkSelected(undefined)}
    >
      <div className={styles.content} onClick={(e) => e.stopPropagation()}>
        <div>
          <h2 className={styles.title}>Checklist</h2>
          <p className={styles.paragraph}>Check here your task list</p>
          <span
            className={cn(
              styles.status,
              workSelected.status === 'in progress' && styles.inProgress,
              workSelected.status === 'completed' && styles.completed,
            )}
          >
            {workSelected.status}
          </span>

          <button
            type="button"
            className={styles.close}
            onClick={() => setWorkSelected(undefined)}
          >
            <Image src="/close.svg" alt="Close" width={16} height={16} />
          </button>
        </div>

        <div className={styles.body}>
          <ul className={styles.list}>
            {workSelected.checklist.map((checklist, index) => (
              <li key={index} className={styles.item}>
                <label htmlFor={`checkbox-${index}`} className={styles.task}>
                  <input
                    id={`checkbox-${index}`}
                    type="checkbox"
                    className={styles.input}
                    defaultChecked={checklist.completed}
                  />
                  <span className={styles.checkmark} />

                  {checklist.task}
                </label>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
