import { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { workStoreContext } from '../../store/dataWorkStore';
import styles from './Work.module.css';

function Work() {
  const dataCheckedWorks = useContext(workStoreContext).checkedWorks;
  return (
    <div className={styles.info}>
      <h2 className={styles.info__title}>Выбранные виды работ</h2>
      <ol className={styles.info__list}>
        {dataCheckedWorks.map((work, index) => (
          <li key={index} className={styles.info__item}>
            {work.value}
          </li>
        ))}
      </ol>
    </div>
  );
}

export default observer(Work);
