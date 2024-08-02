import { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { workStoreContext } from '../../store/dataWorkStore';
import { costStoreContext } from '../../store/dataCostsStore';
import './DocInformation.css';

function DocInformation() {
  const infoDoc = useContext(workStoreContext).checkedInfoDoc;
  const cost = useContext(costStoreContext).cost;
  const getInspection = cost.inspection !== 0;
  const getCertification = cost.certification !== 0;
  const getAttestation = cost.attestation !== 0;
  return (
    <div className="infodoc">
      <h2 className="infodoc__title">Документированная информация</h2>
      {getInspection ? (
        <ol className="infodoc__item">
          <h3 className="infodoc__subtitle">{infoDoc[0].title}</h3>
          {infoDoc[0].text.map((sentence, idx) => (
            <li key={idx} className="infodoc__text">
              {sentence}
            </li>
          ))}
        </ol>
      ) : null}
      {getCertification ? (
        <ol className="infodoc__item">
          <h3 className="infodoc__subtitle">{infoDoc[1].title}</h3>
          {infoDoc[1].text.map((sentence, idx) => (
            <li key={idx} className="infodoc__text">
              {sentence}
            </li>
          ))}
        </ol>
      ) : null}
      {getAttestation ? (
        <ol className="infodoc__item">
          <h3 className="infodoc__subtitle">{infoDoc[2].title}</h3>
          {infoDoc[2].text.map((sentence, idx) => (
            <li key={idx} className="infodoc__text">
              {sentence}
            </li>
          ))}
        </ol>
      ) : null}
    </div>
  );
}
export default observer(DocInformation);
