import { profileData } from "./data.js";

/* ═══════════════════════════════════════════
   1. Smooth Scroll — Lenis
   ═══════════════════════════════════════════ */
const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
});

// Sync Lenis with GSAP ticker
lenis.on("scroll", ScrollTrigger.update);
gsap.ticker.add((time) => lenis.raf(time * 1000));
gsap.ticker.lagSmoothing(0);

/* ═══════════════════════════════════════════
   2. Cursor Glow — Mouse Tracking
   ═══════════════════════════════════════════ */
const cursorGlow = document.getElementById("cursor-glow");

if (cursorGlow && !("ontouchstart" in window)) {
  let mouseX = 0,
    mouseY = 0;
  let glowX = 0,
    glowY = 0;

  document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  (function updateGlow() {
    glowX += (mouseX - glowX) * 0.07;
    glowY += (mouseY - glowY) * 0.07;
    cursorGlow.style.left = `${glowX}px`;
    cursorGlow.style.top = `${glowY}px`;
    requestAnimationFrame(updateGlow);
  })();
}

/* ═══════════════════════════════════════════
   3. Render Content
   ═══════════════════════════════════════════ */

// ── Header ──
document.getElementById("user-name").textContent = profileData.name;
document.getElementById("user-summary").textContent = profileData.summary;

const linksContainer = document.getElementById("user-links");
linksContainer.innerHTML = `
  <a href="${profileData.contact.github}" target="_blank" rel="noopener noreferrer"
     class="btn-shine px-6 py-3 bg-slate-800/80 hover:bg-slate-700/80 text-white font-medium rounded-xl transition-all border border-slate-700/80 flex items-center gap-2.5 backdrop-blur-sm">
    <img src="./assets/svg/github_dark.svg" alt="" aria-hidden="true" class="w-[18px] h-[18px] object-contain" /> GitHub
  </a>
  <a href="mailto:${profileData.contact.email}"
     class="btn-shine px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-medium rounded-xl transition-all flex items-center gap-2.5 shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/30">
    <i data-lucide="mail" class="w-[18px] h-[18px]"></i> Contacto
  </a>
`;

// ── Experience ──
const expContainer = document.getElementById("experience-container");
profileData.experience.forEach((exp) => {
  const card = document.createElement("div");
  card.className =
    "card-glow exp-card bg-slate-900/50 backdrop-blur-sm border border-slate-800/80 rounded-2xl p-6";
  card.innerHTML = `
    <div class="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 mb-3">
      <div>
        <h4 class="text-xl font-bold text-white">${exp.role}</h4>
        <div class="flex items-center gap-2 mt-1">
          <img src="./assets/images/pangea.png" alt="" aria-hidden="true" class="w-7 h-7 object-contain rounded" />
          <span class="text-indigo-400 font-medium">${exp.company}</span>
        </div>
      </div>
      <span class="text-xs font-mono bg-slate-800/80 text-slate-300 px-3 py-1.5 rounded-lg border border-slate-700/50 whitespace-nowrap">
        ${exp.period}
      </span>
    </div>
    <p class="text-slate-400 text-sm leading-relaxed">${exp.description}</p>
  `;
  expContainer.appendChild(card);
});

// ── Skills ──
const categoryIcons = {
  frontend: "monitor",
  backend: "server",
  database: "database",
  ai: "brain-circuit",
  tools: "wrench",
};
const categoryLabels = {
  frontend: "Frontend",
  backend: "Backend",
  database: "Bases de datos",
  ai: "IA e integraciones",
  tools: "Herramientas",
};
const technologyIcons = {
  "vue 3": "vue",
  react: "react_dark",
  "tailwind css": "tailwindcss",
  "tailwind 4": "tailwindcss",
  javascript: "javascript",
  typescript: "typescript",
  pinia: "pinia",
  "node.js": "nodejs",
  express: "expressjs_dark",
  "google gemini api": "gemini",
  "gemini api": "gemini",
  "groq api": "groq",
  "openrouter api": "openrouter_dark",
  "react bootstrap": "react_bootstrap",
  "react icons": "react_icons",
  apollo: "apollo",
  sequelize: "sequelize",
  "react icons": "react_icons",
  "react bootstrap": "react_bootstrap",
  graphql: "graphql",
  supabase: "supabase",
  postgresql: "postgresql",
  sqlite: "sqlite",
  "lucide icons": "lucide",
  bootstrap: "bootstrap",
  groq: "groq",
  openrouter: "openrouter_dark",
  github: "github_dark",
  sequelize: "sequelize",
  apollo: "apollo",
  materialui: "materialui",
  zod: "zod",
  git: "git",
  vite: "vite",
};
const renderTechnologyIcon = (technology) => {
  const icon = technologyIcons[technology.toLowerCase()];
  return icon
    ? `<img src="./assets/svg/${icon}.svg" alt="" aria-hidden="true" class="w-4 h-4 object-contain shrink-0" />`
    : "";
};
const skillsContainer = document.getElementById("skills-container");

