import { BaseModel } from "app/shared/models/base-model.model";
import { Pays } from "app/shared/models/PAys.model";
import { Ville } from "app/shared/models/ville.model";
import { User } from "app/admin/models/User.model";

export class Eleve extends User implements BaseModel {

    
	dateNaissance : Date;
	codeMassar : string;
    observation: string;
    
    constructor(values: Object = {}) {
        super(values);
        Object.assign(this, values)
      }
  }