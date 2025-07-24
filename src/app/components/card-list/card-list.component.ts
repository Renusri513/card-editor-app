import { Component, OnInit } from '@angular/core';
import { CardService } from '../../services/card.service';
import { MatDialog } from '@angular/material/dialog';
import { EditCardModalComponent } from '../edit-card-modal/edit-card-modal.component';
import { AddCardModalComponent } from '../add-card-modal/add-card-modal.component';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-card-list',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatDialogModule,
    MatIconModule
  ],
  templateUrl: './card-list.component.html',
  styleUrl: './card-list.component.css'
})
export class CardListComponent implements OnInit {
  cards: any;

  constructor(private cardService: CardService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.cardService.loadCardsFromJson();
    this.cards = this.cardService.getCards();
  }

  openEditDialog(card: any) {
    const dialogRef = this.dialog.open(EditCardModalComponent, {
      width: '400px',
      data: { ...card },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result?.description) {
        this.cardService.updateDescription(card.id, result.description);
      }
    });
  }

  openAddDialog() {
    const dialogRef = this.dialog.open(AddCardModalComponent, {
      width: '400px',
      data: { title: '', description: '' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result?.title && result?.description) {
        this.cardService.addCard(result.title, result.description);
      }
    });
  }

  deleteCard(id: number) {
    this.cardService.deleteCard(id);
  }
}
