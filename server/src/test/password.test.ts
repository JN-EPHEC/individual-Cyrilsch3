import { validatePassword } from "../utils/password.js";

describe("Password Validator - White Box Testing", () => {
  
  // --- TESTS DE STRUCTURE (LONGUEUR) ---
  it("devrait rejeter un mot de passe vide", () => {
    expect(validatePassword("", 25)).toBe(false); // Branch 1
  });

  it("devrait rejeter un mot de passe < 8 caractères", () => {
    expect(validatePassword("Ab1!", 25)).toBe(false); // Branch 2
  });

  it("devrait rejeter un mot de passe > 20 caractères", () => {
    expect(validatePassword("A".repeat(21), 25)).toBe(false); // Branch 3
  });

  // --- TESTS ENFANT (< 12 ans) ---
  it("devrait rejeter un mdp enfant sans minuscule", () => {
    expect(validatePassword("12345678!", 10)).toBe(false); // Branch 4
  });

  it("devrait valider un mdp enfant simple", () => {
    expect(validatePassword("abc12345", 10)).toBe(true); // Succès enfant
  });

  // --- TESTS ADULTE (12 - 64 ans) ---
  it("devrait rejeter un mdp adulte sans majuscule, minuscule ou chiffre", () => {
    // Teste la branche complexe 5
    expect(validatePassword("12345678!", 25)).toBe(false); 
  });

  it("devrait rejeter un mdp adulte sans caractère spécial", () => {
    expect(validatePassword("Password123", 25)).toBe(false); // Branch 6
  });

  it("devrait valider un mdp adulte complet", () => {
    expect(validatePassword("ValidPass123!", 25)).toBe(true); // Succès adulte
  });

  it("devrait rejeter un senior sans majuscule ET sans chiffre", () => {
    expect(validatePassword("password!", 70)).toBe(false); 
  });

  it("devrait valider un senior avec juste une majuscule", () => {
    expect(validatePassword("Password", 70)).toBe(true); 
  });
});