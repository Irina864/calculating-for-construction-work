import { makeAutoObservable } from 'mobx';
import { createContext } from 'react';
import data from '../data/construction-works.json';
import measureDevices from '../data/measure-devices.json';
import procedureInformation from '../data/procedure-information.json';
class WorkStore {
  works = [];
  measureDevices = [];
  workInfoDoc = [];
  checkedWorks = [];
  checkedMeasureDevices = [];
  checkedSpecialists = [];
  checkedInfoDoc = {};


  constructor() {
    makeAutoObservable(this);
    this.works = data;
    this.measureDevices = measureDevices;
    this.workInfoDoc = procedureInformation;
  }

  getChecked = (id) => {
    const selectedWork = this.works.find((work) => work.id === id);
    if (selectedWork) {
      this.checkedWorks.push(selectedWork);
    }
  };

  removeWork = (id) => {
    this.checkedWorks = this.checkedWorks.filter((work) => work.id !== id);
  };

  getMeasureDevices = () => {
    this.checkedMeasureDevices = [
      ...new Set(
        this.checkedWorks
          .map((work) => work.devices.split(','))
          .flat()
          .filter((device) => device.trim() !== '')
      ),
    ];
  };

  getSpecialists = () => {
    this.checkedSpecialists = [
      ...new Set(this.checkedWorks.map((work) => work.specialists)),
    ];
  };

  makeInfoList = () => {
    this.checkedInfoDoc = this.workInfoDoc.map((doc) => ({
      title: doc.title,
      text: doc.text.split('. '),
    }));
  };
}

const workStore = new WorkStore();
const workStoreContext = createContext(workStore);

export { workStore, workStoreContext };
