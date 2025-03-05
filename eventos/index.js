
const bttn = document.getElementById('bttn-like');

const listaCurtidas = [];

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
};


bttn.addEventListener('click', addName);