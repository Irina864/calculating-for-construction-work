import { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { workStoreContext } from '../../store/dataWorkStore';
import styles from './Input.module.css';

function Input({ id, value }) {
  const data = useContext(workStoreContext);
  const handleCheckedInputs = (e) => {
    e.target.checked
      ? data.getChecked(e.target.value)
      : data.removeWork(e.target.value);
  };
  return (
    <div className={styles.work__box}>
      <input
        name="work"
        className={styles.work__checkbox}
        type="checkbox"
        value={id}
        onChange={handleCheckedInputs}
      />
      <li className={styles.work__item}>{value}</li>
    </div>
  );
}

export default observer(Input);
