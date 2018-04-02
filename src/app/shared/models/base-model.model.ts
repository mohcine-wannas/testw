export class BaseModel {
  id: number;

  // public REST_API_RESOURCE:string = "common";


  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
