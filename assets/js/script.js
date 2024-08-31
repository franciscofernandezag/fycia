// Array de textos para mostrar de manera secuencial
const slides = [
    {
      title: "Libérate de las Deudas",
      text: "Vive tranquilo y seguro con nuestras soluciones financieras. Recupera tu paz mental y construye una vida con solvencia y estabilidad económica.",
      button: "Comienza Hoy"
    },
    {
      title: "Transforma tu Futuro",
      text: "Nuestros expertos te guiarán en cada paso para liberarte de la carga financiera y asegurar un futuro brillante.",
      button: "Descubre Cómo"
    },
    {
      title: "Haz Crecer tu Patrimonio",
      text: "Invierte en tu tranquilidad. Aprende a gestionar tus finanzas y a construir un patrimonio sólido y duradero.",
      button: "Empieza Ahora"
    },
    {
      title: "Asegura tu Futuro",
      text: "Conoce nuestras estrategias para asegurar tu futuro financiero y alcanzar tus metas a largo plazo.",
      button: "Explora Más"
    },
    {
      title: "Planifica tu Éxito",
      text: "Planifica y ejecuta tu camino hacia el éxito con nuestras herramientas y asesoría personalizada.",
      button: "Inicia Ahora"
    }
  ];
  
  // Elementos del DOM
  const heroTitle = document.getElementById('heroTitle');
  const heroText = document.getElementById('heroText');
  const heroButton = document.getElementById('heroButton');
  
  let currentSlide = 0;
  
  // Función para cambiar el contenido
  function changeContent() {
    const slide = slides[currentSlide];
    heroTitle.textContent = slide.title;
    heroText.textContent = slide.text;
    heroButton.textContent = slide.button;
  
    currentSlide = (currentSlide + 1) % slides.length;
  }
  
  // Cambia el contenido cada 9 segundos
  setInterval(changeContent, 9000);
  