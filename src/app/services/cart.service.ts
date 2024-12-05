import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CartItem } from '../models/cart-item.model';
import { Medication } from '../models/medication.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: CartItem[] = [];
  private cartSubject = new BehaviorSubject<CartItem[]>([]);
  private totalSubject = new BehaviorSubject<number>(0);

  cart$ = this.cartSubject.asObservable();
  total$ = this.totalSubject.asObservable();

  addToCart(medication: Medication): void {
    const existingItem = this.cartItems.find(item => item.id === medication.id);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      this.cartItems.push({
        id: medication.id,
        name: medication.name,
        price: medication.price,
        quantity: 1,
        imageUrl: medication.imageUrl
      });
    }

    this.updateCart();
  }

  removeFromCart(itemId: number): void {
    this.cartItems = this.cartItems.filter(item => item.id !== itemId);
    this.updateCart();
  }

  updateQuantity(itemId: number, quantity: number): void {
    const item = this.cartItems.find(item => item.id === itemId);
    if (item) {
      item.quantity = quantity;
      if (item.quantity <= 0) {
        this.removeFromCart(itemId);
      } else {
        this.updateCart();
      }
    }
  }

  clearCart(): void {
    this.cartItems = [];
    this.updateCart();
  }

  private updateCart(): void {
    this.cartSubject.next([...this.cartItems]);
    this.calculateTotal();
  }

  private calculateTotal(): void {
    const total = this.cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    this.totalSubject.next(total);
  }
}