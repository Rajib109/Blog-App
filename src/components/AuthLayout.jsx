import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Protected = ({ children, authentication = true }) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const authStatus = useSelector((state) => state.auth.status);

  useEffect(() => {
    if (authentication && authStatus != authentication) {
      navigate("/login");
    } else if (!authentication && authStatus != authentication) {
      navigate("/");
    }
    setIsLoading(false);
  }, [authentication, authStatus, navigate]);

  return (
    <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : authentication ? (
        children
      ) : (
        <p>You are not authorized to view this content.</p>
      )}
    </div>
  );
};

export default Protected;
