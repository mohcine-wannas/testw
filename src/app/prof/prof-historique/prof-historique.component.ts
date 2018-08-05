import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AffectationCycle} from 'app/admin/models/affectation-cycle.model';
import {GroupeAppellation} from 'app/admin/models/groupe-appellation.model';
import {AffectationCycleService} from 'app/admin/services/affectation-cycle.service';
import {AlertService} from 'app/shared/services/alert.service';
import {Message} from "../../admin/models/message.model";
import {AffectationMessageNiveau} from "../../admin/models/affectation-message-niveau.model";
import {CommunicationProfesseurService} from "../shared/services/communication-professeur.service";
import {ToastyService} from "ng2-toasty";
import {TransferService} from "../shared/services/transfer.service";
import {DomSanitizer} from "@angular/platform-browser";

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
  messagesRejected: Message[];

  niveauAppellation: any[];

  constructor(private messageService: CommunicationProfesseurService,
              private affectationCycleService: AffectationCycleService,
              private toastyService: ToastyService,
              private transferService: TransferService,
              private alert: AlertService,
              private router: Router,
              private sanitizer: DomSanitizer) {
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
    this.messageService.getAllRejectedMessages().subscribe(
      resp => this.messagesRejected = resp,
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
      if (id) {
        this.alert.confirm('Êtes vous sûr de vouloir supprimer ce message ?').then((res) => {
            if (res.value) {
              return this.messageService.delete(id).subscribe(
                () => {
                  this.toastyService.success('Operation effectuée avec succès');
                  this.messagesNotValid.splice(this.messagesNotValid.findIndex(item => item.id === id), 1);
                },
                (error) => console.log(error)
              );
            } else if (res.dismiss.toString() === 'cancel') {
            }
          },
          error => this.alert.error()
        );
      }


  }

  transferMessageValid(id) {
    this.transferService.message = this.messagesValid.filter(e => e.id === id)[0];
    this.router.navigate(['/prof/communication/send-to-parent']);
  }

  transferMessageNotValid(id) {
    this.transferService.message = this.messagesNotValid.filter(e => e.id === id)[0];
    this.router.navigate(['/prof/communication/send-to-parent']);
  }

  transform(html) {
    //return this.sanitizer.bypassSecurityTrustStyle(html);
    return this.sanitizer.bypassSecurityTrustHtml(html);
    // return this.sanitizer.bypassSecurityTrustScript(html);
    // return this.sanitizer.bypassSecurityTrustUrl(html);
    // return this.sanitizer.bypassSecurityTrustResourceUrl(html);
  }
}
