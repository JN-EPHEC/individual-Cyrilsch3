
export type UserRole = "admin" | "user" | "stagiaire";


export function validateUserRegistration(age: number, role: string, email: string): boolean {
  // 1. Validation du Rôle 
  const validRoles = ["admin", "user", "stagiaire"];
  if (!validRoles.includes(role)) {
    throw new Error("Rôle invalide");
  }

  // 2. Validation de l'Âge
  if (age > 120) {
    throw new Error("Âge invalide");
  }

  // Exception pour les stagiaires
  if (age < 18) {
    if (role === "stagiaire") {
      return true;
    }
    return false;
  }

  // 3. Validation de l'Email
  if (!email.includes("@") || !email.includes(".")) {
    return false;
  }

  return true;
}