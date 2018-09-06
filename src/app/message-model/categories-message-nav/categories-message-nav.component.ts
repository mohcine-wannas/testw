import { Component, Input, OnInit } from '@angular/core';
import { AlertService } from '../../shared/services/alert.service';
import { Categorie } from '../shared/models/categorie.model';
import { CategorieService } from '../shared/services/categorie.service';

@Component({
  selector: 'app-categories-message-nav',
  templateUrl: './categories-message-nav.component.html',
  styleUrls: ['./categories-message-nav.component.css'],
})
export class CategoriesMessageNavComponent implements OnInit {

  @Input() profil: string;

  categories: Categorie[];

  constructor(private categorieService: CategorieService,
              private alert: AlertService) {
  }

  ngOnInit() {
    this.categorieService.getAllCategories(this.profil).subscribe(
      resp => {
        this.categories = resp;
      },
      error => this.alert.error(error)
    );
  }

}
