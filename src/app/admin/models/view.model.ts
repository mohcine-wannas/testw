import { BaseModel } from 'app/shared/models/base-model.model';
import { User } from './User.model';

export class View extends BaseModel {

  userSeen: User;
  parentsSeen: ViewParent[];
  userNotSeen: User;
  parentsNotSeen: ViewParent[];
  dateSeen: Date;

  constructor(values: Object = {}) {
    super(values);
    Object.assign(this, values);
  }
}

class ViewParent {
  parent: User;
  seen: boolean;
  dateSeen: Date;
}
