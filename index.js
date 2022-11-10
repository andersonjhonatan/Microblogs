import './style.css';

import {
  fillUsersSelect,
  fillPosts,
  fillFeaturedPostComments,
  clearPageData,
  fillErrorMessage,
} from './utils/updateUI';

const usersSelect = document.querySelector('#users-select');

const USERS_API = 'https://dummyjson.com/users';
// faça a lógica para pegar as informações das pessoas usuárias e preencher o select aqui.
fetch(USERS_API)
.then((respons) => respons.json())
.then((data) => {
  const { users } = data;
  // Chama a função auxiliar para preencher os nomes e ids no select users-select
  fillUsersSelect(users)
})
usersSelect.addEventListener('change', () => {
  clearPageData();
  const POSTS_API = `https://dummyjson.com/posts/user/${usersSelect.value}`
  fetch(POSTS_API)
  .then((response) => response.json())
  .then((data) => {
    const { posts } = data;
    fillPosts(posts);
    
    const [featuredPost] = posts
    const COMMENS_API = `https://dummyjson.com/posts/${featuredPost.id}/comments`

  // Faz um fetch para a API de comentários
  // Repare que é feito o return do fetch (que retorna uma promise),
  // dessa forma é possível encadear mais um `.then` na sequência
    return fetch(COMMENS_API);
  })
  .then((resp) => resp.json())
  .then((data) => {
    const { comments } = data;
    fillFeaturedPostComments(comments)
  })
  // Define um catch para tratar qualquer erro que aconteça durante o processo
  .catch((error) => {
    fillErrorMessage('Erro ao recuperar Informações');
    console.log(error.message)
  })
  // faça a lógica para pegar as informações dos posts da pessoa selecionada e dos comentários do post destacado aqui.
});
