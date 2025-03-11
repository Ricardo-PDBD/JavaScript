//lista das tarefas e status (agora faz o carregamento junto com a página)
const listaTarefas = JSON.parse(localStorage.getItem('tarefas')) || [];

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

        //elemento checkbox
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.name = 'check';
        checkbox.checked = tarefa.status;
        // elemento button
        const botao = document.createElement('button');
        botao.style.width = '10px';
        botao.style.height = '10px';
        botao.style.display = 'flex';
        botao.style.justifyContent = 'center';
        botao.style.alignItems = 'center';
        botao.textContent = 'x';
        botao.style.background = '#d81811';

        //salva as tarefas no localStorage
        localStorage.setItem('tarefas', JSON.stringify(listaTarefas));

        //define a cor do status original
        item.style.color = tarefa.status ? '#11d821' : '#d81811';

        //função de evento click no checkbox que altera o status da tarefa para true ou false e altera cor
        checkbox.addEventListener('click', () => {
            listaTarefas[index].status = checkbox.checked;
            item.style.color = checkbox.checked ? '#11d821' : '#d81811';
            showList();
        });

        //evento de click no botao que remove da lista e remove do localStorage
        botao.addEventListener('click', () => {
            listaTarefas.splice(index, 1);
            showList();
        });

        item.appendChild(checkbox);
        item.appendChild(botao);
        item.appendChild(document.createTextNode(tarefa.descricao));
        lista.appendChild(item);

        //atualiza o localStorage
        localStorage.setItem('tarefas', JSON.stringify(listaTarefas));
    });
    
};

showList();