import { Dispatch, SetStateAction } from 'react';
import Image from 'next/image';

import styles from './styles.module.css';

import { ChecklistProps } from '@/types';

interface ChecklistViewProps {
  checklistSelected: ChecklistProps[];
  setChecklistSelected: Dispatch<SetStateAction<ChecklistProps[] | undefined>>;
}

export default function ChecklistView({
  checklistSelected,
  setChecklistSelected,
}: ChecklistViewProps) {
  return (
    <div
      className={styles.checklist}
      onClick={() => setChecklistSelected(undefined)}
    >
      <div className={styles.content} onClick={(e) => e.stopPropagation()}>
        <div>
          <h2 className={styles.title}>Checklist</h2>
          <p className={styles.paragraph}>Check here your task list</p>

          <button
            type="button"
            className={styles.close}
            onClick={() => setChecklistSelected(undefined)}
          >
            <Image src="/close.svg" alt="Close" width={16} height={16} />
          </button>
        </div>

        <div className={styles.body}>
          <ul className={styles.list}>
            {checklistSelected.map((checklist, index) => (
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
