export default function useAuth() {
  const token = localStorage.getItem("token");
  if (!token) return { logged: false, admin: false, roles: [] };

  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    const roles = payload.roles || [];

    return {
      logged: true,
      admin: roles.includes("ROLE_ADMIN"),
      roles,
    };
  } catch (e) {
    console.error("Token inválido:", e);
    return { logged: false, admin: false, roles: [] };
  }
}