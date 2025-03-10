//lista das tarefas e status
const listaTarefas = [];

//função para adicionar uma terefa a lista
function addTask() {
    const input = document.getElementsByName('novaTarefa')[0];
    listaTarefas.push({descricao: input.value, status: false});

    input.value = '';
    input.focus();
    showList();
};

//cria a lista (li) dinamicamente e renderiza ela na tela
function showList() {
    const lista = document.getElementById('lista');
    lista.innerText = '';

    // organiza os false no começo da lista e true no final da lista
    listaTarefas.sort((a, b) => a.status - b.status);

    // cria os elementos da lista a medida que são adicionados 
    listaTarefas.forEach((tarefa, index) => {
        const item = document.createElement('li');

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.name = 'check';
        checkbox.checked = tarefa.status;

        //define a cor do status original
        item.style.color = tarefa.status ? '#11d821' : '#d81811';

        //função de evento click no checkbox que altera o status da tarefa para true ou false e altera cor
        checkbox.addEventListener('click', () => {
            listaTarefas[index].status = checkbox.checked;
            item.style.color = checkbox.checked ? '#11d821' : '#d81811';
            showList();
        });

        item.appendChild(checkbox);
        item.appendChild(document.createTextNode(tarefa.descricao));
        lista.appendChild(item);
    });
    
};

showList();