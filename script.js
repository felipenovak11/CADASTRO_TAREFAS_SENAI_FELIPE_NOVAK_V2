const campoTarefa = document.getElementById("campo-tarefa");
const botaoAdicionar = document.getElementById("botao-adicionar");
const listaTarefas = document.getElementById("lista-tarefas");
const contadorTarefas = document.getElementById("contador-tarefas");
const botaoTema = document.getElementById("botao-alterar-tema");
const botaoLimparTudo = document.getElementById("botao-limpar-tudo");
const listaHistorico = document.getElementById("lista-historico");

// NOVOS ELEMENTOS MAPEADOS
const dataTarefa = document.getElementById("data-tarefa");
const prioridadeTarefa = document.getElementById("prioridade-tarefa");
const abas = document.querySelectorAll(".aba-item");

let tarefas = [];
let tarefasHistorico = [];
let abaAtual = "todas"; // Controla qual divisória está ativa

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
}

function formatarData(dataString) {
    if (!dataString) return "Sem prazo";
    const [ano, mes, dia] = dataString.split("-");
    return `${dia}/${mes}/${ano}`;
}

function mostrarHistorico() {
    listaHistorico.innerHTML = "";

    // Filtra também o histórico baseado na aba selecionada
    const historicoFiltrado = tarefasHistorico.filter(tarefa => {
        if (abaAtual === "pendentes") return !tarefa.concluida;
        if (abaAtual === "concluidas") return tarefa.concluida;
        return true;
    });

    historicoFiltrado.forEach((tarefa) => {
        const indiceReal = tarefasHistorico.indexOf(tarefa);

        const item = document.createElement("li");
        item.className = "item-tarefa";

        const conteudoTexto = document.createElement("div");
        conteudoTexto.className = "conteudo-tarefa-texto";

        const texto = document.createElement("span");
        texto.textContent = tarefa.nome;

        if (tarefa.concluida) {
            texto.classList.add("concluida");
        }

        // Adiciona data e prioridade se existirem
        const detalhes = document.createElement("div");
        detalhes.className = "detalhes-tarefa";
        detalhes.innerHTML = `<span>📅 ${formatarData(tarefa.data)}</span> <span class="prio-${tarefa.prioridade || 'Baixa'}">⚡ ${tarefa.prioridade || 'Baixa'}</span>`;

        conteudoTexto.appendChild(texto);
        conteudoTexto.appendChild(detalhes);

        const botoes = document.createElement("div");
        botoes.className = "botoes-tarefa";

        const botaoConcluir = document.createElement("button");
        botaoConcluir.innerHTML = '<i class="fa-solid fa-check"></i>';
        botaoConcluir.className = "botao-concluir";
        botaoConcluir.title = "Concluir tarefa";

        botaoConcluir.addEventListener("click", function() {
            tarefasHistorico[indiceReal].concluida = !tarefasHistorico[indiceReal].concluida;
            salvarTarefas();
            mostrarHistorico();
            mostrarTarefas();
        });

        const botaoExcluir = document.createElement("button");
        botaoExcluir.innerHTML = '<i class="fa-solid fa-trash"></i>';
        botaoExcluir.className = "botao-excluir";
        botaoExcluir.title = "Excluir tarefa";

        botaoExcluir.addEventListener("click", function() {
            tarefasHistorico.splice(indiceReal, 1);
            salvarTarefas();
            mostrarHistorico();
            mostrarTarefas();
        });

        botoes.appendChild(botaoConcluir);
        botoes.appendChild(botaoExcluir);

        item.appendChild(conteudoTexto);
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

    // Guardando com as novas propriedades de data e prioridade
    const tarefa = {
        nome: texto,
        concluida: false,
        data: dataTarefa.value,
        prioridade: prioridadeTarefa.value
    };

    tarefas.push(tarefa);
    campoTarefa.value = "";
    dataTarefa.value = "";
    prioridadeTarefa.value = "Baixa";

    salvarTarefas();
    mostrarTarefas();
}

function mostrarTarefas() {
    listaTarefas.innerHTML = "";

    // Filtra a lista atual baseado na aba selecionada
    const tarefasFiltradas = tarefas.filter(tarefa => {
        if (abaAtual === "pendentes") return !tarefa.concluida;
        if (abaAtual === "concluidas") return tarefa.concluida;
        return true;
    });

    tarefasFiltradas.forEach((tarefa) => {
        const indiceReal = tarefas.indexOf(tarefa);

        const item = document.createElement("li");
        item.className = "item-tarefa";

        const conteudoTexto = document.createElement("div");
        conteudoTexto.className = "conteudo-tarefa-texto";

        const texto = document.createElement("span");
        texto.textContent = tarefa.nome;

        if (tarefa.concluida) {
            texto.classList.add("concluida");
        }

        // Adiciona data e prioridade na exibição
        const detalhes = document.createElement("div");
        detalhes.className = "detalhes-tarefa";
        detalhes.innerHTML = `<span>📅 ${formatarData(tarefa.data)}</span> <span class="prio-${tarefa.prioridade || 'Baixa'}">⚡ ${tarefa.prioridade || 'Baixa'}</span>`;

        conteudoTexto.appendChild(texto);
        conteudoTexto.appendChild(detalhes);

        const botoes = document.createElement("div");
        botoes.className = "botoes-tarefa";

        const botaoConcluir = document.createElement("button");
        botaoConcluir.innerHTML = '<i class="fa-solid fa-check"></i>';
        botaoConcluir.className = "botao-concluir";
        botaoConcluir.title = "Concluir tarefa";

        botaoConcluir.addEventListener("click", function() {
            tarefas[indiceReal].concluida = !tarefas[indiceReal].concluida;
            salvarTarefas();
            mostrarTarefas();
            mostrarHistorico();
        });

        const botaoExcluir = document.createElement("button");
        botaoExcluir.innerHTML = '<i class="fa-solid fa-trash"></i>';
        botaoExcluir.className = "botao-excluir";
        botaoExcluir.title = "Excluir tarefa";

        botaoExcluir.addEventListener("click", function() {
            tarefas.splice(indiceReal, 1);
            salvarTarefas();
            mostrarTarefas();
            mostrarHistorico();
        });

        botoes.appendChild(botaoConcluir);
        botoes.appendChild(botaoExcluir);

        item.appendChild(conteudoTexto);
        item.appendChild(botoes);

        listaTarefas.appendChild(item);
    });

    contadorTarefas.textContent =
        tarefasFiltradas.length + (tarefasFiltradas.length === 1
            ? " tarefa na lista"
            : " tarefas na lista");
}

// LOGICA DE EVENTO PARA CLIQUE NAS ABAS
abas.forEach(aba => {
    aba.addEventListener("click", function() {
        abas.forEach(a => a.style.color = "var(--cor-concluido)");
        this.style.color = "var(--cor-primaria)";
        
        abaAtual = this.getAttribute("data-aba");
        mostrarTarefas();
        mostrarHistorico();
    });
});

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

// Substitua o bloco do popover no final do script por este atualizado:
const popover = document.getElementById("popover-atualizacoes");
const botaoFecharPopover = document.getElementById("botao-fechar-popover");
const botaoOkPopover = document.getElementById("popover-botao-ok");
const botaoAjudaPopover = document.getElementById("botao-ajuda-popover"); // MAPEADO

function fecharPopover() {
    popover.style.display = "none";
}

function abrirPopover() {
    popover.style.display = "flex"; // Faz o popover reaparecer na tela
}

// NOVO: Abre o popover ao clicar no ícone de interrogação
botaoAjudaPopover.addEventListener("click", abrirPopover);

// Fecha ao clicar no 'X'
botaoFecharPopover.addEventListener("click", fecharPopover);

// Fecha ao clicar no botão 'Entendido!'
botaoOkPopover.addEventListener("click", fecharPopover);

// Fecha se o usuário clicar fora da caixinha
window.addEventListener("click", function(event) {
    if (event.target === popover) {
        fecharPopover();
    }
});