Object.entries(profileData.skills).forEach(([category, items]) => {
  const card = document.createElement("div");
  card.className =
    "card-glow bg-slate-900/50 backdrop-blur-sm border border-slate-800/80 rounded-2xl p-6";
  card.innerHTML = `
    <div class="flex items-center gap-2.5 mb-5">
      <i data-lucide="${categoryIcons[category] || "code-2"}" class="w-4 h-4 text-indigo-400"></i>
      <h4 class="text-indigo-400 font-bold uppercase text-xs tracking-wider">${categoryLabels[category] || category}</h4>
    </div>
    <div class="flex flex-wrap gap-2">
      ${items.map((tech) => `<span class="skill-tag inline-flex items-center gap-2 px-3 py-1.5 bg-slate-800/60 text-slate-300 rounded-lg text-sm border border-slate-700/40">${renderTechnologyIcon(tech)}${tech}</span>`).join("")}
    </div>
  `;
  skillsContainer.appendChild(card);
});

// ── Projects ──
const projectsContainer = document.getElementById("projects-container");
profileData.projects.forEach((project) => {
  const card = document.createElement("article");
  card.className =
    "group card-glow bg-slate-900/50 backdrop-blur-sm border border-slate-800/80 rounded-2xl overflow-hidden";

  const repositories =
    project.repositories ||
    (project.repository ? [{ label: "Código", url: project.repository }] : []);
  const repoBtn = project.isPrivate
      ? `<span class="px-4 py-2.5 bg-slate-800/60 text-slate-500 text-sm font-medium rounded-xl cursor-not-allowed flex items-center gap-2">
         <i data-lucide="lock" class="w-4 h-4"></i> Privado
       </span>`
      : repositories
          .map(
            (repository) => `<a href="${repository.url}" target="_blank" rel="noopener noreferrer"
         class="btn-shine px-4 py-2.5 bg-slate-800/80 hover:bg-slate-700/80 text-white text-sm font-medium rounded-xl transition-all border border-slate-700/50 flex items-center gap-2">
         <i data-lucide="code-xml" class="w-4 h-4"></i> ${repository.label}
       </a>`,
          )
          .join("");

  const domainBtn =
    project.domain && project.domain !== "Sin dominio"
      ? `<a href="${project.domain}" target="_blank" rel="noopener noreferrer"
         class="btn-shine px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium rounded-xl transition-all flex items-center gap-2 shadow-lg shadow-indigo-500/15">
         <i data-lucide="external-link" class="w-4 h-4"></i> Demo
       </a>`
      : `<span class="px-4 py-2.5 bg-slate-800/60 text-slate-500 text-sm font-medium rounded-xl flex items-center gap-2">
         <i data-lucide="globe" class="w-4 h-4"></i> Sin Dominio
       </span>`;
  const projectType = {
    independent: "Proyecto independiente",
    company: "Pangea Renuevo Solutions",
    academic: "Proyecto universitario",
  }[project.type];

  card.innerHTML = `
    <div class="flex flex-col">
      <div class="project-image-wrap">
        <img src="${project.image}" alt="Vista previa de ${project.title}" class="project-image" loading="lazy" />
      </div>
      <div class="p-7 flex flex-col justify-between">
        <div>
          <div class="flex flex-wrap items-center gap-2.5 mb-3">
            <h4 class="text-2xl font-bold text-white">${project.title}</h4>
            <span class="px-2.5 py-1 bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 rounded-lg text-xs font-medium">${projectType}</span>
          </div>
          <p class="text-sm text-slate-300 mb-3">${project.role}</p>
          <p class="text-slate-400 text-sm leading-relaxed mb-5">${project.description}</p>
          <div class="flex flex-wrap gap-2 mb-6">
            ${[...project.technologies, "Y más"].map((t) => `<span class="tech-badge inline-flex items-center gap-1.5 px-2.5 py-1 bg-slate-800/50 text-indigo-300 border border-indigo-500/15 rounded-lg text-xs font-mono">${renderTechnologyIcon(t)}${t}</span>`).join("")}
          </div>
        </div>
        <div class="flex gap-3 pt-5 border-t border-slate-800/60">
          ${repoBtn}
          ${domainBtn}
        </div>
      </div>
    </div>
  `;
  projectsContainer.appendChild(card);
});

/* ═══════════════════════════════════════════
   4. Initialize Lucide Icons
   ═══════════════════════════════════════════ */
lucide.createIcons();

/* ═══════════════════════════════════════════
   5. Typed.js — Typewriter Effect
   ═══════════════════════════════════════════ */
new Typed("#user-title", {
  strings: [
    profileData.title,
    "Arquitectura de productos web",
    "Integración de servicios de IA",
  ],
  typeSpeed: 45,
  backSpeed: 25,
  backDelay: 2500,
  startDelay: 1200,
  loop: true,
  showCursor: true,
  cursorChar: "▌",
});

/* ═══════════════════════════════════════════
   6. GSAP Animations
   ═══════════════════════════════════════════ */
gsap.registerPlugin(ScrollTrigger);

// Hero — staggered entrance
gsap.set(".hero-element", { y: 40 });
gsap.to(".hero-element", {
  opacity: 1,
  y: 0,
  duration: 1,
  stagger: 0.15,
  ease: "power3.out",
  delay: 0.3,
});

// Scroll indicator — delayed fade in
gsap.to(".scroll-indicator-wrap", {
  opacity: 1,
  duration: 1,
  delay: 2.2,
});

// Sections — reveal on scroll
gsap.utils.toArray(".reveal").forEach((section) => {
  gsap.set(section, { y: 50 });
  gsap.to(section, {
    opacity: 1,
    y: 0,
    duration: 1,
    ease: "power3.out",
    scrollTrigger: {
      trigger: section,
      start: "top 85%",
      once: true,
    },
  });
});
