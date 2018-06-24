import {BaseModel} from 'app/shared/models/base-model.model';
import {Unite} from "./unite.model";


export class AffectationMessageUnite extends BaseModel {

  unite: Unite;

  constructor(values: Object = {}) {
    super(values);
    Object.assign(this, values);
  }
}
