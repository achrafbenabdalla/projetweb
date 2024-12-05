import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { CartItem } from '../../models/cart-item.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="container">
      <div class="cart-container">
        <h2 class="cart-title">Mon Panier</h2>
        
        <ng-container *ngIf="isEmpty$ | async; else cartContent">
          <div class="empty-cart">
            <p>Votre panier est vide</p>
            <a routerLink="/medications" class="btn btn-primary">Continuer vos achats</a>
          </div>
        </ng-container>

        <ng-template #cartContent>
          <div class="cart-content">
            <div class="cart-items">
              <div *ngFor="let item of cartItems$ | async" class="cart-item">
                <img [src]="item.imageUrl" [alt]="item.name" class="item-image">
                <div class="item-details">
                  <h3>{{item.name}}</h3>
                  <p class="item-price">{{item.price}}€</p>
                </div>
                <div class="quantity-controls">
                  <button (click)="updateQuantity(item.id, item.quantity - 1)" class="quantity-btn">-</button>
                  <span class="quantity">{{item.quantity}}</span>
                  <button (click)="updateQuantity(item.id, item.quantity + 1)" class="quantity-btn">+</button>
                </div>
                <p class="item-total">{{item.price * item.quantity}}€</p>
                <button (click)="removeItem(item.id)" class="remove-btn">
                  <span class="material-icons">delete</span>
                </button>
              </div>
            </div>

            <div class="cart-summary">
              <h3>Résumé de la commande</h3>
              <div class="summary-row">
                <span>Total</span>
                <span class="total-price">{{total$ | async}}€</span>
              </div>
              <button (click)="checkout()" class="btn btn-primary checkout-btn">
                Procéder au paiement
              </button>
              <button (click)="clearCart()" class="btn btn-secondary clear-btn">
                Vider le panier
              </button>
            </div>
          </div>
        </ng-template>
      </div>
    </div>
  `,
  styles: [`
    .cart-container {
      padding: 2rem;
      margin-top: 2rem;
    }

    .cart-title {
      font-size: 2rem;
      margin-bottom: 2rem;
      color: #333;
    }

    .empty-cart {
      text-align: center;
      padding: 3rem;
      background: white;
      border-radius: 10px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    .empty-cart p {
      font-size: 1.2rem;
      margin-bottom: 1rem;
      color: #666;
    }

    .cart-content {
      display: grid;
      grid-template-columns: 2fr 1fr;
      gap: 2rem;
    }

    .cart-items {
      background: white;
      border-radius: 10px;
      padding: 1rem;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    .cart-item {
      display: grid;
      grid-template-columns: auto 1fr auto auto auto;
      align-items: center;
      gap: 1rem;
      padding: 1rem;
      border-bottom: 1px solid #eee;
    }

    .cart-item:last-child {
      border-bottom: none;
    }

    .item-image {
      width: 80px;
      height: 80px;
      object-fit: cover;
      border-radius: 8px;
    }

    .item-details h3 {
      margin: 0;
      font-size: 1.1rem;
      color: #333;
    }

    .item-price {
      color: #666;
      margin: 0.5rem 0;
    }

    .quantity-controls {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .quantity-btn {
      background: #f0f0f0;
      border: none;
      width: 30px;
      height: 30px;
      border-radius: 50%;
      cursor: pointer;
      transition: background-color 0.3s ease;
    }

    .quantity-btn:hover {
      background: #e0e0e0;
    }

    .quantity {
      font-weight: 500;
      min-width: 30px;
      text-align: center;
    }

    .item-total {
      font-weight: 500;
      color: #4CAF50;
    }

    .remove-btn {
      background: none;
      border: none;
      color: #ff4444;
      cursor: pointer;
      padding: 0.5rem;
      transition: transform 0.3s ease;
    }

    .remove-btn:hover {
      transform: scale(1.1);
    }

    .cart-summary {
      background: white;
      border-radius: 10px;
      padding: 1.5rem;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      height: fit-content;
    }

    .cart-summary h3 {
      margin-bottom: 1rem;
      padding-bottom: 1rem;
      border-bottom: 1px solid #eee;
    }

    .summary-row {
      display: flex;
      justify-content: space-between;
      margin-bottom: 1rem;
      font-size: 1.1rem;
    }

    .total-price {
      font-weight: 600;
      color: #4CAF50;
    }

    .checkout-btn {
      width: 100%;
      margin-bottom: 1rem;
    }

    .clear-btn {
      width: 100%;
      background: #ff4444;
      color: white;
    }

    .clear-btn:hover {
      background: #ff3333;
    }

    @media (max-width: 768px) {
      .cart-content {
        grid-template-columns: 1fr;
      }

      .cart-item {
        grid-template-columns: 1fr;
        text-align: center;
      }

      .item-image {
        margin: 0 auto;
      }
    }
  `]
})
export class CartComponent implements OnInit {
  cartItems$: Observable<CartItem[]>;
  total$: Observable<number>;
  isEmpty$: Observable<boolean>;

  constructor(private cartService: CartService) {
    this.cartItems$ = this.cartService.cart$;
    this.total$ = this.cartService.total$;
    this.isEmpty$ = this.cartItems$.pipe(
      map(items => items.length === 0)
    );
  }

  ngOnInit(): void {}

  updateQuantity(itemId: number, quantity: number): void {
    this.cartService.updateQuantity(itemId, quantity);
  }

  removeItem(itemId: number): void {
    this.cartService.removeFromCart(itemId);
  }

  clearCart(): void {
    this.cartService.clearCart();
  }

  checkout(): void {
    alert('Fonctionnalité de paiement à venir!');
  }
}