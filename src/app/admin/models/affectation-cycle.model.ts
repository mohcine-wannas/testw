import { BaseModel } from "app/shared/models/base-model.model";
import { Pays } from "app/shared/models/PAys.model";
import { Ville } from "app/shared/models/ville.model";
import { AffectationNiveau } from "app/admin/models/affectation-niveau.model";
import { GroupeAppellation } from "app/admin/models/groupe-appellation.model";

export class AffectationCycle extends BaseModel {

    groupeAppellation: GroupeAppellation;
    classeNominationType: string;
    affectationNiveaux: AffectationNiveau[];

    constructor(values: Object = {}) {
        super(values);
        Object.assign(this, values)
      }
  }