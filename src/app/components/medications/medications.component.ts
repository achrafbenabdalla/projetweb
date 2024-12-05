import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MedicationService } from '../../services/medication.service';
import { CartService } from '../../services/cart.service';
import { Medication } from '../../models/medication.model';

@Component({
  selector: 'app-medications',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container" style="margin-top: 80px;">
      <h2>Nos Médicaments</h2>
      
      <div class="medications-grid">
        <div *ngFor="let medication of medications" class="medication-card animate-fade-in">
          <img [src]="medication.imageUrl" [alt]="medication.name" class="medication-image">
          <div class="medication-details">
            <h3>{{ medication.name }}</h3>
            <p class="medication-type">{{ medication.type }}</p>
            <p class="medication-description">{{ medication.description }}</p>
            <div class="medication-footer">
              <p class="medication-price">{{ medication.price }}€</p>
              <button 
                class="btn btn-primary add-to-cart"
                (click)="addToCart(medication)"
                [disabled]="medication.stock <= 0">
                {{ medication.stock > 0 ? 'Ajouter au panier' : 'Rupture de stock' }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .medications-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 2rem;
      padding: 2rem 0;
    }

    .medication-card {
      background: white;
      border-radius: 10px;
      overflow: hidden;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      transition: transform 0.3s ease;
    }

    .medication-card:hover {
      transform: translateY(-5px);
    }

    .medication-image {
      width: 100%;
      height: 200px;
      object-fit: cover;
    }

    .medication-details {
      padding: 1.5rem;
    }

    .medication-type {
      color: #666;
      font-size: 0.9rem;
      margin-bottom: 0.5rem;
    }

    .medication-description {
      color: #333;
      margin-bottom: 1rem;
    }

    .medication-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 1rem;
    }

    .medication-price {
      font-size: 1.2rem;
      font-weight: 600;
      color: #4CAF50;
      margin: 0;
    }

    .add-to-cart {
      padding: 0.5rem 1rem;
    }

    .add-to-cart:disabled {
      background: #ccc;
      cursor: not-allowed;
    }

    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }

    .animate-fade-in {
      animation: fadeIn 0.5s ease-out;
    }
  `]
})
export class MedicationsComponent implements OnInit {
  medications: Medication[] = [];

  constructor(
    private medicationService: MedicationService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.medicationService.getMedications().subscribe(
      medications => this.medications = medications
    );
  }

  addToCart(medication: Medication): void {
    this.cartService.addToCart(medication);
  }
}