import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AffectationCycle} from 'app/admin/models/affectation-cycle.model';
import {GroupeAppellation} from 'app/admin/models/groupe-appellation.model';
import {AffectationCycleService} from 'app/admin/services/affectation-cycle.service';
import {AlertService} from 'app/shared/services/alert.service';
import {ToastyService} from 'ng2-toasty';
import {TransferService} from '../../../prof/shared/services/transfer.service';
import {Message} from '../../models/message.model';
import {AffectationMessageNiveau} from '../../models/affectation-message-niveau.model';
import {CommunicationAdministrationService} from "../../services/communication-administration.service";
import {DomSanitizer} from "@angular/platform-browser";
import {View} from "../../models/view.model";

@Component({
  selector: 'app-prof-message-parent-form',
  templateUrl: './admin-historique.component.html',
  styleUrls: ['./admin-historique.component.css'],
  // todo: Mohcine
  host: {
    class: 'dox-content-panel',
  }
})
export class AdminHistoriqueComponent implements OnInit {


  messagesProfToParent: Message[];
  messagesAdminToProf: Message[];
  messagesAdminToParent: Message[];

  niveauAppellation: any[];
  profViewDetails = false;
  parentViewDetails = false;
  viewers: View[] = [];
  notYetViewers: View[] = [];

  constructor(private messageService: CommunicationAdministrationService,
              private affectationCycleService: AffectationCycleService,
              private toastyService: ToastyService,
              private transferService: TransferService,
              private alert: AlertService,
              private router: Router,
              private sanitizer: DomSanitizer) {
  }

  ngOnInit() {

    this.refresh();
    this.affectationCycleService.getCurrentAffectationCycle().subscribe(
      (resp: AffectationCycle) => {
        this.getNiveauAppellationMap(resp.groupeAppellation);
      },
      error => console.log(error));
  }

  private refresh(tab?) {
    if (!tab || tab === 1 ) {
      this.messageService.getAllMessagesProfToParent().subscribe(
        resp => this.messagesProfToParent = resp,
        //error => this.showError(error)
        error => console.log(error) //TODO
      );
    }
    if (!tab || tab === 2 ) {
      this.messageService.getAllMessagesAdminToParent().subscribe(
        resp => this.messagesAdminToParent = resp,
        //error => this.showError(error)
        error => console.log(error) //TODO
      );
    }
    if (!tab || tab === 3 ) {
      this.messageService.getAllMessagesAdminToProf().subscribe(
        resp => this.messagesAdminToProf = resp,
        //error => this.showError(error)
        error => console.log(error) //TODO
      );
    }
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

  deleteMessage(id, tab) {
      if (id) {
        this.alert.confirm('Êtes vous sûr de vouloir supprimer ce message ?').then((res) => {
            if (res.value) {
              return this.messageService.delete(id).subscribe(
                () => {
                  this.toastyService.success('Operation effectuée avec succès');
                  this.refresh(tab);
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

  transferMessageToParent(id) {
    this.transferService.message = this.messagesAdminToParent.filter(e => e.id === id)[0];
    this.router.navigate(['/admin/communication/send-to-parent']);
  }

  transferMessageToProf(id) {
    this.transferService.message = this.messagesAdminToProf.filter(e => e.id === id)[0];
    this.router.navigate(['/admin/communication/send-to-prof']);
  }

  transform(html) {
    //return this.sanitizer.bypassSecurityTrustStyle(html);
    return this.sanitizer.bypassSecurityTrustHtml(html);
    // return this.sanitizer.bypassSecurityTrustScript(html);
    // return this.sanitizer.bypassSecurityTrustUrl(html);
    // return this.sanitizer.bypassSecurityTrustResourceUrl(html);
  }

  showProfViewsDetails(id: number) {
    this.viewers = [];
    this.notYetViewers = [];
    this.messageService.getViewsDetails(id).subscribe(
    (resp) => {
      const views: View[] = resp as View[];
      for (const view of views) {
        if (view.userSeen) {
          this.viewers.push(view);
        } else {
          this.notYetViewers.push(view);
        }
      }
      this.profViewDetails = true;

    },
    error => console.log(error));

  }
  showParentViewsDetails(id: number) {
    this.viewers = [];
    this.notYetViewers = [];
    this.messageService.getViewsDetails(id).subscribe(
      (resp) => {
        const views: View[] = resp as View[];
        for (const view of views) {
          if (view.userSeen) {
            this.viewers.push(view);
          } else {
            this.notYetViewers.push(view);
          }
        }
        this.parentViewDetails = true;
      },
      error => console.log(error));
  }

  toDate(array: number[]) {
     return new Date(array[0], array[1], array[2] - 1, array[3], array[4], array[5]);
  }
}
