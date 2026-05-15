import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth.js";

const Protected = ({ children }) => {
  const { loading, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate("/login");
    }
  }, [loading, user, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#141414] flex items-center justify-center px-4">
        <h1 className="text-3xl font-bold text-white">Loading...</h1>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return children;
};

export default Protected;
