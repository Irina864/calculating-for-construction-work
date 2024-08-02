import { useState, useContext } from 'react';
import { observer } from 'mobx-react-lite';
import Cost from '../Cost/Cost';
import Form from '../Form/Form';
import Information from '../Information/Information';
import SelectButtons from '../SelectButtons/SelectButtons';
import { costStoreContext } from '../../store/dataCostsStore';
import { workStoreContext } from '../../store/dataWorkStore';
import './App.css';

function App() {
  const favicon = document.querySelector('link[rel="icon"]');
  document.title = 'Подбор и расчет затрат';
  favicon.href = './public/favicon.ico';
  const dataWork = useContext(workStoreContext);
  const costs = useContext(costStoreContext);
  const [isFormSubmit, setFormSubmit] = useState(false);
  const handleFormSubmit = (checkedData) => {
    if (checkedData.length !== 0) {
      dataWork.getMeasureDevices();
      dataWork.getSpecialists();
      dataWork.makeInfoList();
      costs.getProcedures(
        dataWork.checkedWorks,
        dataWork.checkedMeasureDevices
      );
      costs.getCost('');
      setFormSubmit(true);
    } else {
      setFormSubmit(false);
    }
  };
  return (
    <div className="App">
      <header className="header" id="noprint">
        <h1 className="header__title">
          Подбор и примерный расчет затрат на подготовку и получение разрешений
          в строительстве
        </h1>
      </header>
      <main className="main">
        <section className="condition" id="noprint">
          <Form onSubmit={handleFormSubmit} />
          <SelectButtons />
        </section>
        {isFormSubmit ? (
          <section className="result" id={costs.print.printAll}>
            <Information />
            <Cost />
          </section>
        ) : null}
      </main>
    </div>
  );
}

export default observer(App);
