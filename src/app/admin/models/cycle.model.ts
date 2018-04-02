import { BaseModel } from 'app/shared/models/base-model.model';

export class Cycle extends BaseModel {

  libelle: string;
  nombreDesNiveaux: number;

  constructor(values: Object = {}) {
    super(values);
    Object.assign(this, values);
  }
}
