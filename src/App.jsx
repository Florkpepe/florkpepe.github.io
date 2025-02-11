import React, { useState, useEffect, memo } from 'react';
import { Helmet } from 'react-helmet';

// Componente de animación (se mantiene memorizado para evitar re-renderizaciones innecesarias)
const AnimationComponent = memo(() => {
  const [frame, setFrame] = useState(1);
  useEffect(() => {
    const interval = setInterval(() => {
      setFrame(prevFrame => (prevFrame === 13 ? 1 : prevFrame + 1));
    }, 300); // Cambia de imagen cada 300ms (ajusta este valor según prefieras)
    return () => clearInterval(interval);
  }, []);
  return (
    <img
      src={`/assets/memecoin1/SAPOCOLORES/S${frame}.png`} // Asegúrate de que la extensión sea la correcta (por ejemplo, .png)
      alt={`Frame ${frame}`}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        zIndex: 0,
        opacity: 0.9, // Ajusta la opacidad si deseas que el texto se destaque más
      }}
    />
  );
});

const Florkpepe = () => {
  const [showContent, setShowContent] = useState(false);
  const defaultCursor = 'url("/assets/memecoin1/cursor-default.png") 18 18, auto';
  const clickedCursor = 'url("/assets/memecoin1/cursor-click.png") 18 18, auto';
  const [cursorStyle, setCursorStyle] = useState(defaultCursor);
  const [dollarEffects, setDollarEffects] = useState([]);

  // Variables para ajustar posiciones y tamaños
  const buttonOffsetTop = '5px';
  const buttonOffsetLeft = '-2px';
  const socialButtonWidth = '180px';
  const socialButtonHeight = '340px';
  const socialContainerGap = '10px';
  const socialImageMarginHorizontal = '40px';
  const socialImageVerticalOffset = '-50px';

  // Variable global para el espaciamiento entre contenedores
  const containerSpacing = '20px';
  const containerSpacingNumber = parseInt(containerSpacing, 10);

  // Variable para definir el color de fondo (RGB)
  const globalBackgroundColor = "rgb(87, 113, 79)"; // Modifícalo a tu gusto

  // Definimos unos keyframes personalizados para la animación de los emotes,
  // de modo que se inicie con un offset de 10px en X e Y.
  const customKeyframes = `
    @keyframes bounceDollar {
      0% { transform: translate(10px, 10px) scale(1); opacity: 1; }
      50% { transform: translate(30px, 25px) scale(1.2); opacity: 1; }
      100% { transform: translate(40px, 40px) scale(0.5); opacity: 0; }
    }
  `;

  // Listener global para el efecto de emotes que siguen al cursor
  useEffect(() => {
    const globalMouseMove = (e) => {
      // Selecciona aleatoriamente entre "$", "💵" y "🪙"
      const symbols = ["$", "💵", "🪙"];
      const symbol = symbols[Math.floor(Math.random() * symbols.length)];
      const newDollar = {
        id: Date.now() + Math.random(),
        x: e.clientX,
        y: e.clientY,
        symbol,
      };
      setDollarEffects(prev => [...prev, newDollar]);
      setTimeout(() => {
        setDollarEffects(prev => prev.filter(d => d.id !== newDollar.id));
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
      <Helmet>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
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
            width: 100vw;
            overflow-x: hidden;
            font-family: 'SimpsonFont', sans-serif;
          }
          ${customKeyframes}
        `}</style>
      </Helmet>

      <style>{`
        * { margin: 0; padding: 0; box-sizing: border-box; }
        .dollar-effect {
          position: absolute;
          pointer-events: none;
          font-size: 24px;
          color: green;
          animation: bounceDollar 1s forwards;
          user-select: none;
          z-index: 10000;
        }
        .social-btn { 
          display: inline-block; 
          transition: filter 0.3s ease; 
        }
        .social-btn:hover img {
          filter: drop-shadow(0px 4px 15px rgba(17,255,0,0.82));
        }
        .neon-effect {
          filter: drop-shadow(0 0 5px #39ff14) drop-shadow(0 0 10px #39ff14);
          transition: filter 0.3s ease;
        }
        .neon-effect:hover {
          filter: drop-shadow(0 0 10px #39ff14) drop-shadow(0 0 20px #39ff14) drop-shadow(0 0 30px #39ff14);
        }
      `}</style>

      <div
        style={{
          position: 'relative',
          width: '100vw',
          minHeight: '100vh',
          backgroundColor: globalBackgroundColor,
          cursor: cursorStyle,
          overflowX: 'hidden',
        }}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
      >
        {dollarEffects.map(dollar => (
          <div
            key={dollar.id}
            className="dollar-effect"
            style={{ left: dollar.x, top: dollar.y }}
          >
            {dollar.symbol}
          </div>
        ))}

        {!showContent ? (
          <div style={{ width: '100vw', height: '100vh', cursor: 'inherit' }}>
            <img
              src="/assets/memecoin1/coin-image.jpg"
              alt="Monedas cayendo"
              style={{
                width: '100vw',
                height: '100vh',
                objectFit: 'cover',
                cursor: 'inherit',
              }}
            />
          </div>
        ) : (
          <div style={{ paddingBottom: '100px', width: '100vw', margin: 0 }}>
            {/* Botón para regresar, forzando que el cursor se herede para no mostrar la mano */}
            <a
              href="https://latiaunida.duckdns.org"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                position: 'absolute',
                top: buttonOffsetTop,
                left: buttonOffsetLeft,
                width: '200px',
                height: '200px',
                zIndex: 1000,
                cursor: 'inherit'
              }}
            >
              <img
                className="neon-effect"
                src="/assets/memecoin1/lunamardo1.png"
                alt="Inicio Latia"
                style={{ width: '100%', height: '100%', display: 'block' }}
                onMouseOver={(e) =>
                  (e.currentTarget.src = "/assets/memecoin1/lunamardo2.png")
                }
                onMouseOut={(e) =>
                  (e.currentTarget.src = "/assets/memecoin1/lunamardo1.png")
                }
              />
            </a>

            <div
              style={{
                margin: `${containerSpacing} auto`,
                width: `calc(100vw - ${containerSpacingNumber * 2}px)`,
                display: 'flex',
                flexDirection: 'column',
                gap: containerSpacing,
                boxSizing: 'border-box',
              }}
            >
              {/* Contenedor verde (redes sociales) */}
              <div
                className="social-container"
                style={{
                  backgroundColor: "rgb(104, 139, 80)",
                  width: '100%',
                  height: '200px',
                  overflow: 'hidden',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'flex-start',
                  gap: socialContainerGap,
                  zIndex: 900,
                  border: '2px solid black',
                  borderRadius: '10px'
                }}
              >
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

              {/* Grupo de contenedores de colores */}
              <div>
                <div
                  style={{
                    display: 'flex',
                    gap: containerSpacing,
                    marginBottom: containerSpacing,
                    flexWrap: 'wrap',
                  }}
                >
                  {/* Contenedor Izquierdo: color RGB amarillo */}
                  <div
                    style={{
                      flex: '1',
                      backgroundColor: "rgb(255, 255, 0)",
                      border: '2px solid black',
                      borderRadius: '10px',
                      padding: '10px',
                      minWidth: '250px',
                    }}
                  >
                    <h3>Contenedor Izquierdo</h3>
                    <p>Aquí tu texto o imágenes...</p>
                  </div>
                  {/* Contenedor Central: color RGB rojo con animación de fondo */}
                  <div
                    style={{
                      flex: '2',
                      position: 'relative',
                      backgroundColor: "rgb(255, 0, 0)",
                      border: '2px solid black',
                      borderRadius: '10px',
                      padding: '10px',
                      color: 'white',
                      minWidth: '250px',
                      overflow: 'hidden',
                    }}
                  >
                    {/* La animación se coloca detrás del contenido */}
                    <AnimationComponent />
                    <div style={{ position: 'relative', zIndex: 1 }}>
                      <h2>💀 WHAT IS $PEPEMEME? 💀</h2>
                      <p>
                        🚨 <strong>The old times are DEAD.</strong> Doge, Shiba, Flork, e incluso el viejo PEPE son parte del pasado. The crypto meme world NEEDS a revolution, and <strong>we are the answer</strong>.
                      </p>
                      <p>💥 $PEPEMEME is not just another token – it's the first step of an unstoppable legion.</p>
                      <p>
                        🔥 FlorkPepe es la fusión definitiva de comunidades, la base sobre la que construiremos LatIA, la compañía impulsada por IA que revolucionará los mercados.
                      </p>
                      <p>
                        <strong>AI y herramientas de vanguardia para TODOS los pequeños inversores.</strong> Una visión, un objetivo, un camino: TOTAL DOMINATION.
                      </p>
                      <p>💰 10 proyectos o menos. $10 BILLION. $PEPEMEME es el primero y NO hay vuelta atrás.</p>
                      <p>💀 Los memes evolucionan, la IA llega y el mercado nunca será el mismo.</p>
                      <p>🔥 Somos la resistencia. Somos FlorkPepe. 🔥</p>
                      <p>¿Vas a quedarte en las gradas o te unirás antes de que sea demasiado tarde?</p>
                    </div>
                  </div>
                  {/* Contenedor Derecho: color RGB azul */}
                  <div
                    style={{
                      flex: '1',
                      backgroundColor: "rgb(0, 0, 255)",
                      border: '2px solid black',
                      borderRadius: '10px',
                      padding: '10px',
                      color: 'white',
                      minWidth: '250px',
                    }}
                  >
                    <h3>Contenedor Derecho</h3>
                    <p>Más texto o imágenes...</p>
                  </div>
                </div>

                {Array.from({ length: 6 }).map((_, i) => {
                  let bgColor = "";
                  if (i === 0) bgColor = "rgb(240,128,128)";
                  else if (i === 1) bgColor = "rgb(144,238,144)";
                  else if (i === 2) bgColor = "rgb(135,206,250)";
                  else if (i === 3) bgColor = "rgb(221,160,221)";
                  else if (i === 4) bgColor = "rgb(255,182,193)";
                  else if (i === 5) bgColor = "rgb(255,228,181)";
                  return (
                    <div
                      key={i}
                      style={{
                        marginBottom: containerSpacing,
                        backgroundColor: bgColor,
                        border: '2px solid black',
                        borderRadius: '10px',
                        padding: '10px',
                      }}
                    >
                      <h3>Contenedor Extra #{i + 1}</h3>
                      <p>
                        Contenido adicional #{i + 1}. Estos contenedores forman parte del flujo normal, extendiendo la altura de la página y permitiendo hacer scroll.
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Florkpepe;
