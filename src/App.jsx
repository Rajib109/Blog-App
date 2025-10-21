import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import authService from "./appwrite/auth";
import { login, logout } from "./store/authSlice";
import { Header, Footer } from "./components/index";
import { Outlet } from "react-router-dom";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const userdata = await authService.getCurrentUser();
        if (cancelled) return;

        if (userdata) {
          dispatch(login(userdata));
        } else {
          dispatch(logout());
        }
      } catch (err) {
        // If Appwrite is misconfigured or offline, treat as logged out
        console.error("getCurrentUser failed:", err);
        if (!cancelled) {
          dispatch(logout());
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [dispatch]);

  if (loading) {
    return (
      <div className="min-h-screen grid place-items-center bg-gray-700 text-white">
        <div>Loading…</div>
      </div>
    );
  }

  return (
    <div className="bg-gray-700 flex flex-wrap min-h-screen">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default App;