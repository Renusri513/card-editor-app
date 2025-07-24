import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Card } from '../models/card.model';

@Injectable({ providedIn: 'root' })
export class CardService {
  private cards = signal<Card[]>([]);

  constructor(private http: HttpClient) {}

  getCards() {
    return this.cards.asReadonly();
  }

  loadCardsFromJson() {
    this.http.get<Card[]>('assets/cards.json').subscribe({
      next: (data) => this.cards.set(data),
      error: (err) => console.error('Failed to load cards.json:', err)
    });
  }

  updateDescription(id: number, newDescription: string) {
    this.cards.update(cards =>
      cards.map(card =>
        card.id === id ? { ...card, description: newDescription } : card
      )
    );
  }
  addCard(title: string, description: string) {
  const newId = this.cards().length > 0 ? Math.max(...this.cards().map(c => c.id)) + 1 : 1;
  const newCard = { id: newId, title, description };
  this.cards.update(cards => [...cards, newCard]);
}

deleteCard(id: number) {
  this.cards.update(cards => cards.filter(card => card.id !== id));
}

}
