import { calculateShipping } from '../utils/shipping.js';

describe('Shipping Utils - calculateShipping', () => {
  
  // --- TESTS DE RÉUSSITE (CAS NOMINAUX) ---
  
  it('devrait retourner 10€ pour une distance de 10km et un poids de 5kg en standard', () => {
    // Arrange & Act
    const result = calculateShipping(10, 5, 'standard');
    // Assert
    expect(result).toBe(10);
  });

  it('devrait appliquer une majoration de 50% pour un poids entre 10 et 50kg', () => {
    // Cas: 100km (base 25) + 20kg (+50%) = 37.5
    expect(calculateShipping(100, 20, 'standard')).toBe(37.5);
  });

  it('devrait doubler le prix pour une livraison express', () => {
    // Cas: 10km (base 10) + 5kg (0%) * 2 (express) = 20
    expect(calculateShipping(10, 5, 'express')).toBe(20);
  });

  it('devrait coûter 75€ (50 base + 50% poids) pour plus de 500km et 30kg', () => {
    expect(calculateShipping(600, 30, 'standard')).toBe(75);
  });

  // --- TESTS D'ERREURS (EXCEPTIONS) ---

  it('devrait lever une erreur "Invalid distance" pour une distance négative', () => {
    // Pour tester une exception, on passe la fonction dans l'expect sans l'appeler immédiatement
    expect(() => calculateShipping(-1, 5, 'standard')).toThrow("Invalid distance");
  });

  it('devrait lever une erreur "Invalid weight" pour un poids de 0 ou négatif', () => {
    expect(() => calculateShipping(10, 0, 'standard')).toThrow("Invalid weight");
    expect(() => calculateShipping(10, -5, 'standard')).toThrow("Invalid weight");
  });

  it('devrait lever une erreur "Invalid weight" pour un poids supérieur à 50kg', () => {
    expect(() => calculateShipping(10, 51, 'standard')).toThrow("Invalid weight");
  });
});