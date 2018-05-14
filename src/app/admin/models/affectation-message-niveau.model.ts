import {Niveau} from 'app/admin/models/niveau.model';
import {BaseModel} from 'app/shared/models/base-model.model';

export class AffectationMessageNiveau extends BaseModel {

  niveau: Niveau;

  constructor(values: Object = {}) {
    super(values);
    Object.assign(this, values);
  }
}
