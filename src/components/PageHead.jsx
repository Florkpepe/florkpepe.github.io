// src/components/PageHead.jsx
import { useEffect } from 'react';

const PageHead = ({ title, icon }) => {
  useEffect(() => {
    // Actualizar el título de la página
    document.title = title;

    // Actualizar (o crear) el favicon
    let link = document.querySelector("link[rel*='icon']");
    if (!link) {
      link = document.createElement('link');
      link.rel = 'icon';
      document.getElementsByTagName('head')[0].appendChild(link);
    }
    link.type = 'image/x-icon';
    link.href = icon;
  }, [title, icon]);

  return null;
};

export default PageHead;
