import { BaseModel } from "app/shared/models/base-model.model";
import { Pays } from "app/shared/models/PAys.model";
import { Ville } from "app/shared/models/ville.model";
import { Niveau } from "app/admin/models/niveau.model";

export class AffectationNiveau extends BaseModel {

    affectationCycle: string;
    nombreDeClasse: string;
    niveau: Niveau;

    constructor(values: Object = {}) {
        super(values);
        Object.assign(this, values)
      }
  }