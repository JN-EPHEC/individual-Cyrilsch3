import { calculateShipping } from '../utils/shipping.js';

describe('Shipping Utils - Tests Unitaires', () => {

  // --- CATALOGUE DES CAS DE SUCCÈS ---
  // Format : [distance, poids, type, résultat attendu]
  const successCases: [number, number, 'standard' | 'express', number][] = [
    [10, 5, 'standard', 10],    // Cas de base
    [50, 5, 'standard', 10],    // Limite distance basse (incluse)
    [51, 5, 'standard', 25],    // Passage au palier distance moyen
    [500, 5, 'standard', 25],   // Limite distance moyenne (incluse)
    [501, 5, 'standard', 50],   // Passage au palier distance haut
    [10, 9, 'standard', 10],    // Limite poids (pas de majoration)
    [10, 10, 'standard', 15],   // Limite poids (majoration 50% de 10)
    [10, 50, 'standard', 15],   // Limite poids max (incluse)
    [10, 5, 'express', 20],     // Option Express (10 * 2)
    [100, 20, 'express', 75],   // Mix: Base 25 + 50% poids (37.5) * 2 express
  ];

  test.each(successCases)(
    'Succès: dist %ikm, poids %ikg, type %s -> %i€',
    (distance, weight, type, expected) => {
      expect(calculateShipping(distance, weight, type)).toBe(expected);
    }
  );

  // --- CATALOGUE DES CAS D'ERREURS ---
  // Format : [distance, poids, type, message d'erreur]
  const errorCases: [number, number, 'standard' | 'express', string][] = [
    [-1, 5, 'standard', 'Invalid distance'],  // Distance négative
    [10, 0, 'standard', 'Invalid weight'],    // Poids nul
    [10, -5, 'standard', 'Invalid weight'],   // Poids négatif
    [10, 51, 'standard', 'Invalid weight'],   // Poids > 50kg
  ];

  test.each(errorCases)(
    'Erreur: dist %i, poids %i, type %s -> "%s"',
    (distance, weight, type, errorMessage) => {
      expect(() => calculateShipping(distance, weight, type)).toThrow(errorMessage);
    }
  );
});
describe('Shipping Utils - Pairwise Testing (Optimisé)', () => {
  
  // Tableau basé sur la méthode Pairwise (6 scénarios au lieu de 12)
  // [ID, Distance, Poids, Type, Résultat Attendu]
  const pairwiseCases: [number, number, number, 'standard' | 'express', number][] = [
    [1, 10, 5, 'standard', 10],    // D1, W1, T1 : Base 10 + 0% * 1
    [2, 10, 20, 'express', 30],    // D1, W2, T2 : (Base 10 + 50%) * 2 = 30
    [3, 100, 5, 'express', 50],    // D2, W1, T2 : (Base 25 + 0%) * 2 = 50
    [4, 100, 20, 'standard', 37.5],// D2, W2, T1 : (Base 25 + 50%) * 1 = 37.5
    [5, 600, 5, 'express', 100],   // D3, W1, T2 : (Base 50 + 0%) * 2 = 100
    [6, 600, 20, 'standard', 75],  // D3, W2, T1 : (Base 50 + 50%) * 1 = 75
  ];

  test.each(pairwiseCases)(
    'ID %i: Pour %ikm, %ikg et mode %s, le prix doit être %i€',
    (id, distance, weight, type, expected) => {
      expect(calculateShipping(distance, weight, type)).toBe(expected);
    }
  );
});