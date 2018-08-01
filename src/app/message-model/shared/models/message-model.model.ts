import { BaseModel } from 'app/shared/models/base-model.model';
import { Categorie } from './categorie.model';

export class MessageModel extends BaseModel {

  message: string;
  fige: boolean;
  titre: string;
  categorie: Categorie;

  constructor(values: Object = {}) {
    super(values);
    Object.assign(this, values);
  }
}
