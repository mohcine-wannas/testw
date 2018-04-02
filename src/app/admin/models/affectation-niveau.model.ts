import { Classe } from 'app/admin/models/groupe-appellation.model.1';
import { Niveau } from 'app/admin/models/niveau.model';
import { BaseModel } from 'app/shared/models/base-model.model';

export class AffectationNiveau extends BaseModel {

  affectationCycle: string;
  nombreDeClasse: string;
  niveau: Niveau;
  classes: Classe[];

  constructor(values: Object = {}) {
    super(values);
    Object.assign(this, values);
  }
}
