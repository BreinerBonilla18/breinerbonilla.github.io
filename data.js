export const profileData = {
  name: "Breiner Orlando Bonilla Villamizar",
  title: "Fullstack Software Engineer | TSU en Informática",
  location: "Táchira, Venezuela",
  experienceYears: "3.5+",
  summary: "Desarrollador Fullstack con más de 3 años de experiencia en la construcción de aplicaciones web sólidas, arquitecturas Local-First e integración de modelos de Inteligencia Artificial. Enfoque orientado a rendimiento, código limpio y valor de negocio real.",
  contact: {
    github: "https://github.com/BreinerBonilla18",
    email: "bonillabreiner296@gmail.com"
  },
  experience: [
    {
      company: "Pangea Renuevo Solutions",
      role: "Frontend / Fullstack Developer",
      period: "3+ años",
      description: "Desarrollo y mantenimiento de plataformas web empresariales, optimización de interfaces de usuario y maquetación de arquitecturas frontend."
    }
  ],
  skills: {
    frontend: ["Vue 3", "React", "Tailwind CSS", "JavaScript (ES6+)", "TypeScript", "Pinia"],
    backend: ["Node.js", "Express", "APIs REST", "Google Gemini API", "GraphQL"],
    database: ["IndexedDB (Dexie.js)", "PostgreSQL", "Supabase (Auth/OAuth)"]
  },
  projects: [
    {
      id: "langbox",
      title: "LangBox",
      description: "Aplicación web Local-First para el aprendizaje de vocabulario en inglés. Integra la API de Google Gemini para la extracción automatizada de contexto y un sistema de repetición espaciada (SRS) mediante flashcards para retención a largo plazo.",
      repository: "https://github.com/BreinerBonilla18/LangBox",
      isPrivate: false,
      domain: "https://langbox-kappa.vercel.app/",
      technologies: ["Vue 3", "Tailwind 4", "Supabase", "Gemini API", "Pinia", "Dexie.js", "Lucide Icons"],
      image: "https://via.placeholder.com/600x350/1e293b/f8fafc?text=LangBox+Preview"
    }
  ]
};
