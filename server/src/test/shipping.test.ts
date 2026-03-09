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