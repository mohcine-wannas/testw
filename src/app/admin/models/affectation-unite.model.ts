import { BaseModel } from 'app/shared/models/base-model.model';
import { AffectationCycle } from './affectation-cycle.model';
import { Unite } from './unite.model';

export class AffectationUnite extends BaseModel {

  unite: Unite;
  enabled: boolean;

  constructor(values: Object = {}) {
    super(values);
    Object.assign(this, values);
  }
}
