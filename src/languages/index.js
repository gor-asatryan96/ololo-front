import EN from './jsons/en.json';
// import FR from './jsons/fr.json';
import SW from './jsons/sw.json';

const languages = {
  EN,
  // FR,
  SW,
};

export const getCurrentLanguageData = lang => languages[lang] || languages.SW;
