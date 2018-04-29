import { BaseModel } from 'app/shared/models/base-model.model';

export class Notification extends BaseModel {

  title: string;
  body: string;
  target: string;
  isSeen: boolean;

  constructor(values: Object = {}) {
    super(values);
    Object.assign(this, values);
  }
}
