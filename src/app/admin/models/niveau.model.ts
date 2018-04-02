import { BaseModel } from 'app/shared/models/base-model.model';

export class Niveau extends BaseModel {

  libelle: string;

  constructor(values: Object = {}) {
    super(values);
    Object.assign(this, values);
  }
}
