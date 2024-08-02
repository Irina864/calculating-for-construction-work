import { useContext } from 'react';
import { costStoreContext } from '../../store/dataCostsStore';
import CertifiedSpecialist from '../CertifiedSpecialist/CertifiedSpecialist';
import DocInformation from '../DocInformation/DocInformation';
import MeasureDevices from '../MeasureDevices/MeasureDevices';
import TechnologicalCard from '../TechnologicalCard/TechnologicalCard';
import Work from '../Work/Work';
import Worker from '../Worker/Worker';
import './Information.css';

function Information() {
  return (
    <div className="info" id={useContext(costStoreContext).print.printWork}>
      <Work />
      <MeasureDevices />
      <CertifiedSpecialist />
      <Worker />
      <TechnologicalCard />
      <DocInformation />
    </div>
  );
}

export default Information;
