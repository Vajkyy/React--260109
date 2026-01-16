import { createContext, useState, useEffect } from "react";
import { myAxios, getAuthHeaders } from "../services/api";

const AuthContext = createContext(null);
export default AuthContext;

export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [serverError, setServerError] = useState(null);

  // Login
  function login(adat) {
    setLoading(true);
    myAxios
      .post("/users/login", adat)
      .then((response) => {
        localStorage.setItem("token", response.data.token);
        setToken(response.data.token);
        setUser(response.data.user);
        window.location.href = "/";
      })
      .catch(hibakezeles)
      .finally(() => setLoading(false));
  }

  // Registration
  function register(adat) {
    setLoading(true);
    myAxios
      .post("/users/register", adat)
      .then(() => {
        window.location.href = "/login";
      })
      .catch(hibakezeles)
      .finally(() => setLoading(false));
  }

  // Logout
  function logout() {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
    window.location.reload();
  }

  // Load user on mount
  useEffect(() => {
    loadUser();
  }, []);

  function loadUser() {
    const savedToken = localStorage.getItem("token");

    if (!savedToken) {
      setLoading(false);
      setUser(null);
      return;
    }

    setToken(savedToken);
    setLoading(true);

    myAxios
      .get("/users/me", { headers: getAuthHeaders() })
      .then((response) => setUser(response.data))
      .catch(() => {
        setUser(null);
        localStorage.removeItem("token");
      })
      .finally(() => setLoading(false));
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

  return (
    <AuthContext.Provider
      value={{ login, register, loading, user, logout, serverError }}
    >
      {children}
    </AuthContext.Provider>
  );
}
