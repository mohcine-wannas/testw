import {BaseModel} from 'app/shared/models/base-model.model';
import {User} from './User.model';

export class AffectationMessageUser extends BaseModel {

  user: User;
  seen = false;

  constructor(values: Object = {}) {
    super(values);
    Object.assign(this, values);
  }
}
