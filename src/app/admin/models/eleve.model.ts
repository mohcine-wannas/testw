import { User } from 'app/admin/models/User.model';
import { BaseModel } from 'app/shared/models/base-model.model';

export class Eleve extends User implements BaseModel {


  dateNaissance: Date;
  codeMassar: string;
  observation: string;
  hasToBeEnabled: boolean;
  hasAffectations: boolean;
  enabledAffectations: boolean;

  affectationParents: AffectationParents[];

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
