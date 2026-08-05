import { useContext } from "react";
// instead of using usecontext(authcontext ) we simple use useauth()
import AuthContext from "../context/AuthContext";

const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used inside AuthProvider."
    );
  }

  return context;
};

export default useAuth;