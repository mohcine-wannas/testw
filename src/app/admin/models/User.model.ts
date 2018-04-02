import { BaseModel } from 'app/shared/models/base-model.model';

export class User extends BaseModel {

  lastname: string;
  firstname: string;
  phoneNumber: string;
  email: string;

  constructor(values: Object = {}) {
    super(values);
    Object.assign(this, values);
  }
}
