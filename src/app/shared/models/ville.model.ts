import { BaseModel } from 'app/shared/models/base-model.model';
import { Pays } from 'app/shared/models/Pays.model';

export class Ville extends BaseModel {

  libelle: string;
  pays: Pays;

  constructor(values: Object = {}) {
    super();
    Object.assign(this, values);
  }
}
