import React, { createContext, useContext, useState, useCallback } from 'react';

const SurveyContext = createContext(null);

export function SurveyProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [initialData, setInitialData] = useState({});

  const openSurvey = useCallback((data = {}) => {
    setInitialData(data);
    setIsOpen(true);
  }, []);

  const closeSurvey = useCallback(() => {
    setIsOpen(false);
    setInitialData({});
  }, []);

  return (
    <SurveyContext.Provider value={{ isOpen, openSurvey, closeSurvey, initialData }}>
      {children}
    </SurveyContext.Provider>
  );
}

export function useSurvey() {
  const context = useContext(SurveyContext);
  if (!context) {
    throw new Error('useSurvey must be used within a SurveyProvider');
  }
  return context;
}
