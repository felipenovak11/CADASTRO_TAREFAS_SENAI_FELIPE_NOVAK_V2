const campoTarefa = document.getElementById("campo-tarefa");
const botaoAdicionar = document.getElementById("botao-adicionar");
const listaTarefas = document.getElementById("lista-tarefas");
const contadorTarefas = document.getElementById("contador-tarefas");
const botaoTema = document.getElementById("botao-alterar-tema");
const botaoLimparTudo = document.getElementById("botao-limpar-tudo");
const listaHistorico = document.getElementById("lista-historico");


let tarefas = [];

let tarefasHistorico = [];

function salvarTarefas() {
    const todasAsTarefas = [...tarefas, ...tarefasHistorico];
    localStorage.setItem("minhasTarefas", JSON.stringify(todasAsTarefas));
}

function carregarTarefas() {
    const tarefasSalvas = localStorage.getItem("minhasTarefas");
    if (tarefasSalvas) {
        tarefasHistorico = JSON.parse(tarefasSalvas);
        mostrarHistorico();
    }
    
    tarefas = []; 
    mostrarTarefas();
    mostrarTarefas(); 
}

function mostrarHistorico() {
    listaHistorico.innerHTML = "";

    tarefasHistorico.forEach((tarefa, indice) => {
        const item = document.createElement("li");
        item.className = "item-tarefa";

        const texto = document.createElement("span");
        texto.textContent = tarefa.nome;

        if (tarefa.concluida) {
            texto.classList.add("concluida");
        }

        const botoes = document.createElement("div");
        botoes.className = "botoes-tarefa";

        const botaoConcluir = document.createElement("button");
        botaoConcluir.innerHTML = '<i class="fa-solid fa-check"></i>';
        botaoConcluir.className = "botao-concluir";
        botaoConcluir.title = "Concluir tarefa";

        botaoConcluir.addEventListener("click", function() {
            tarefasHistorico[indice].concluida = !tarefasHistorico[indice].concluida;
            salvarTarefas();
            mostrarHistorico();
        });

        const botaoExcluir = document.createElement("button");
        botaoExcluir.innerHTML = '<i class="fa-solid fa-trash"></i>';
        botaoExcluir.className = "botao-excluir";
        botaoExcluir.title = "Excluir tarefa";

        botaoExcluir.addEventListener("click", function() {
            tarefasHistorico.splice(indice, 1);
            salvarTarefas();
            mostrarHistorico();
        });

        botoes.appendChild(botaoConcluir);
        botoes.appendChild(botaoExcluir);

        item.appendChild(texto);
        item.appendChild(botoes);

        listaHistorico.appendChild(item);
    });
}

function adicionarTarefa() {
    const texto = campoTarefa.value.trim();

    if (texto === "") {
        alert("Digite uma tarefa!");
        return;
    }

    const tarefa = {
        nome: texto,
        concluida: false
    };

    tarefas.push(tarefa);
    campoTarefa.value = "";

    salvarTarefas();

    mostrarTarefas();
}

function mostrarTarefas() {
    listaTarefas.innerHTML = "";

    tarefas.forEach((tarefa, indice) => {
        const item = document.createElement("li");
        item.className = "item-tarefa";

        const texto = document.createElement("span");
        texto.textContent = tarefa.nome;

        if (tarefa.concluida) {
            texto.classList.add("concluida");
        }

        const botoes = document.createElement("div");
        botoes.className = "botoes-tarefa";

        const botaoConcluir = document.createElement("button");
        botaoConcluir.innerHTML = '<i class="fa-solid fa-check"></i>';
        botaoConcluir.className = "botao-concluir";
        botaoConcluir.title = "Concluir tarefa";

        botaoConcluir.addEventListener("click", function() {
            tarefas[indice].concluida = !tarefas[indice].concluida;
            salvarTarefas();
            mostrarTarefas();
        });

        const botaoExcluir = document.createElement("button");
        botaoExcluir.innerHTML = '<i class="fa-solid fa-trash"></i>';
        botaoExcluir.className = "botao-excluir";
        botaoExcluir.title = "Excluir tarefa";

        botaoExcluir.addEventListener("click", function() {
            tarefas.splice(indice, 1);
            salvarTarefas();
            mostrarTarefas();
        });

        botoes.appendChild(botaoConcluir);
        botoes.appendChild(botaoExcluir);

        item.appendChild(texto);
        item.appendChild(botoes);

        listaTarefas.appendChild(item);
    });

    contadorTarefas.textContent =
        tarefas.length + (tarefas.length === 1
            ? " tarefa na lista"
            : " tarefas na lista");
}

botaoAdicionar.addEventListener("click", adicionarTarefa);

campoTarefa.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        adicionarTarefa();
    }
});

botaoTema.addEventListener("click", function() {
    document.body.classList.toggle("tema-escuro");

    const icone = botaoTema.querySelector("i");

    if (document.body.classList.contains("tema-escuro")) {
        icone.className = "fa-solid fa-sun";
    } else {
        icone.className = "fa-solid fa-moon";
    }
});

botaoLimparTudo.addEventListener("click", function() {
    if (tarefas.length === 0 && tarefasHistorico.length === 0) {
        alert("Suas listas já estão vazias!");
        return;
    }

    if (confirm("Tem certeza que deseja apagar absolutamente todas as tarefas?")) {
        tarefas = []; 
        tarefasHistorico = [];
        salvarTarefas(); 
        mostrarTarefas(); 
        mostrarHistorico();
    }
});


carregarTarefas(); 