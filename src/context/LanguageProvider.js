import React, { useContext, useState, useEffect } from 'react';
import { LANGUAGE_NAMES } from '../constants/global/names';
import { getCurrentLanguageData } from '../languages';

const { EN } = LANGUAGE_NAMES;

const LanguageContext = React.createContext(null);

const LanguageProvider = ({ children }) => {
  const [ languageData, setLanguageData ] = useState({});
  const [ activeLanguage, setActiveLanguage ] = useState(localStorage.getItem('language') || EN);

  useEffect(() => {
    setLanguageData(getCurrentLanguageData(activeLanguage));
  }, [ activeLanguage ]);

  const changeLanguage = (lang) => {
    localStorage.setItem('language', lang);
    setActiveLanguage(lang);
  };

  return (
    <LanguageContext.Provider value={{ t: languageData, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguageData = () => useContext(LanguageContext);

export default LanguageProvider;
