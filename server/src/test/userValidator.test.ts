import { validateUserRegistration } from "../utils/userValidator.js";

describe("User Validator - Black Box & White Box Testing", () => {
  
  it("devrait lever une erreur si le rôle n'est pas admin, user ou stagiaire", () => {
    expect(() => validateUserRegistration(25, "guest", "test@test.be")).toThrow("Rôle invalide");
  });

  it("devrait lever une erreur si l'âge est supérieur à 120", () => {
    expect(() => validateUserRegistration(121, "user", "test@test.be")).toThrow("Âge invalide");
  });

  const testCases: [number, string, string, boolean][] = [
    [17, "stagiaire", "a@b.c", true],   // Mineur ET stagiaire = OK
    [17, "user", "a@b.c", false],        // Mineur ET non-stagiaire = Refus
    [18, "admin", "a@b.c", true],        // Limite majeur = OK
    [25, "user", "invalid-mail", false], // Email sans @ et . = Refus
    [25, "user", "test@nomail", false],  // Email sans . = Refus
    [30, "user", "test.be", false],      // Email sans @ = Refus
    [65, "admin", "boss@corp.be", true]  // Cas senior standard = OK
  ];

  test.each(testCases)(
    "Pour age:%i, role:%s, email:%s -> attendu:%s",
    (age, role, email, expected) => {
      expect(validateUserRegistration(age, role, email)).toBe(expected);
    }
  );
});