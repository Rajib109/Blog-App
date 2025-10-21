import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Protected = ({ children, authentication = true }) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const authStatus = useSelector((state) => state.auth.status);

  useEffect(() => {
    // After initial mount and on authStatus changes, decide where to go
    if (authentication && authStatus !== authentication) {
      navigate("/login", { replace: true });
    } else if (!authentication && authStatus !== authentication) {
      navigate("/", { replace: true });
    }
    setIsLoading(false);
  }, [authentication, authStatus, navigate]);

  return isLoading ? <h1>Loading...</h1> : children;
};

export default Protected;