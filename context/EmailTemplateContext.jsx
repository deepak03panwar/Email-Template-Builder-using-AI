import { createContext, useState, useContext } from "react";

export const EmailTemplateContext = createContext();

export const EmailTemplateProvider = ({ children }) => {
  const [emailTemplate, setEmailTemplate] = useState([]); // Initialize empty array

  return (
    <EmailTemplateContext.Provider value={{ emailTemplate, setEmailTemplate }}>
      {children}
    </EmailTemplateContext.Provider>
  );
};

// Custom hook for consuming context
export const useEmailTemplate = () => {
  const context = useContext(EmailTemplateContext);
  if (!context) {
    throw new Error("useEmailTemplate must be used within EmailTemplateProvider");
  }
  return context;
};
