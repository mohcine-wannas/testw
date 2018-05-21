import { ClrDatagridComparatorInterface, ClrDatagridStringFilterInterface } from '@clr/angular';
import { AffectationUnite } from '../../../admin/models/affectation-unite.model';
import { Cycle } from '../../../admin/models/cycle.model';
import { User } from '../../../admin/models/User.model';
import { AffectationProf } from './affectation-prof.model';

export class Professeur extends User {
  schoolCode: string;
  cycle: Cycle;
  password: string;
  passwordConfirm: string;
  fullname: string;
  enabled: boolean;
  autoSend: boolean;


  affectationsNiveauClasseProf: AffectationProf[];

  affectationsUniteProf: AffectationUnite[];

  constructor(values: Object = {}) {
    super(values);
    Object.assign(this, values);
  }
}

export class FullNameProfComparator implements ClrDatagridComparatorInterface<Professeur> {
  compare(a: Professeur, b: Professeur): number {
    if (a.fullname < b.fullname) {
      return -1;
    }
    if (a.fullname > b.fullname) {
      return 1;
    }
    return 0;
  }
}

export class PhoneNumberProfComparator implements ClrDatagridComparatorInterface<Professeur> {
  compare(a: Professeur, b: Professeur): number {
    if (a.phoneNumber < b.phoneNumber) {
      return -1;
    }
    if (a.phoneNumber > b.phoneNumber) {
      return 1;
    }
    return 0;
  }
}

export class PhoneNumberProfFilter implements ClrDatagridStringFilterInterface<Professeur> {
  accepts(prof: Professeur, search: string): boolean {
    return '' + prof.phoneNumber === search || prof.phoneNumber.toLowerCase().indexOf(search) >= 0;
  }
}


export class FullNameProfFilter implements ClrDatagridStringFilterInterface<Professeur> {
  accepts(prof: Professeur, search: string): boolean {
    return '' + prof.fullname === search || prof.fullname.toLowerCase().indexOf(search) >= 0;
  }
}
