import { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { workStoreContext } from '../../store/dataWorkStore';
import { costStoreContext } from '../../store/dataCostsStore';
import styles from './TechnologicalCard.module.css';

function TechnologicalCard() {
  const dataCheckedWorks = useContext(workStoreContext).checkedWorks;
  const costCertification = useContext(costStoreContext).cost.certification;
  const getCard = costCertification !== 0;
  return getCard ? (
    <div className={styles.info}>
      <h2 className={styles.info__title}>Обязательные технологические карты</h2>
      <ol className={styles.info__list}>
        {dataCheckedWorks.map((work, index) =>
          work.docTC !== '' ? (
            <li key={index} className={styles.info__item}>
              {work.docTC}
            </li>
          ) : null
        )}
      </ol>
      <a
        href="https://tehkarta.by/"
        target="_blank"
        rel="noopener noreferrer"
        className={styles.info__link}
      >
        Все технологические карты приобретаются в Фонде ТТК, утвержденном
        согласно Постановлению Министерства архитектуры и строительства №70
        от 31 июня 2023 г.
      </a>
    </div>
  ) : null;
}
export default observer(TechnologicalCard);
