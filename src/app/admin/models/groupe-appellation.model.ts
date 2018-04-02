import { BaseModel } from 'app/shared/models/base-model.model';

export class GroupeAppellation extends BaseModel {

  libelle: String;
  displayName: string;
  appellations: any[];

  constructor(values: Object = {}) {
    super(values);
    Object.assign(this, values);
  }
}
