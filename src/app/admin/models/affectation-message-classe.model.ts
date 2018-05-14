import {Classe} from 'app/admin/models/groupe-appellation.model.1';
import {BaseModel} from 'app/shared/models/base-model.model';

export class AffectationMessageClasse extends BaseModel {

  classe: Classe;

  constructor(values: Object = {}) {
    super(values);
    Object.assign(this, values);
  }
}
