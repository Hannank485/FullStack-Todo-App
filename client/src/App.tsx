import { useEffect, useState } from "react";
import AuthPage from "./Components/AuthPage";
import Dashboard from "./Components/Dashboard";
import { PropagateLoader } from "react-spinners";
import { authFunction, api } from "./api/apiFunctions";
function App() {
  // AUTH
  const [isRegistered, setIsRegistered] = useState<boolean>(true);
  const [auth, isAuth] = useState<boolean | null>(null);
  const [authError, setAuthError] = useState<string | null>(null);
  const [authSuccess, setAuthSuccess] = useState<string | null>(null);
  const [rateLimit, isRateLimit] = useState<boolean>(false);
  const [seconds, setSeconds] = useState<number | null>(null);

  api.interceptors.response.use(
    (response) => response,
    (error) => {
      const status = error.response?.status;

      if (status === 401) {
        isAuth(false);
      }

      if (status === 429) {
        isRateLimit(true);
        setSeconds(60);
      }

      return Promise.reject(error);
    },
  );
  // RATE LIMIT
  useEffect(() => {
    if (!rateLimit) return;

    if (rateLimit === true) {
      const timer = setInterval(() => {
        setSeconds((prev) => {
          if (prev === null || prev <= 0) {
            clearInterval(timer);
            isRateLimit(false);
            return null;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [rateLimit]);
  // Check Auth session
  useEffect(() => {
    const checkAuth = async () => {
      try {
        await authFunction.apiMe();
        isAuth(true);
      } catch {
        isAuth(false);
      }
    };

    checkAuth();
  }, []);

  const setRegister = () => {
    setIsRegistered((prev) => !prev);
  };
  // AUTHENTICATION FUNCTIONS
  const login = async (username: string, password: string) => {
    await authFunction.apiLogin(username, password);
  };
  const register = async (username: string, password: string) => {
    await authFunction.apiRegister(username, password);
  };
  const logout = async () => {
    await authFunction.apiLogout();
    isAuth(false);
  };
  const handleSubmit = async (username: string, password: string) => {
    if (isRegistered) {
      try {
        isAuth(null);
        await login(username, password);
        isAuth(true);
        setAuthError(null);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        isAuth(false);

        console.log(err.response?.data?.message || "Something went wrong");
        setAuthError(err.response?.data?.message);
      }
    } else {
      try {
        await register(username, password);
        setAuthError(null);
        setIsRegistered(true);
        setAuthSuccess("You have successfully registered.");
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        isAuth(false);

        console.log(err.response?.data?.message || "Something went wrong");
        setAuthError(err.response?.data?.message);
      }
    }
  };
  // DARK MODE TOGGLE

  return (
    <div className="w-full bg-bg dark:bg-darkBg dark:text-darkText">
      {auth === false && !rateLimit && (
        <AuthPage
          authSuccess={authSuccess}
          isRegistered={isRegistered}
          setRegistered={setRegister}
          handleSubmit={handleSubmit}
          authError={authError}
        />
      )}
      {auth === null && !rateLimit && (
        <div className="fixed inset-0 flex items-center justify-center">
          <PropagateLoader
            color="#fb7185"
            size={15}
            cssOverride={{
              display: auth === null ? "block" : "none",
            }}
            speedMultiplier={2}
          />
        </div>
      )}

      {auth === true && !rateLimit && <Dashboard logout={logout} />}
      {rateLimit && (
        <div className="absolute inset-0 h-dvh w-dvw flex justify-center items-center">
          <h1 className="text-4xl text-accent text-center">
            YOU HAVE SENT TOO MANY REQUESTS, PLEASE TRY AGAIN IN
            <br />
            <span className="text-rose-600 font-bold text-5xl">
              {seconds} seconds
            </span>
          </h1>
        </div>
      )}
    </div>
  );
}

export default App;
