import React, { createContext, useState, useEffect } from "react";

//creating a context
export const UserContext = createContext();

// creating a provider component
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  //Load the user data from localstorage or a persistence layer
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    console.log("User loaded from local storage:", storedUser);
  }, []);

  //save users data to local storage when the user state changes
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }

    console.log("User state updated", user);
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
