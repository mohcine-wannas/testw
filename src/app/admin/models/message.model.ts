import { BaseModel} from 'app/shared/models/base-model.model';
import { AffectationMessageNiveau} from './affectation-message-niveau.model';
import { AffectationMessageClasse} from './affectation-message-classe.model';
import { AffectationMessageUser} from './affectation-message-user.model';
import { Unite} from './unite.model';

export class Message extends BaseModel {

  recipients: AffectationMessageUser[];
  message: string;
  unite: Unite;
  niveaux: AffectationMessageNiveau[];
  classes: AffectationMessageClasse[];
  forDate: Date;
  createdOn: Date;

  constructor(values: Object = {}) {
    super(values);
    Object.assign(this, values);
  }
}
