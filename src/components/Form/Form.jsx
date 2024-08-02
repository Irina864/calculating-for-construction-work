import { useContext, useState } from 'react';
import Button from '../Button/Button';
import { observer } from 'mobx-react-lite';
import Input from '../Input/Input';
import { workStoreContext } from '../../store/dataWorkStore';
import styles from './Form.module.css';

function Form({ onSubmit }) {
  const dataWork = useContext(workStoreContext).works;
  const data = useContext(workStoreContext);
  const [submited, setSubmited] = useState(true);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (data.checkedWorks.length !== 0) {
      setSubmited(false);
      onSubmit(data.checkedWorks);
    }
  };
  return (
    <form className={styles.form} name="form" onSubmit={handleSubmit}>
      <ol className={styles.form__list}>
        {dataWork.map((i, index) => (
          <Input key={i.id} id={i.id} index={index} value={i.value} />
        ))}
      </ol>
      {submited ? (
        <Button
          theme="submitform"
          nameButton="Вывести список и расчет"
          type={'submit'}
          onClick={handleSubmit}
        />
      ) : null}
    </form>
  );
}
export default observer(Form);
