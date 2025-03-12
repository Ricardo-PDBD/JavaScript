async function carregaDev() {
    const username = document.getElementById('procura').value.trim();
    const divDados = document.getElementById('dados');
    //iniciando os dados vazios
    divDados.innerHTML = '';

    //fazendo fetch da api com os dados dos usuários
    try {
        const res = await fetch(`https://api.github.com/users/${username}`);
        if(!res.ok) {
            divDados.innerHTML = '<p>Não foram encontrados usuários para esta pesquisa.</p>' //mensagem para quando não for encontrado nenhum usuário.
            return;
        }

        const user = await res.json();
        //apresentando os dados na tela e criando divs para poder aplicar CSS
        divDados.innerHTML = `
        <div class="msg">
            <div class="nome">
                <strong>Nome: </strong> <span>${user.name}</span>
            </div> 
            <div class="user">
                <strong>Usuário: </strong> <span>${user.login}</span>
            </div>
            <div class="perfil"> 
                <strong>GitHub: </strong> <span>${user.html_url}</span>
            </div>
        </div>`;

    } catch(error) {
        divDados.innerHTML = '<p>Ocorreu um erro ao buscar usuário.</p>' //tratamento caso ocorra algum erro
    };

    //limpando campo de busca e retornando o focus para nova pesquisa.
    procura.value = '';
    procura.focus();
};

// evento para procurar apenas apertando o Enter, sem precisar clicar no botão
procura.addEventListener('keyup', function(evt) {
    if(evt.key === 'Enter') {
        carregaDev();
    }
})


