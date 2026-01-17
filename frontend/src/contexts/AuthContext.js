import { createContext, useState, useEffect } from "react";
import { myAxios, getAuthHeaders } from "../services/api";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [serverError, setServerError] = useState(null);

  // Login
  async function login(adat) {
    setLoading(true);
    try {
      const response = await myAxios.post("/users/login", adat);
      const loggedInUser = response.data.user;
      const token = response.data.token;

      if (!loggedInUser || !token) throw new Error("Invalid login response");

      localStorage.setItem("token", token);
      setToken(token);
      setUser(loggedInUser);

      window.location.href = "/";
    } catch (error) {
      hibakezeles(error);
    } finally {
      setLoading(false);
    }
  }

  // Registration
  async function register(adat) {
    setLoading(true);
    try {
      await myAxios.post("/users/register", adat);
      window.location.href = "/login";
    } catch (error) {
      hibakezeles(error);
    } finally {
      setLoading(false);
    }
  }

  // Logout
  function logout() {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
    window.location.reload();
  }

  // Load user
  async function loadUser() {
    const savedToken = localStorage.getItem("token");
    if (!savedToken) {
      setLoading(false);
      setUser(null);
      return;
    }

    setToken(savedToken);
    setLoading(true);

    try {
      const response = await myAxios.get("/users/me", {
        headers: getAuthHeaders(),
      });
      const fetchedUser = response.data;

      if (fetchedUser) setUser(fetchedUser);
      else {
        setUser(null);
        localStorage.removeItem("token");
      }
    } catch (error) {
      setUser(null);
      localStorage.removeItem("token");
    } finally {
      setLoading(false);
    }
  }

  // Error handling
  function hibakezeles(error) {
    const status = error.response?.status;
    if (status === 400) setServerError("Hibás adatok");
    else if (status === 401)
      setServerError(
        "A hitelesítési token érvénytelen vagy lejárt. Menj a login oldalra!"
      );
    else if (status === 403) setServerError("Tiltott művelet");
    else if (status === 404) setServerError("Nem található");
    else if (status === 422) setServerError("Validációs hiba");
    else if (status === 500) setServerError("Szerver hiba");
    else setServerError("Ismeretlen hiba");
  }

  useEffect(() => {
    loadUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{ login, register, loading, user, logout, serverError, loadUser }}
    >
      {children}
    </AuthContext.Provider>
  );
}
