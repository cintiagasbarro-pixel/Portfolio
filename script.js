// Menu progressivo: sem JavaScript, os links continuam visíveis no celular.
document.documentElement.classList.add('js');

const menuButton = document.querySelector('.menu-toggle');
const menu = document.querySelector('#menu');

function closeMenu() {
  menu.classList.remove('is-open');
  menuButton.setAttribute('aria-expanded', 'false');
}

menuButton.addEventListener('click', () => {
  const isOpen = menu.classList.toggle('is-open');
  menuButton.setAttribute('aria-expanded', String(isOpen));
});

menu.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', closeMenu);
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && menu.classList.contains('is-open')) {
    closeMenu();
    menuButton.focus();
  }
});

window.matchMedia('(min-width: 761px)').addEventListener('change', closeMenu);
document.querySelector('#year').textContent = new Date().getFullYear();

// PERSONALIZE: descrições ilustrativas; nenhum projeto real está vinculado.
const projects = {
  focus: {
    title: 'Focus — Lista de tarefas',
    description: 'Ideia para praticar manipulação do DOM, eventos e localStorage. Uma implementação real poderia permitir criar, concluir, filtrar e excluir tarefas.'
  },
  biblioteca: {
    title: 'Biblioteca digital',
    description: 'Ideia acadêmica para estudar buscas, categorias e relacionamentos entre livros e autores. Uma implementação completa precisaria conectar a interface a um serviço e banco de dados.'
  },
  painel: {
    title: 'Painel financeiro',
    description: 'Ideia para praticar cálculos com JavaScript e apresentação de dados. Uma implementação real poderia registrar entradas e saídas e calcular o saldo do mês.'
  }
};

const projectDialog = document.querySelector('#project-dialog');
document.querySelectorAll('.project-details').forEach((button) => {
  button.addEventListener('click', () => {
    const project = projects[button.dataset.project];
    document.querySelector('#dialog-title').textContent = project.title;
    document.querySelector('#dialog-description').textContent = project.description;
    projectDialog.showModal();
  });
});

document.querySelector('#close-dialog').addEventListener('click', () => projectDialog.close());
projectDialog.addEventListener('click', (event) => {
  const bounds = projectDialog.getBoundingClientRect();
  if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) {
    projectDialog.close();
  }
});

const copyButton = document.querySelector('#copy-email');
const copyStatus = document.querySelector('#copy-status');
copyButton.addEventListener('click', async () => {
  // PERSONALIZE: example.com é um domínio reservado para exemplos.
  const email = document.querySelector('.email').textContent.trim();
  try {
    await navigator.clipboard.writeText(email);
    copyStatus.textContent = 'E-mail fictício copiado. Substitua pelo seu contato real.';
  } catch {
    // Abrir via file:// pode impedir a área de transferência em alguns navegadores.
    copyStatus.textContent = `Copie manualmente o e-mail fictício: ${email}`;
  }
});
