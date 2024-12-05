import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, CommonModule],
  template: `
    <div class="hero-section">
      <div class="hero-content">
        <h1 class="animate-slide-down">Votre Pharmacie en Ligne</h1>
        <p class="animate-fade-in">Des médicaments de qualité livrés chez vous</p>
        <a routerLink="/medications" class="cta-button animate-bounce">Découvrir nos produits</a>
      </div>
    </div>

    <section class="features">
      <h2 class="section-title">Nos Services</h2>
      <div class="feature-grid">
        <div class="feature-card animate-fade-in">
          <img src="assets/delivery.png" alt="Livraison rapide" class="feature-icon">
          <h3>Livraison Rapide</h3>
          <p>Livraison à domicile sous 24h</p>
        </div>
        <div class="feature-card animate-fade-in">
          <img src="assets/security.png" alt="Sécurité" class="feature-icon">
          <h3>100% Sécurisé</h3>
          <p>Paiement sécurisé et données protégées</p>
        </div>
        <div class="feature-card animate-fade-in">
          <img src="assets/support.png" alt="Support" class="feature-icon">
          <h3>Support 24/7</h3>
          <p>Une équipe à votre écoute</p>
        </div>
      </div>
    </section>

    <section class="trending">
      <h2 class="section-title">Produits Populaires</h2>
      <div class="product-grid">
        <div *ngFor="let product of trendingProducts" class="product-card animate-fade-in">
          <img [src]="product.image" [alt]="product.name" class="product-image">
          <h3>{{product.name}}</h3>
          <p class="price">{{product.price}}€</p>
          <a routerLink="/medications" class="shop-button">Acheter</a>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .hero-section {
      height: 80vh;
      background: linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('/assets/pharmacy-hero.jpg');
      background-size: cover;
      background-position: center;
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      color: white;
    }

    .hero-content {
      max-width: 800px;
      padding: 2rem;
    }

    .hero-content h1 {
      font-size: 3.5rem;
      margin-bottom: 1rem;
    }

    .hero-content p {
      font-size: 1.5rem;
      margin-bottom: 2rem;
    }

    .cta-button {
      display: inline-block;
      padding: 1rem 2rem;
      background: #4CAF50;
      color: white;
      text-decoration: none;
      border-radius: 30px;
      font-size: 1.2rem;
      transition: transform 0.3s ease;
    }

    .cta-button:hover {
      transform: translateY(-3px);
    }

    .features {
      padding: 4rem 2rem;
      background: #f9f9f9;
    }

    .section-title {
      text-align: center;
      margin-bottom: 3rem;
      font-size: 2.5rem;
      color: #333;
    }

    .feature-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 2rem;
      max-width: 1200px;
      margin: 0 auto;
    }

    .feature-card {
      background: white;
      padding: 2rem;
      border-radius: 10px;
      text-align: center;
      box-shadow: 0 4px 6px rgba(0,0,0,0.1);
      transition: transform 0.3s ease;
    }

    .feature-card:hover {
      transform: translateY(-10px);
    }

    .feature-icon {
      width: 80px;
      height: 80px;
      margin-bottom: 1rem;
    }

    .trending {
      padding: 4rem 2rem;
    }

    .product-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 2rem;
      max-width: 1200px;
      margin: 0 auto;
    }

    .product-card {
      background: white;
      border-radius: 10px;
      overflow: hidden;
      box-shadow: 0 4px 6px rgba(0,0,0,0.1);
      transition: transform 0.3s ease;
    }

    .product-card:hover {
      transform: translateY(-5px);
    }

    .product-image {
      width: 100%;
      height: 200px;
      object-fit: cover;
    }

    .product-card h3 {
      padding: 1rem;
      margin: 0;
    }

    .price {
      padding: 0 1rem;
      color: #4CAF50;
      font-weight: bold;
      font-size: 1.2rem;
    }

    .shop-button {
      display: block;
      padding: 0.8rem;
      background: #4CAF50;
      color: white;
      text-decoration: none;
      text-align: center;
      margin: 1rem;
      border-radius: 5px;
    }

    @keyframes slideDown {
      from { transform: translateY(-50px); opacity: 0; }
      to { transform: translateY(0); opacity: 1; }
    }

    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }

    @keyframes bounce {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-10px); }
    }

    .animate-slide-down {
      animation: slideDown 1s ease-out;
    }

    .animate-fade-in {
      animation: fadeIn 1s ease-out;
    }

    .animate-bounce {
      animation: bounce 2s infinite;
    }
  `]
})
export class HomeComponent {
  trendingProducts = [
    {
      name: 'Paracétamol 1000mg',
      price: 5.99,
      image: '/assets/paracetamol.jpg'
    },
    {
      name: 'Vitamine C',
      price: 12.99,
      image: '/assets/vitaminc.jpg'
    },
    {
      name: 'Aspirine',
      price: 6.99,
      image: '/assets/aspirin.jpg'
    },
    {
      name: 'Omega 3',
      price: 15.99,
      image: '/assets/omega3.jpg'
    }
  ];
}