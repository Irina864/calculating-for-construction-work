import { useContext } from 'react';
import { workStoreContext } from '../../store/dataWorkStore';
import { observer } from 'mobx-react-lite';
import styles from './CertifiedSpecialist.module.css';

function CertifiedSpecialist() {
  const checkedSpecialists = useContext(workStoreContext).checkedSpecialists;
  return (
    <div className={styles.info}>
      <h2 className={styles.info__title}>
        Квалификационные аттестаты сотрудников при аттестации (основное место
        работы по трудовой книжке!)
      </h2>
      <h3 className={styles.info__subtitle}>Руководители</h3>
      <ol className={styles.info__list}>
        <li className={styles.info__item}>
          главный инженер (общестроительные работы)* **
        </li>
      </ol>
      <h3 className={styles.info__subtitle}>ИТР</h3>
      <ol className={styles.info__list}>
        {checkedSpecialists.map((specialist, index) => (
          <li key={index} className={styles.info__item}>
            {specialist}
          </li>
        ))}
      </ol>
      <p className={styles.info__text}>
        *отдельный сотрудник (иные квалификационные аттестаты не учтут при
        аттестации ЮЛ)
      </p>
      <p className={styles.info__text}>
        **если у руководителя или его заместителя нет:
      </p>
      <ul className={styles.info__text}>
        <li className={styles.info__text}>
          высшего образования в строительстве,
        </li>
        <li className={styles.info__text}>
          стажа 5 лет в области строительства,
        </li>
        <li className={styles.info__text}>
          необходимо принять/перевести на должность
          <b>"заместитель директора - главный инженер"</b>
        </li>
      </ul>
    </div>
  );
}

export default observer(CertifiedSpecialist);
