import { User } from 'app/admin/models/User.model';
import { BaseModel } from 'app/shared/models/base-model.model';

export class Eleve extends User implements BaseModel {


  dateNaissance: Date;
  codeMassar: string;
  observation: string;
  hasToBeEnabled: boolean;
  hasAffectations: boolean;
  enabledAffectations: boolean;



  constructor(values: Object = {}) {
    super(values);
    Object.assign(this, values);
  }
}
