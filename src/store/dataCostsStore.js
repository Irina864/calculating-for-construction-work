import { makeAutoObservable } from 'mobx';
import { createContext } from 'react';
import measureDevicesData from '../data/measure-devices.json';
import {
  informationSearchSystem,
  costInspection,
  costCertification,
  costAttestation,
  costTechnologicalCard,
  costService,
} from '../_variables.js';

class CostStore {
  cost = {};
  measureDevices = [];
  checkedProcedure = [];
  costCards = 0;
  costDevices = 0;
  rentedDevices = [];
  amountOfWorks = {};
  selectedDocument = '';
  isVisible = true;
  print = {};

  constructor() {
    makeAutoObservable(this);
    this.cost = {};
    this.measureDevices = measureDevicesData;
    this.checkedProcedure = [];
    this.costCards = 0;
    this.costDevices = 0;
    this.rentedDevices = [];
    this.amountOfWorks = {
      inspection: 0,
      certification: 0,
      attestation: 0,
    };
    this.selectedDocument = '';
    this.print = {
      printWork: '',
      printCost: '',
      printAll: '',
    };
  }

  getProcedures(checkedWorks, checkedDevices) {
    this.checkedProcedure = [
      ...new Set(
        checkedWorks
          .map((procedure) => procedure.docs.split(','))
          .flat()
          .filter((procedure) => procedure.trim() !== '')
      ),
    ];
    this.getCards(checkedWorks, checkedDevices);
    this.getDevices(checkedDevices);
    this.getAmountOfWorks(checkedWorks);
  }

  getAmountOfWorks(checkedWorks) {
    const amountOfProcedures = checkedWorks
      .map((procedure) => procedure.docs.split(','))
      .flat()
      .filter((procedure) => procedure.trim() !== '');
    amountOfProcedures.forEach((procedure) => {
      switch (procedure) {
        case 'свидетельство':
          this.amountOfWorks.inspection++;
          break;
        case 'сертификат':
          this.amountOfWorks.certification++;
          break;
        case 'аттестат':
          this.amountOfWorks.attestation++;
          break;
        default:
          break;
      }
    });
  }

  getCards(checkedWorks) {
    const checkedCardsCost = [];
    const checkedCards = checkedWorks
      .map((work) => (work.docTC !== '' ? work.docTC : null))
      .filter((card) => card !== null);
    checkedCards.forEach((card) => {
      switch (card) {
        case 'Технологическая карта на гидроизоляцию':
          checkedCardsCost.push(costTechnologicalCard.isolation);
          break;
        case 'Технологическая карта на устройство антикоррозионных покрытий':
          checkedCardsCost.push(costTechnologicalCard.anticorrosion);
          break;
        case 'Технологическая карта на устройство дорожных одежд с покрытием из плит тротуарных':
          checkedCardsCost.push(costTechnologicalCard.sidewalk);
          break;
        case 'Технологическая карта на монтаж наружных трубопроводов водоснабжение и канализации':
          checkedCardsCost.push(costTechnologicalCard.externalWaterSupply);
          break;
        case 'Технологическая карта на заполнение оконных и дверных проемов':
          checkedCardsCost.push(costTechnologicalCard.windowAndDoor);
          break;
        default:
          break;
      }
    });
    if (checkedCardsCost.length === 0) {
      checkedCardsCost.push(costTechnologicalCard.averageСost);
    }
    this.costCards = checkedCardsCost.reduce(
      (total, current) => total + current,
      0
    );
  }

  getDevices(checkedDevices) {
    const checkedDevicesCostAndRent = [];
    const checkedDevicesRent = [];

    checkedDevices.forEach((device) => {
      this.measureDevices.forEach((item) => {
        if (device === item.name) {
          checkedDevicesCostAndRent.push({
            nameDevice: item.name,
            cost: item.cost,
            rent: item.rent,
          });
        }
      });
    });
    checkedDevicesCostAndRent.sort((a, b) => b.cost - a.cost);
    const indexForRents = [];
    checkedDevicesCostAndRent.forEach((item, index) => {
      if (item.rent > 0 && indexForRents.length < 4) {
        indexForRents.push(index);
      }
    });
    const checkedDevicesCost = checkedDevicesCostAndRent
      .filter((index) => !indexForRents.includes(index))
      .map((item) => ({ ...item }));
    indexForRents.forEach((item) => {
      checkedDevicesRent.push(checkedDevicesCostAndRent[item]);
    });

    this.costDevices =
      checkedDevicesRent.reduce(
        (acc, device) => acc + parseFloat(device.rent),
        0
      ) +
      checkedDevicesCost.reduce(
        (acc, device) => acc + parseFloat(device.cost),
        0
      );
    this.rentedDevices = checkedDevicesRent
      .map((device) => device.nameDevice)
      .join(', ');
  }

  getVisible(value) {
    switch (this.checkedProcedure.length) {
      case 3:
        this.isVisible = true;
        break;
      case 2:
        value.split(', ').forEach((item) => {
          this.isVisible = this.checkedProcedure.includes(item) ? true : false;
        });
        break;
      case 1:
        value.split(', ').forEach((item) => {
          this.isVisible = this.checkedProcedure.includes(item) ? true : false;
        });
        break;
      default:
        break;
    }
  }

