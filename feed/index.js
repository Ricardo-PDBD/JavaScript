//ativação dos elementos do html
const postButton = document.getElementById('bttn-post');
const postTxt = document.getElementById('field-text');
const feed = document.getElementById('feed');

//pegandos os posts salvos ao renderizar a página
const getPost = () => JSON.parse(localStorage.getItem('posts')) || [];

//salvamento dos posts no localStorage
const savePost = (posts) => {
    localStorage.setItem('posts', JSON.stringify(posts));
};

// fetch das imagens de gatinha da api
const fetchCatImg = async () => {
    const res = await fetch('https://api.thecatapi.com/v1/images/search');
    const data = await res.json();
    return data[0]?.url;
};

//função para renderizar os posts na tela
const renderPost = () => {
    feed.innerHTML = ''; //limpa o campo
    const posts = getPost(); //pega os posts do localStorage

    posts.sort((a, b) => new Date(b.date) - new Date(a.date)); //ordena os posts do mais recente para o mais antigo

    //cria o elemento em tela para ser renderizado e pega informação do localStorage para preencher os campos.
    posts.forEach((post, index) => {
        const postElement = document.createElement('div');
        postElement.classList.add('post');
        postElement.innerHTML = `
            <div class="post-header">
                <img src="${post.avatar}" alt="foto de perfil" class="avatar">
                <span>${post.username}</span>
            </div>
            <p>${post.text}</p>
            <img src="${post.catImage}" alt="imagem de gato" class="cat-image">
            <button class="like-button" data-index="${post.originalIndex}"><img src="./assets/coracao.png" class="coracao" alt="img de coração"> (${post.likes})</button>
        `;
        feed.appendChild(postElement); //renderiza os elementos no html
    });
};

//função para adicionar o post
const addPost = async () => {
    const text = postTxt.value.trim();
    if(!text) return;

    const catImage = await fetchCatImg();
    const newPost = {
        originalIndex: Date.now(),
        date: new Date().toISOString(),
        username: 'Usuário',
        avatar: 'https://placehold.co/72x72',
        text,
        catImage,
        likes: 0
    };

    const posts = getPost();
    posts.push(newPost);
    savePost(posts);
    postTxt.value = '';
    renderPost();
};

//função incrementar as curtidas
const handleLike = (originalIndex) => {
    const posts = getPost();
    const post = posts.find(p => p.originalIndex === originalIndex);
    post.likes += 1;
    savePost(posts);
    renderPost();
};

//evento de click no botão curtir
feed.addEventListener('click', (evt) => {
    if(evt.target.classList.contains('like-button')) {
        const originalIndex = evt.target.getAttribute('data-index');
        handleLike(Number(originalIndex));
    };
});

//chamando o evento click no botão postar
postButton.addEventListener('click', addPost);
//fazendo o carregamento da páginas com os elementos já salvos quando atualizar a página F5.
document.addEventListener('DOMContentLoaded', renderPost);