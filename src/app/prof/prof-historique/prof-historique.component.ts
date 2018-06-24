import { Component, OnInit} from '@angular/core';
import { FormBuilder, Validators} from '@angular/forms';
import { Router} from '@angular/router';
import { AffectationCycle} from 'app/admin/models/affectation-cycle.model';
import { AffectationNiveau} from 'app/admin/models/affectation-niveau.model';
import { Eleve} from 'app/admin/models/eleve.model';
import { GroupeAppellation} from 'app/admin/models/groupe-appellation.model';
import { Classe} from 'app/admin/models/groupe-appellation.model.1';
import { AffectationCycleService} from 'app/admin/services/affectation-cycle.service';
import { ClasseService} from 'app/admin/services/classe.service';
import { EleveService} from 'app/admin/services/eleve.service';
import { AlertService} from 'app/shared/services/alert.service';
import { FormComponent} from "../../shared/components/form.component";
import { Message} from "../../admin/models/message.model";
import { CommunicationAdministrationService} from "../../admin/services/communication-administration.service";
import { AffectationMessageClasse} from "../../admin/models/affectation-message-classe.model";
import { Niveau} from "../../admin/models/niveau.model";
import { AffectationMessageNiveau} from "../../admin/models/affectation-message-niveau.model";
import { AffectationMessageUser} from "../../admin/models/affectation-message-user.model";
import {AffectationUniteService} from "../../admin/services/affectation-unite.service";
import {Unite} from "../../admin/models/unite.model";
import {CommunicationProfesseurService} from "../shared/services/communication-professeur.service";
import {ToastyService} from "ng2-toasty";
import {TransferService} from "../shared/services/transfer.service";

@Component({
  selector: 'app-prof-message-parent-form',
  templateUrl: './prof-historique.component.html',
  styleUrls: ['./prof-historique.component.css'],
  // todo: Mohcine
  host: {
    class: 'dox-content-panel',
  }
})
export class ProfHistoriqueComponent implements OnInit {


  messagesNotValid: Message[];
  messagesValid: Message[];

  niveauAppellation: any[];

  constructor(private messageService: CommunicationProfesseurService,
              private affectationCycleService: AffectationCycleService,
              private toastyService: ToastyService,
              private transferService: TransferService,
              private router: Router) {
  }

  ngOnInit() {

    this.messageService.getAllMessagesNotValid().subscribe(
      resp => this.messagesNotValid = resp,
      //error => this.showError(error)
      error => console.log(error) //TODO
    );
    this.messageService.getAllValidMessages().subscribe(
      resp => this.messagesValid = resp,
      //error => this.showError(error)
      error => console.log(error) //TODO
    );

    this.affectationCycleService.getCurrentAffectationCycle().subscribe(
      (resp: AffectationCycle) => {
        this.getNiveauAppellationMap(resp.groupeAppellation);
      },
      error => console.log(error));
  }

  getNiveauAppellationMap(groupeAppellation: GroupeAppellation) {
    if (groupeAppellation && groupeAppellation.appellations) {
      this.niveauAppellation = [];
      groupeAppellation.appellations.forEach(e => {
        this.niveauAppellation[e.niveau.id] = e.libelle;
      });
    }
  }

  getNiveauName(affectationNiveau: AffectationMessageNiveau) {
    return this.niveauAppellation[affectationNiveau.niveau.id];
  }

  deleteMessage(id) {
    return this.messageService.delete(id).subscribe(
      () => {
        this.toastyService.success('Operation effectuée avec succès');
        this.messagesNotValid.splice(this.messagesNotValid.findIndex(item => item.id === id), 1);
      },
      (error) => console.log(error)
    );
  }

  transferMessageValid(id) {
    this.transferService.message = this.messagesValid.filter(e => e.id === id)[0];
    this.router.navigate(['/prof/communication/send-to-parent']);
  }

  transferMessageNotValid(id) {
    this.transferService.message = this.messagesNotValid.filter(e => e.id === id)[0];
    this.router.navigate(['/prof/communication/send-to-parent']);
  }
}