  addToPrintaArea(nameButton) {
    switch (nameButton) {
      case 'Подбор':
        this.print = {
          printWork: 'printarea',
          printCost: 'noprint',
          printAll: '',
        };
        break;
      case 'Расчет':
        this.print = {
          printWork: 'noprint',
          printCost: 'printarea',
          printAll: '',
        };
        break;
      case 'Подбор и расчет':
        this.print = {
          printWork: '',
          printCost: '',
          printAll: 'printarea',
        };
        break;
      default:
        break;
    }
  }

  getCost(value) {
    this.selectedDocument = value;
    this.cost = {
      procedure: this.checkedProcedure.join(', '),
      selectedProcedure: this.checkedProcedure.join(', '),
      services:
        costService.inspection +
        costService.certification +
        costService.attestation -
        costService.discount,
      access: informationSearchSystem,
      tehCards: this.costCards,
      devices: this.costDevices,
      rentedDevices: this.rentedDevices,
      inspection:
        costInspection.audit +
        costInspection.oneWorkMore * (this.amountOfWorks.inspection - 1),
      certification:
        costCertification.audit +
        costCertification.oneWorkMore * (this.amountOfWorks.inspection - 1),
      attestation: costAttestation.audit * costAttestation.count,
    };

    if (this.selectedDocument === 'свидетельство, аттестат') {
      this.cost.services =
        costService.inspection + costService.attestation - costService.discount;
      this.cost.certification = 0;
      this.cost.selectedProcedure = 'свидетельство, аттестат';
    } else {
      if (
        this.checkedProcedure.length === 2 &&
        this.checkedProcedure.includes('свидетельство') &&
        this.checkedProcedure.includes('аттестат')
      ) {
        this.cost.services =
          costService.inspection +
          costService.attestation -
          costService.discount;
        this.cost.certification = 0;
        this.cost.selectedProcedure = 'свидетельство, аттестат';
      }
    }

    if (this.selectedDocument === 'сертификат, аттестат') {
      this.cost.services =
        costService.certification +
        costService.attestation -
        costService.discount;
      this.cost.inspection = 0;
      this.cost.selectedProcedure = 'сертификат, аттестат';
    } else {
      if (
        this.checkedProcedure.length === 2 &&
        this.checkedProcedure.includes('сертификат') &&
        this.checkedProcedure.includes('аттестат')
      ) {
        this.cost.services =
          costService.certification +
          costService.attestation -
          costService.discount;
        this.cost.inspection = 0;
        this.cost.selectedProcedure = 'сертификат, аттестат';
      }
    }

    if (this.selectedDocument === 'свидетельство, сертификат') {
      this.cost.services =
        costService.inspection +
        costService.certification -
        costService.discount;
      this.cost.attestation = 0;
      this.cost.selectedProcedure = 'свидетельство, сертификат';
    } else {
      if (
        this.checkedProcedure.length === 2 &&
        this.checkedProcedure.includes('сертификат') &&
        this.checkedProcedure.includes('свидетельство')
      ) {
        this.cost.services =
          costService.inspection +
          costService.certification -
          costService.discount;
        this.cost.attestation = 0;
        this.cost.selectedProcedure = 'свидетельство, сертификат';
      }
    }

    if (this.selectedDocument === 'свидетельство') {
      this.cost.services = costService.inspection;
      this.cost.certification = 0;
      this.cost.attestation = 0;
      this.cost.selectedProcedure = 'свидетельство';
    } else {
      if (
        this.checkedProcedure.length === 1 &&
        this.checkedProcedure[0] === 'свидетельство'
      ) {
        this.cost.services = costService.inspection;
        this.cost.certification = 0;
        this.cost.attestation = 0;
        this.cost.selectedProcedure = 'свидетельство';
      }
    }

    if (this.selectedDocument === 'сертификат') {
      this.cost.services = costService.certification;
      this.cost.inspection = 0;
      this.cost.attestation = 0;
      this.cost.selectedProcedure = 'сертификат';
    } else {
      if (
        this.checkedProcedure.length === 1 &&
        this.checkedProcedure[0] === 'сертификат'
      ) {
        this.cost.services = costService.certification;
        this.cost.inspection = 0;
        this.cost.attestation = 0;
        this.cost.selectedProcedure = 'сертификат';
      }
    }

    if (this.selectedDocument === 'аттестат') {
      this.cost.services = costService.attestation;
      this.cost.inspection = 0;
      this.cost.certification = 0;
      this.cost.selectedProcedure = 'аттестат';
      this.cost.access = 0;
      this.cost.tehCards = 0;
      this.cost.devices = 0;
      this.cost.rentedDevices = 0;
    } else {
      if (
        this.checkedProcedure.length === 1 &&
        this.checkedProcedure[0] === 'аттестат'
      ) {
        this.cost.services = costService.attestation;
        this.cost.inspection = 0;
        this.cost.certification = 0;
        this.cost.selectedProcedure = 'аттестат';
        this.cost.access = 0;
        this.cost.tehCards = 0;
        this.cost.devices = 0;
        this.cost.rentedDevices = 0;
      }
    }
  }
}

export const costStore = new CostStore();
export const costStoreContext = createContext(costStore);
