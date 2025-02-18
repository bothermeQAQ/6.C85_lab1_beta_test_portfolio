async function loadProjects() {
    try {
      const res = await fetch('/lib/projects.json');
      if (!res.ok) {
        throw new Error('HTTP ' + res.status);
      }
      const projects = await res.json();
      console.log('Loaded projects:', projects);
      const projectsContainer = document.querySelector('.projects');
      const projectsTitle = document.querySelector('.projects-title');
      if (projectsTitle) {
        projectsTitle.textContent = projects.length + ' Projects';
      }
      projectsContainer.innerHTML = '';
      projects.forEach(p => {
        const article = document.createElement('article');
        const h2 = document.createElement('h2');
        h2.textContent = p.title;
        article.appendChild(h2);
        if (p.image) {
          const img = document.createElement('img');
          img.src = p.image;
          img.alt = p.title;
          article.appendChild(img);
        }
        const para = document.createElement('p');
        para.textContent = p.description + ' ';
        if (p.link) {
          const a = document.createElement('a');
          a.href = p.link;
          a.target = '_blank';
          a.rel = 'noopener noreferrer';
          a.textContent = 'View Project';
          para.appendChild(a);
        }
        article.appendChild(para);
        projectsContainer.appendChild(article);
      });
    } catch (err) {
      console.error('Error loading projects:', err);
    }
  }
  
  loadProjects();
  