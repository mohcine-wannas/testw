import { BaseModel } from 'app/shared/models/base-model.model';

export class Classe extends BaseModel {

  libelle: String;

  constructor(values: Object = {}) {
    super(values);
    Object.assign(this, values);
  }
}
