import { BaseModel } from "app/shared/models/base-model.model";
import { Pays } from "app/shared/models/PAys.model";
import { Ville } from "app/shared/models/ville.model";

export class GroupeAppellation extends BaseModel {

    libelle : String;
    displayName : string;
    appellations : any[];

    constructor(values: Object = {}) {
        super(values);
        Object.assign(this, values)
      }
  }