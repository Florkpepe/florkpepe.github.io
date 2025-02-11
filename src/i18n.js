// src/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      welcome: "Welcome to LatIA!",
      teamTitle: "Our Team",
      teamDescription: "Meet our amazing team, the driving force behind our projects.",
      home: "Home",
      projects: "Projects",
      preSales: "PreSales",
      AIs: "AIs",
      games: "Games"
      // Agrega más claves según tus textos...
    }
  },
  es: {
    translation: {
      welcome: "¡Bienvenido a LatIA!",
      teamTitle: "Nuestro Equipo",
      teamDescription: "Conoce a nuestro increíble equipo, el motor detrás de nuestros proyectos.",
      home: "Inicio",
      projects: "Proyectos",
      preSales: "Preventas",
      AIs: "IAs",
      games: "Juegos"
      // Agrega más claves para español...
    }
  }
};

i18n
  .use(LanguageDetector) // Usamos el detector de idioma
  .use(initReactI18next) // Conecta i18next con React
  .init({
    resources,
    fallbackLng: 'en', // Si el idioma detectado no está disponible, se usa inglés
    detection: {
      order: ['navigator', 'htmlTag', 'path', 'subdomain'],
      lookupNavigator: true,
      caches: [] // No cachea el idioma para pruebas
    },
    interpolation: {
      escapeValue: false // React ya se encarga de la seguridad
    }
  });

export default i18n;
