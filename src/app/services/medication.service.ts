import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Medication } from '../models/medication.model';

@Injectable({
  providedIn: 'root'
})
export class MedicationService {
  private medications: Medication[] = [
    {
      id: 1,
      name: 'Paracétamol',
      type: 'Analgésique',
      description: 'Contre la douleur et la fièvre',
      price: 5.99,
      stock: 100,
      imageUrl: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 2,
      name: 'Amoxicilline',
      type: 'Antibiotique',
      description: 'Antibiotique à large spectre',
      price: 12.99,
      stock: 50,
      imageUrl: 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 3,
      name: 'Ibuprofène',
      type: 'Anti-inflammatoire',
      description: 'Anti-inflammatoire non stéroïdien',
      price: 7.99,
      stock: 75,
      imageUrl: 'https://images.unsplash.com/photo-1550572017-edd951aa6b88?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    }
  ];

  private medicationsSubject = new BehaviorSubject<Medication[]>(this.medications);

  getMedications(): Observable<Medication[]> {
    return this.medicationsSubject.asObservable();
  }

  addMedication(medication: Omit<Medication, 'id'>): void {
    const newMedication = {
      ...medication,
      id: this.medications.length + 1
    };
    this.medications.push(newMedication);
    this.medicationsSubject.next(this.medications);
  }

  deleteMedication(id: number): void {
    this.medications = this.medications.filter(med => med.id !== id);
    this.medicationsSubject.next(this.medications);
  }
}