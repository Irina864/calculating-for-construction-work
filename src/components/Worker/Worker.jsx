import { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { workStoreContext } from '../../store/dataWorkStore';
import { costStoreContext } from '../../store/dataCostsStore';
import styles from './Worker.module.css';

function Worker() {
  const dataCheckedWorks = useContext(workStoreContext).checkedWorks;
  const costCertification = useContext(costStoreContext).cost.certification;
  const getWorkers = costCertification !== 0;
  return getWorkers ? (
    <div className={styles.info}>
      <h2 className={styles.info__title}>Рабочие</h2>
      <ol className={styles.info__list}>
        {dataCheckedWorks.map((work, index) =>
          work.workers !== ''
            ? work.workers.split(',').map((worker, index) => (
                <li key={index} className={styles.info__item}>
                  {worker}
                </li>
              ))
            : null
        )}
      </ol>
    </div>
  ) : null;
}

export default observer(Worker);
