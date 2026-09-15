import { profileData } from './data.js';

document.addEventListener('DOMContentLoaded', () => {
    // Render Header
    document.getElementById('user-name').textContent = profileData.name;
    document.getElementById('user-title').textContent = profileData.title;
    document.getElementById('user-summary').textContent = profileData.summary;

    const linksContainer = document.getElementById('user-links');
    linksContainer.innerHTML = `
        <a href="${profileData.contact.github}" target="_blank" rel="noopener noreferrer" class="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-medium rounded-lg transition-colors border border-slate-700">GitHub</a>
        <a href="mailto:${profileData.contact.email}" class="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-medium rounded-lg transition-colors">Contacto</a>
    `;

    // Render Experience
    const expContainer = document.getElementById('experience-container');
    profileData.experience.forEach(exp => {
        const card = document.createElement('div');
        card.className = 'bg-slate-900 border border-slate-800 rounded-xl p-6';
        card.innerHTML = `
            <div class="flex justify-between items-start mb-2">
                <h4 class="text-xl font-bold text-white">${exp.role} - <span class="text-indigo-400">${exp.company}</span></h4>
                <span class="text-xs font-mono bg-slate-800 text-slate-300 px-3 py-1 rounded-full border border-slate-700">${exp.period}</span>
            </div>
            <p class="text-slate-400 text-sm leading-relaxed">${exp.description}</p>
        `;
        expContainer.appendChild(card);
    });

    // Render Skills
    const skillsContainer = document.getElementById('skills-container');
    Object.entries(profileData.skills).forEach(([category, items]) => {
        const card = document.createElement('div');
        card.className = 'bg-slate-900 border border-slate-800 rounded-xl p-5';
        card.innerHTML = `
            <h4 class="text-indigo-400 font-bold uppercase text-xs tracking-wider mb-4">${category}</h4>
            <div class="flex flex-wrap gap-2">
                ${items.map(tech => `<span class="px-3 py-1 bg-slate-800 text-slate-300 rounded-md text-sm">${tech}</span>`).join('')}
            </div>
        `;
        skillsContainer.appendChild(card);
    });

    // Render Projects
    const projectsContainer = document.getElementById('projects-container');
    profileData.projects.forEach(project => {
        const projectCard = document.createElement('article');
        projectCard.className = 'bg-slate-900 border border-slate-800 rounded-xl overflow-hidden flex flex-col md:flex-row gap-6 p-6 transition-all hover:border-slate-700';

        const repoBtn = project.isPrivate || !project.repository
            ? `<span class="px-4 py-2 bg-slate-800 text-slate-500 text-sm font-medium rounded-lg cursor-not-allowed">Repositorio Privado</span>`
            : `<a href="${project.repository}" target="_blank" rel="noopener noreferrer" class="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white text-sm font-medium rounded-lg transition-colors border border-slate-700">Ver Código</a>`;

        const domainBtn = project.domain && project.domain !== "Sin dominio"
            ? `<a href="${project.domain}" target="_blank" rel="noopener noreferrer" class="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium rounded-lg transition-colors">Demo En Vivo</a>`
            : `<span class="px-4 py-2 bg-slate-800 text-slate-500 text-sm font-medium rounded-lg">Sin Dominio</span>`;

        projectCard.innerHTML = `
            <div class="md:w-1/2">
                <img src="${project.image}" alt="${project.title}" class="w-full h-48 md:h-full object-cover rounded-lg border border-slate-800" />
            </div>
            <div class="md:w-1/2 flex flex-col justify-between">
                <div>
                    <h4 class="text-2xl font-bold text-white mb-2">${project.title}</h4>
                    <p class="text-slate-400 text-sm leading-relaxed mb-4">${project.description}</p>
                    <div class="flex flex-wrap gap-2 mb-6">
                        ${project.technologies.map(tech => `<span class="px-2.5 py-1 bg-slate-800/80 text-indigo-300 border border-indigo-500/20 rounded text-xs font-mono">${tech}</span>`).join('')}
                    </div>
                </div>
                <div class="flex gap-3 pt-4 border-t border-slate-800/80">
                    ${repoBtn}
                    ${domainBtn}
                </div>
            </div>
        `;
        projectsContainer.appendChild(projectCard);
    });
});
