import { BaseModel } from "app/shared/models/base-model.model";
import { Pays } from "app/shared/models/PAys.model";
import { Ville } from "app/shared/models/ville.model";

export class School extends BaseModel {

    nom: string;
    tel: string;
    email: string;
    adresse: string;
    code: string;
    codeMassar: string;
    siteWeb: string;
    tel2: string;
    ville: Ville;
    pays: Pays;

    constructor(values: Object = {}) {
        super(values);
        Object.assign(this, values)
      }
  }