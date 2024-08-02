import { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { workStoreContext } from '../../store/dataWorkStore';
import { costStoreContext } from '../../store/dataCostsStore';
import styles from './MeasureDevices.module.css';

function MeasureDevices() {
  const checkedDevices = useContext(workStoreContext).checkedMeasureDevices;
  const getDevices =
    useContext(costStoreContext).selectedDocument !== 'аттестат';
  return getDevices ? (
    <div className={styles.info}>
      <h2 className={styles.info__title}>Средства измерений</h2>
      <ol className={styles.info__list}>
        {checkedDevices.map((device, index) => (
          <li key={index} className={styles.info__item}>
            {device}
          </li>
        ))}
      </ol>
    </div>
  ) : null;
}

export default observer(MeasureDevices);
