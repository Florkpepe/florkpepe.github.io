import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

const MemeCoin1 = () => {
  const [showContent, setShowContent] = useState(false);

  const defaultCursor = 'url("/assets/memecoin1/cursor-default.png") 18 18, auto';
  const clickedCursor = 'url("/assets/memecoin1/cursor-click.png") 18 18, auto';
  const [cursorStyle, setCursorStyle] = useState(defaultCursor);

  const [dollarEffects, setDollarEffects] = useState([]);

  // Variables para ajustar la posición del botón de regreso al inicio
  const buttonOffsetTop = '10px';
  const buttonOffsetLeft = '-80px';

  // Variables para ajustar el tamaño de los botones de redes (imágenes)
  const socialButtonWidth = '180px';
  const socialButtonHeight = '340px';

  // Variables para ajustar la posición y estilo del contenedor de redes
  const socialContainerTop = '20px';
  const socialContainerLeft = '20px';
  const socialContainerRight = '20px';
  const socialContainerHeight = '200px';

  // Opciones para espaciado y posición horizontal adicional
  const socialContainerGap = '10px';
  const socialImageMarginHorizontal = '5px';

  // Opción para mover verticalmente cada imagen (usa valores negativos para subir, positivos para bajar)
  const socialImageVerticalOffset = '-50px';

  // Variable para posicionar el contenedor de la versión en inglés (debajo del de redes)
  const bottomContainerTop = '240px';

  // Listener global para el efecto de "$"
  useEffect(() => {
    const globalMouseMove = (e) => {
      const newDollar = {
        id: Date.now() + Math.random(),
        x: e.clientX,
        y: e.clientY,
      };
      setDollarEffects((prev) => [...prev, newDollar]);
      setTimeout(() => {
        setDollarEffects((prev) => prev.filter((d) => d.id !== newDollar.id));
      }, 1000);
    };

    window.addEventListener('mousemove', globalMouseMove);
    return () => window.removeEventListener('mousemove', globalMouseMove);
  }, []);

  const handleMouseDown = () => {
    setCursorStyle(clickedCursor);
  };

  const handleMouseUp = () => {
    setCursorStyle(defaultCursor);
    if (!showContent) {
      setShowContent(true);
      const transitionAudio = new Audio('/assets/memecoin1/coin-falling.mp3');
      transitionAudio.play();
    }
  };

  useEffect(() => {
    if (showContent) {
      const backgroundAudio = new Audio('/assets/memecoin1/after-enter-audio.mp3');
      backgroundAudio.loop = true;
      backgroundAudio.play();
    }
  }, [showContent]);

  return (
    <>
      {/* Reset global de márgenes, paddings y definición de la fuente */}
      <Helmet>
        <link rel="icon" href="/assets/memecoin1/myicon.ico" type="image/x-icon" />
        <style>{`
          @font-face {
            font-family: 'SimpsonFont';
            src: url('/fonts/simpsonfont.woff') format('woff');
            font-weight: normal;
            font-style: normal;
          }
          html, body {
            margin: 0;
            padding: 0;
            font-family: 'SimpsonFont', sans-serif;
          }
        `}</style>
      </Helmet>

      {/* Estilos locales: reset global, animación para "$" y estilos para redes */}
      <style>
        {`
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          @keyframes bounceDollar {
            0% { transform: translate(0, 0) scale(1); opacity: 1; }
            50% { transform: translate(20px, 15px) scale(1.2); opacity: 1; }
            100% { transform: translate(30px, 30px) scale(0.5); opacity: 0; }
          }
          .dollar-effect {
            position: absolute;
            pointer-events: none;
            font-size: 24px;
            color: green;
            animation: bounceDollar 1s forwards;
            user-select: none;
            z-index: 10000;
          }
          /* Efecto para las imágenes de redes: usamos drop-shadow para respetar la transparencia */
          .social-btn {
            display: inline-block;
            transition: filter 0.3s ease;
          }
          .social-btn:hover img {
            filter: drop-shadow(0px 4px 15px rgba(0, 0, 0, 0.4));
          }
        `}
      </style>

      {/* Contenedor principal */}
      <div
        className="fixed inset-0 z-50"
        style={{ cursor: cursorStyle }}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
      >
        {dollarEffects.map((dollar) => (
          <div key={dollar.id} className="dollar-effect" style={{ left: dollar.x, top: dollar.y }}>
            $
          </div>
        ))}

        {/* Botón de imagen para regresar a la web de inicio (Latia) */}
        <a
          href="https://latiaunida.duckdns.org"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            position: 'absolute',
            top: buttonOffsetTop,
            left: buttonOffsetLeft,
            width: '320px',
            height: '160px',
            zIndex: 1000,
          }}
        >
          <img
            src="/assets/memecoin1/lunamardo1.png"
            alt="Inicio Latia"
            style={{
              width: '100%',
              height: '100%',
              display: 'block',
            }}
            onMouseOver={(e) => (e.currentTarget.src = "/assets/memecoin1/lunamardo2.png")}
            onMouseOut={(e) => (e.currentTarget.src = "/assets/memecoin1/lunamardo1.png")}
          />
        </a>

        {/* Contenedor de redes sociales (solo se muestra cuando hay contenido) */}
        {showContent && (
          <div
            className="social-container"
            style={{
              backgroundColor: 'rgb(104, 139, 80)',
              position: 'fixed',
              top: socialContainerTop,
              left: socialContainerLeft,
              right: socialContainerRight,
              height: socialContainerHeight,
              overflow: 'hidden',
              padding: '10px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'flex-start',
              gap: socialContainerGap,
              zIndex: 900,
              border: '2px solid black',
              borderRadius: '10px',
            }}
          >
            {/* Texto de fondo (watermark) */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                textAlign: 'center',
                zIndex: 1,
                color: 'white',
                fontSize: '120px',
                opacity: 0.5,
                pointerEvents: 'none',
              }}
            >
              FLORKPEPE
            </div>

            {/* Íconos de redes con posición relativa y zIndex mayor */}
            <a
              href="https://www.youtube.com/@LatIA-s3g"
              target="_blank"
              rel="noopener noreferrer"
              className="social-btn"
              style={{
                cursor: 'inherit',
                marginLeft: socialImageMarginHorizontal,
                marginRight: socialImageMarginHorizontal,
                position: 'relative',
                zIndex: 2,
              }}
            >
              <img
                src="/assets/memecoin1/youtube.png"
                alt="YouTube"
                style={{
                  width: socialButtonWidth,
                  height: socialButtonHeight,
                  display: 'block',
                  position: 'relative',
                  top: socialImageVerticalOffset,
                }}
              />
            </a>
            <a
              href="https://x.com/latiaunida"
              target="_blank"
              rel="noopener noreferrer"
              className="social-btn"
              style={{
                cursor: 'inherit',
                marginLeft: socialImageMarginHorizontal,
                marginRight: socialImageMarginHorizontal,
                position: 'relative',
                zIndex: 2,
              }}
            >
              <img
                src="/assets/memecoin1/twitter.png"
                alt="Twitter"
                style={{
                  width: socialButtonWidth,
                  height: socialButtonHeight,
                  display: 'block',
                  position: 'relative',
                  top: socialImageVerticalOffset,
                }}
              />
            </a>
            <a
              href="https://www.reddit.com/user/Active-Let7863/?rdt=56716"
              target="_blank"
              rel="noopener noreferrer"
              className="social-btn"
              style={{
                cursor: 'inherit',
                marginLeft: socialImageMarginHorizontal,
                marginRight: socialImageMarginHorizontal,
                position: 'relative',
                zIndex: 2,
              }}
            >
              <img
                src="/assets/memecoin1/reddit.png"
                alt="Reddit"
                style={{
                  width: socialButtonWidth,
                  height: socialButtonHeight,
                  display: 'block',
                  position: 'relative',
                  top: socialImageVerticalOffset,
                }}
              />
            </a>
            <a
              href="https://t.me/tu-canal"
              target="_blank"
              rel="noopener noreferrer"
              className="social-btn"
              style={{
                cursor: 'inherit',
                marginLeft: socialImageMarginHorizontal,
                marginRight: socialImageMarginHorizontal,
                position: 'relative',
                zIndex: 2,
              }}
            >
              <img
                src="/assets/memecoin1/telegram.png"
                alt="Telegram"
                style={{
                  width: socialButtonWidth,
                  height: socialButtonHeight,
                  display: 'block',
                  position: 'relative',
                  top: socialImageVerticalOffset,
                }}
              />
            </a>
          </div>
        )}

        {/* Contenedor para la versión en inglés (Rojo) */}
        {showContent && (
          <div
            className="english-container"
            style={{
              backgroundColor: 'rgb(243, 6, 6)',
              position: 'fixed',
              top: bottomContainerTop,
              left: '22%', // Ajusta el margen izquierdo (ocupa ~50% de ancho)
              width: '50%',
              height: '610px',
              overflowY: 'auto',
              padding: '10px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'flex-start',
              gap: socialContainerGap,
              zIndex: 900,
              border: '2px solid black',
              borderRadius: '10px',
              color: 'white',
              fontSize: '18px',
              lineHeight: '1.9',
            }}
          >
            <div style={{ textAlign: 'center' }}>
              <h2>💀 WHAT IS $PEPEMEME? 💀</h2>
              <p>
                🚨 <strong>The old times are DEAD.</strong> Doge, Shiba, Flork, and even old PEPE are part of the past.
                The crypto meme world NEEDS a revolution, and <strong>we are the answer</strong>.
              </p>
              <p>
                💥 $PEPEMEME is not just another token – it's the first step of an unstoppable legion.
              </p>
              <p>
                🔥 FlorkPepe is the ultimate fusion of communities, the foundation upon which we will build LatIA, the
                AI-driven company that will reshape crypto markets. 🚀
              </p>
              <p>
                <strong>AI and cutting-edge tools for ALL small investors.</strong> One vision, one goal, one path:
                TOTAL DOMINATION.
              </p>
              <p>💰 10 projects or less. $10 BILLION. $PEPEMEME is the first, and there is NO turning back.</p>
              <p>💀 Memes evolve, AI arrives, and the market will never be the same.</p>
              <p>🔥 We are the resistance. We are FlorkPepe. 🔥</p>
              <p>Are you going to watch from the sidelines, or will you get in before it’s too late?</p>
            </div>
          </div>
        )}

        {/* Contenedor IZQUIERDO (amarillo) al mismo nivel que el rojo */}
        {showContent && (
          <div
            style={{
              position: 'fixed',
              top: bottomContainerTop,
              left: '2%',
              width: '18%',
              height: '610px',
              backgroundColor: 'yellow',
              border: '2px solid black',
              borderRadius: '10px',
              zIndex: 900,
              padding: '10px',
            }}
          >
            <h3>Contenedor Izquierdo</h3>
            <p>Aquí tu texto o imágenes...</p>
          </div>
        )}

        {/* Contenedor DERECHO (azul) al mismo nivel que el rojo */}
        {showContent && (
          <div
            style={{
              position: 'fixed',
              top: bottomContainerTop,
              right: '2%',
              width: '18%',
              height: '610px',
              backgroundColor: 'blue',
              border: '2px solid black',
              borderRadius: '10px',
              zIndex: 900,
              padding: '10px',
              color: 'white',
            }}
          >
            <h3>Contenedor Derecho</h3>
            <p>Más texto o imágenes...</p>
          </div>
        )}

        {/* 6 contenedores adicionales, cada uno abajo del anterior */}
        {showContent &&
          Array.from({ length: 6 }).map((_, i) => {
            // La posición vertical de cada contenedor comienza un poco debajo de 850px (donde termina el rojo)
            // Cada uno mide 610px + 10px de espacio, así evitamos que se solapen
            const topOffset = 870 + i * 620; // 870, 1490, 2110, etc.
            return (
              <div
                key={i}
                style={{
                  position: 'fixed',
                  top: `${topOffset}px`,
                  left: '22%',
                  width: '50%',
                  height: '610px',
                  backgroundColor: '#ccc',
                  border: '2px solid black',
                  borderRadius: '10px',
                  zIndex: 900,
                  padding: '10px',
                }}
              >
                <h3>Contenedor Extra #{i + 1}</h3>
                <p>
                  Contenido adicional #{i + 1}. No se mueve al hacer scroll y no se solapa con
                  los demás.
                </p>
              </div>
            );
          })}

        {/* Contenido principal: Imagen inicial vs. espacio en blanco cuando ya se mostró contenido */}
        {!showContent ? (
          <div
            className="cursor-pointer w-full h-full flex justify-center items-center"
            style={{ cursor: 'inherit' }}
          >
            <img
              src="/assets/memecoin1/coin-image.jpg"
              alt="Monedas cayendo"
              className="object-cover w-full h-full"
              style={{ cursor: 'inherit' }}
            />
          </div>
        ) : (
          <div
            className="w-full h-full flex justify-center items-center bg-white"
            style={{ cursor: 'inherit' }}
          >
            {/* Dejamos vacío o agregamos algo si se quiere */}
          </div>
        )}
      </div>
    </>
  );
};

export default MemeCoin1;
