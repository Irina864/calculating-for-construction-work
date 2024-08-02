import { useContext } from 'react';
import { costStoreContext } from '../../store/dataCostsStore';
import { costAttestation } from '../../_variables';
import { observer } from 'mobx-react-lite';
import './Cost.css';

function Cost() {
  const costs = useContext(costStoreContext).cost;
  const getInspection = costs.inspection !== 0;
  const getCertification = costs.certification !== 0;
  const getAttestation = costs.attestation !== 0;

  return (
    <div className="cost" id={useContext(costStoreContext).print.printCost}>
      <h2 className="cost__title">
        Примерный расчет стоимости проведения процедур, рубли
      </h2>
      <div className="cost__warning">
        ВСЕ РАСЧЕТЫ являются ОРИЕНТИРОВОЧНЫМИ!!!
      </div>
      <div className="cost__wrap">
        <div className="cost__box">
          <div className="cost__name">
            Документы, которые необходимы для выполнения выбранных работ
          </div>
          <div className="cost__value">{costs.procedure}</div>
        </div>
        <div className="cost__box">
          <div className="cost__name">Выбранные документы для получения</div>
          <div className="cost__value">{costs.selectedProcedure}</div>
        </div>
        {useContext(costStoreContext).isVisible ? (
          <>
            <div className="cost__box">
              <div className="cost__name">
                Стоимость комплекса услуг по консультации и подготовке к
                процедурам (общая с учетом скидки)
              </div>
              <div className="cost__value">{costs.services}</div>
            </div>
            <div className="cost__box">
              <div className="cost__name">
                Подключение к&nbsp;
                <a
                  href="https://stn.by/info/stroydoc_online/shop"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  ИПС "Стродокумент" (мин. срок 3 мес.)
                </a>
              </div>
              <div className="cost__value">{costs.access}</div>
            </div>
            <div className="cost__box">
              <div className="cost__name">
                Заказ&nbsp;
                <a
                  href="https://tehkarta.by/index_ips.php?v=20240320"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  технологических карт
                </a>
              </div>
              <div className="cost__value">{costs.tehCards}</div>
            </div>
            <div className="cost__box">
              <div className="cost__name">Покупка средств измерений</div>
              <div className="cost__value">
                {costs.devices}
                {costs.rentedDevices.length !== 0
                  ? ` (в аренду ${costs.rentedDevices})`
                  : null}
              </div>
            </div>
            <h3 className="cost__subtitle">Пошлины</h3>
            {getInspection ? (
              <div className="cost__box">
                <div className="cost__name">
                  Освидетельствование системы производственного контроля
                </div>
                <div className="cost__value">{costs.inspection}</div>
              </div>
            ) : null}
            {getCertification ? (
              <div className="cost__box">
                <div className="cost__name">Сертификация работ</div>
                <div className="cost__value">{costs.certification}</div>
              </div>
            ) : null}
            {getAttestation ? (
              <div className="cost__box">
                <div className="cost__name">
                  Аттестация ЮЛ ({costAttestation.audit} р/1 аттестат)
                </div>
                <div className="cost__value">{costs.attestation}</div>
              </div>
            ) : null}
            <h3 className="cost__subtitle final">ИТОГО</h3>
            <div className="cost__box">
              <div className="cost__name final__name">
                ИТОГО (за все процедуры)
              </div>
              <div className="cost__value final__value">
                {costs.services +
                  costs.access +
                  costs.tehCards +
                  costs.devices +
                  costs.inspection +
                  costs.certification +
                  costs.attestation}
              </div>
            </div>
          </>
        ) : (
          <div className="cost__box">
            Невозможно произвести расчет, поскольку выбранные документы не
            совпадают с необходимыми для данных видов работ
          </div>
        )}
      </div>
    </div>
  );
}

export default observer(Cost);
