import { BaseModel } from 'app/shared/models/base-model.model';

export class Pays extends BaseModel {

  name: string;
  code: String;

  constructor(values: Object = {}) {
    super();
    Object.assign(this, values);
  }
}
