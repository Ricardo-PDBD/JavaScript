
const bttn = document.getElementById('bttn-like');
const bttnDel = document.getElementById('bttn-del');

//fazer o carregamento do storage junto com a página
const listaCurtidas = JSON.parse(localStorage.getItem('curtidas')) || [];

const addName = () => {
    const input = document.getElementById('nome');
    const valor = input.value.trim();
    const paragrafo = document.getElementById('paragrafo');

    // verifica se o nome já existe na lista e retorna um alert caso exista.
    if(listaCurtidas.includes(valor)) {
        alert('nome já existente.');
        return;
    } else if(valor !== '') {
        listaCurtidas.push(valor);
    };

    //salva as curtidas no LocalStorage
    localStorage.setItem('curtidas', JSON.stringify(listaCurtidas));

    //limpa o campo e volta o focus pra digitar novamente.
    input.value = '';
    input.focus();

    //atualiza o texto do paragrafo
    if(listaCurtidas.length === 1){
       paragrafo.textContent =`${listaCurtidas[0]} curtiu!`
    } else if(listaCurtidas.length === 2) {
        paragrafo.textContent =`${listaCurtidas[0]} e ${listaCurtidas[1]} curtiram!`
    } else if(listaCurtidas.length > 2) {
        paragrafo.textContent =`${listaCurtidas[0]}, ${listaCurtidas[1]} e mais ${(listaCurtidas.length - 2)} pessoas curtiram!`
    } else 'Ninguém curtiu.';

    //atualiza o localStorage
    localStorage.setItem('curtidas', JSON.stringify(listaCurtidas));
};

//carrega a página mantendo as curtidas
window.addEventListener('load', () => {
    if(listaCurtidas.length === 1){
        paragrafo.textContent =`${listaCurtidas[0]} curtiu!`
     } else if(listaCurtidas.length === 2) {
         paragrafo.textContent =`${listaCurtidas[0]} e ${listaCurtidas[1]} curtiram!`
     } else if(listaCurtidas.length > 2) {
         paragrafo.textContent =`${listaCurtidas[0]}, ${listaCurtidas[1]} e mais ${(listaCurtidas.length - 2)} pessoas curtiram!`
     } else 'Ninguém curtiu.';
});

//o botão apagar curtidas faz o clear no localStorage e na lista de curtidas, voltando o texto default.
bttnDel.addEventListener('click', () => {
    localStorage.removeItem('curtidas');
    listaCurtidas.length = 0;
    const paragrafo = document.getElementById('paragrafo');
    paragrafo.textContent = 'Ninguém curtiu.';
});

bttn.addEventListener('click', addName);