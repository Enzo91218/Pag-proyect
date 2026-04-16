// Animación suave de aparición cuando el usuario hace scroll.
const revealElements = document.querySelectorAll('.reveal');

const observerOptions = {
  threshold: 0.15,
};

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, observerOptions);

revealElements.forEach((element) => revealObserver.observe(element));

// Agrega interacciones adicionales para los botones del héroe si se desea.
const links = document.querySelectorAll('.nav-links a, .hero-actions a');
links.forEach((link) => {
  link.addEventListener('click', () => {
    document.body.style.overflowAnchor = 'none';
  });
});

const ADMIN_PASSWORD = 'enzo123'; // Cambia esta contraseña en tu proyecto.
const addProjectBtn = document.getElementById('addProjectBtn');
const projectModal = document.getElementById('projectModal');
const closeModalBtn = document.getElementById('closeModal');
const newProjectForm = document.getElementById('newProjectForm');
const projectGrid = document.getElementById('projectGrid');

const openModal = () => {
  projectModal.classList.add('visible');
  projectModal.setAttribute('aria-hidden', 'false');
};

const closeModal = () => {
  projectModal.classList.remove('visible');
  projectModal.setAttribute('aria-hidden', 'true');
};

addProjectBtn.addEventListener('click', () => {
  const password = prompt('Introduce la contraseña para agregar un proyecto:');
  if (password === null) return;
  if (password === ADMIN_PASSWORD) {
    openModal();
  } else {
    alert('Contraseña incorrecta. No puedes agregar el proyecto.');
  }
});

closeModalBtn.addEventListener('click', closeModal);
projectModal.addEventListener('click', (event) => {
  if (event.target === projectModal) {
    closeModal();
  }
});

const createCommentItem = (author, comment) => {
  const item = document.createElement('div');
  item.className = 'comment-item';
  item.innerHTML = `<strong>${author}</strong><p>${comment}</p>`;
  return item;
};

const setupCommentForm = (card) => {
  const form = card.querySelector('.comment-form');
  const commentsList = card.querySelector('.comments-list');
  if (!form || !commentsList) return;

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const author = form.author.value.trim();
    const comment = form.comment.value.trim();
    if (!author || !comment) return;

    const commentItem = createCommentItem(author, comment);
    commentsList.appendChild(commentItem);
    form.reset();
  });
};

const createProjectCard = ({ title, description, tech, github, demo }) => {
  const card = document.createElement('article');
  card.className = 'project-card reveal';
  const techTags = tech
    .split(',')
    .map((value) => value.trim())
    .filter(Boolean)
    .map((tag) => `<span>${tag}</span>`)
    .join('');

  const demoLink = demo
    ? `<a class="text-link" href="${demo}" target="_blank" rel="noreferrer">Demo</a>`
    : '<span class="text-link disabled">Demo no disponible</span>';

  card.innerHTML = `
    <div class="project-header">
      <h3>${title}</h3>
      <p>${description}</p>
    </div>
    <div class="project-tech">
      ${techTags}
    </div>
    <div class="project-actions">
      <a class="text-link" href="${github}" target="_blank" rel="noreferrer">GitHub</a>
      ${demoLink}
    </div>
    <div class="comment-section">
      <p class="comment-title">Comentarios</p>
      <div class="comments-list"></div>
      <form class="comment-form">
        <input type="text" name="author" placeholder="Tu nombre" required />
        <textarea name="comment" placeholder="Escribe una sugerencia o lo que te pareció" rows="3" required></textarea>
        <button class="btn btn-secondary" type="submit">Enviar comentario</button>
      </form>
    </div>
  `;

  return card;
};

newProjectForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const formData = new FormData(newProjectForm);
  const title = formData.get('title').trim();
  const description = formData.get('description').trim();
  const tech = formData.get('tech').trim();
  const github = formData.get('github').trim();
  const demo = formData.get('demo').trim();

  const newCard = createProjectCard({
    title,
    description,
    tech,
    github,
    demo,
  });

  projectGrid.appendChild(newCard);
  setupCommentForm(newCard);
  revealObserver.observe(newCard);
  newProjectForm.reset();
  closeModal();
});

const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach((card) => setupCommentForm(card));
