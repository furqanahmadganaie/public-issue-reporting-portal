import { createContext } from "react";
 // resposible for  creates context object that can be used to share data across components without passing props 
 // down manually at every level. It is used to manage authentication state and provide authentication-related 
 // functions to the components that need them.
 //Think of it as creating an empty box.
const AuthContext = createContext(null);

export default AuthContext;