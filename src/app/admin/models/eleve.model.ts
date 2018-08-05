import { ClrDatagridComparatorInterface, ClrDatagridStringFilterInterface } from '@clr/angular';
import { User } from 'app/admin/models/User.model';
import { BaseModel } from 'app/shared/models/base-model.model';
import { Professeur } from '../../prof/shared/models/Professeur.model';
import { Classe } from './groupe-appellation.model.1';
import { Niveau } from './niveau.model';

export class Eleve extends User implements BaseModel {


  dateNaissance: Date;
  codeMassar: string;
  observation: string;
  hasToBeEnabled: boolean;
  hasAffectations: boolean;
  enabledAffectations: boolean;
  enabled: boolean;

  affectationParents: AffectationParents[];

  niveau: Niveau;
  classe: Classe;
  etatSante: string;
  remarque: string;

  constructor(values: Object = {}) {
    super(values);
    Object.assign(this, values);
  }
}

export class AffectationParents extends BaseModel {
  parent: User; //TODO use Parent Class;
  enabled: boolean;
  parentingRelationship: string;
}

export class FirstNameEleveComparator implements ClrDatagridComparatorInterface<Eleve> {
  compare(a: Eleve, b: Eleve): number {
    if (a.firstname < b.firstname) {
      return -1;
    }
    if (a.firstname > b.firstname) {
      return 1;
    }
    return 0;
  }
}

export class FirstNameEleveFilter implements ClrDatagridStringFilterInterface<Eleve> {
  accepts(prof: Eleve, search: string): boolean {
    return '' + prof.firstname === search || prof.firstname.toLowerCase().indexOf(search) >= 0;
  }
}


export class LastNameEleveComparator implements ClrDatagridComparatorInterface<Eleve> {
  compare(a: Eleve, b: Eleve): number {
    if (a.lastname < b.lastname) {
      return -1;
    }
    if (a.lastname > b.lastname) {
      return 1;
    }
    return 0;
  }
}

export class LastNameEleveFilter implements ClrDatagridStringFilterInterface<Eleve> {
  accepts(prof: Eleve, search: string): boolean {
    return '' + prof.lastname === search || prof.lastname.toLowerCase().indexOf(search) >= 0;
  }
}


export class CodeMassarEleveComparator implements ClrDatagridComparatorInterface<Eleve> {
  compare(a: Eleve, b: Eleve): number {
    if (a.codeMassar < b.codeMassar) {
      return -1;
    }
    if (a.codeMassar > b.codeMassar) {
      return 1;
    }
    return 0;
  }
}

export class CodeMassarEleveFilter implements ClrDatagridStringFilterInterface<Eleve> {
  accepts(prof: Eleve, search: string): boolean {
    return '' + prof.codeMassar === search || prof.codeMassar.toLowerCase().indexOf(search) >= 0;
  }
}


export class ActiveEleveComparator implements ClrDatagridComparatorInterface<Eleve> {
  compare(a: Eleve, b: Eleve): number {
    if (a.enabled) {
      return 1;
    } else {
      return -1;
    }
  }
}
