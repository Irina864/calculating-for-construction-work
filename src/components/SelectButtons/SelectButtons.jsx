import { useContext, useState } from 'react';
import { observer } from 'mobx-react-lite';
import Button from '../Button/Button';
import { costStoreContext } from '../../store/dataCostsStore';
import styles from './SelectButtons.module.css';

function SelectButtons() {
  const cost = useContext(costStoreContext);
  const [activeButton, setActiveButton] = useState(null);
  const [activeSelectButton, setSelectActiveButton] = useState(null);
  const handleButtonClick = (document) => {
    cost.getCost(document);
    cost.getVisible(document);
    setActiveButton(document);
  };
  const getButtonTheme = (nameDoc) => {
    return nameDoc === activeButton
      ? 'procedures__select active'
      : 'procedures__select';
  };
  const handleSelectButtonClick = (nameButton) => {
    setSelectActiveButton(nameButton);
    cost.addToPrintaArea(nameButton);
    console.log(cost.print.printWork);
    console.log(cost.print.printCost);
  };
  const getSelectButtonTheme = (nameButton) => {
    return nameButton === activeSelectButton
      ? 'procedures__select active'
      : 'procedures__select';
  };
  return (
    <div className={styles.procedures}>
      <h3 className={styles.procedures__title}>Область печати</h3>
      <Button
        theme={getSelectButtonTheme('Подбор')}
        nameButton="Подбор"
        onClick={() => handleSelectButtonClick('Подбор')}
      />
      <Button
        theme={getSelectButtonTheme('Расчет')}
        nameButton="Расчет"
        onClick={() => handleSelectButtonClick('Расчет')}
      />
      <Button
        theme={getSelectButtonTheme('Подбор и расчет')}
        nameButton="Подбор и расчет"
        onClick={() => handleSelectButtonClick('Подбор и расчет')}
      />
      <h3 className={styles.procedures__title}>Документы</h3>
      <div className={styles.procedures__buttons}>
        <Button
          theme={getButtonTheme('свидетельство, сертификат, аттестат')}
          nameButton="свидетельство, сертификат, аттестат"
          onClick={() =>
            handleButtonClick('свидетельство, сертификат, аттестат')
          }
        />
        <Button
          theme={getButtonTheme('свидетельство, сертификат')}
          nameButton="свидетельство, сертификат"
          onClick={() => handleButtonClick('свидетельство, сертификат')}
        />
        <Button
          theme={getButtonTheme('свидетельство, аттестат')}
          nameButton="свидетельство, аттестат"
          onClick={() => handleButtonClick('свидетельство, аттестат')}
        />
        <Button
          theme={getButtonTheme('сертификат, аттестат')}
          nameButton="сертификат, аттестат"
          onClick={() => handleButtonClick('сертификат, аттестат')}
        />
        <Button
          theme={getButtonTheme('аттестат')}
          nameButton="аттестат"
          onClick={() => handleButtonClick('аттестат')}
        />
        <Button
          theme={getButtonTheme('сертификат')}
          nameButton="сертификат"
          onClick={() => handleButtonClick('сертификат')}
        />
        <Button
          theme={getButtonTheme('свидетельство')}
          nameButton="свидетельство"
          onClick={() => handleButtonClick('свидетельство')}
        />
      </div>
    </div>
  );
}

export default observer(SelectButtons);
