// app.js
document.getElementById("campo-pesquisa").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        pesquisar();
    }
});

function pesquisar() {
    let section = document.getElementById("resultados-pesquisa");
    let campoPesquisa = document.getElementById("campo-pesquisa").value;

    if (!campoPesquisa) {
        mostrarPopup("Nada foi encontrado. Você precisa digitar o nome de um componente ou termo.");
        return;
    }

    campoPesquisa = campoPesquisa.toLowerCase();
    let resultados = "";

    for (let dado of dados) {
        let titulo = dado.titulo.toLowerCase();
        let descricao = dado.descricao.toLowerCase();
        let tags = dado.tags.toLowerCase();

        if (titulo.includes(campoPesquisa) || descricao.includes(campoPesquisa) || tags.includes(campoPesquisa)) {
            resultados += `
            <div class="item-resultado">
                <h2>
                    <a href="${dado.link}" target="_blank">${dado.titulo}</a>
                </h2>
                <p class="descricao-meta">${dado.descricao}</p>
                <a href="${dado.link}" target="_blank">Mais informações</a>
            </div>
            `;
        }
    }

    if (!resultados) {
        mostrarPopup("Nada foi encontrado");
    } else {
        section.innerHTML = resultados;
    }
}

function mostrarPopup(mensagem) {
    const popup = document.getElementById('popup');
    popup.querySelector('p').textContent = mensagem;
    popup.classList.add('show');
    setTimeout(() => {
        popup.classList.remove('show');
    }, 3000); // Fecha o popup automaticamente após 3 segundos
}

function fecharPopup() {
    const popup = document.getElementById('popup');
    popup.style.display = 'none';
}

function iniciarQuiz() {
    const quizPopup = document.getElementById('quiz-popup');
    const quizContent = document.getElementById('quiz-content');
    quizContent.innerHTML = gerarQuiz();
    quizPopup.classList.add('show');
    mostrarPagina(0); // Inicia o quiz na primeira página
}

function fecharQuiz() {
    const quizPopup = document.getElementById('quiz-popup');
    quizPopup.classList.remove('show');
}

let paginaAtual = 0;
const questoesPorPagina = 3; // Número de questões por página

function gerarQuiz() {
    const questoes = [
        {
            pergunta: "Qual componente é responsável por executar as instruções e processar dados no computador?",
            opcoes: ["Memória RAM", "Placa de vídeo", "Processador", "Disco rígido"],
            resposta: "Processador"
        },
        {
            pergunta: "Qual é a função principal da memória RAM?",
            opcoes: ["Armazenar dados permanentemente", "Processar gráficos", "Armazenar dados temporariamente", "Conectar componentes"],
            resposta: "Armazenar dados temporariamente"
        },
        {
            pergunta: "Qual componente é usado para armazenar dados permanentemente?",
            opcoes: ["Memória RAM", "Placa-mãe", "Disco rígido", "Fonte de alimentação"],
            resposta: "Disco rígido"
        },
        {
            pergunta: "Qual componente é responsável por renderizar imagens e vídeos?",
            opcoes: ["Processador", "Placa de vídeo", "Memória RAM", "Placa-mãe"],
            resposta: "Placa de vídeo"
        },
        {
            pergunta: "Qual é a função da fonte de alimentação em um computador?",
            opcoes: ["Fornecer energia elétrica", "Processar dados", "Armazenar dados", "Conectar componentes"],
            resposta: "Fornecer energia elétrica"
        },
        {
            pergunta: "Qual componente é considerado o 'cérebro' do computador?",
            opcoes: ["Placa-mãe", "Processador", "Memória RAM", "Disco rígido"],
            resposta: "Processador"
        },
        {
            pergunta: "Qual componente conecta todos os outros componentes do computador?",
            opcoes: ["Processador", "Placa-mãe", "Memória RAM", "Fonte de alimentação"],
            resposta: "Placa-mãe"
        },
        {
            pergunta: "Qual é a função da placa-mãe?",
            opcoes: ["Armazenar dados", "Conectar e permitir a comunicação entre todos os componentes", "Processar gráficos", "Fornecer energia"],
            resposta: "Conectar e permitir a comunicação entre todos os componentes"
        },
        {
            pergunta: "Qual componente é usado para aumentar a capacidade de armazenamento de um computador?",
            opcoes: ["Memória RAM", "Placa de vídeo", "Disco rígido", "Fonte de alimentação"],
            resposta: "Disco rígido"
        },
        {
            pergunta: "Qual é a função da memória cache?",
            opcoes: ["Armazenar dados permanentemente", "Acelerar o acesso aos dados frequentemente usados pelo processador", "Renderizar gráficos", "Fornecer energia"],
            resposta: "Acelerar o acesso aos dados frequentemente usados pelo processador"
        }
    ];

    let quizHtml = "";
    questoes.forEach((questao, index) => {
        quizHtml += `
        <div class="questao" data-resposta="${questao.resposta}" style="display: none;">
            <p>${index + 1}. ${questao.pergunta}</p>
            ${questao.opcoes.map(opcao => `
                <label>
                    <input type="radio" name="questao${index}" value="${opcao}">
                    ${opcao}
                </label>
            `).join('')}
        </div>
        `;
    });

    return quizHtml;
}

function mostrarPagina(pagina) {
    const questoes = document.querySelectorAll('.questao');
    questoes.forEach((questao, index) => {
        questao.style.display = (index >= pagina * questoesPorPagina && index < (pagina + 1) * questoesPorPagina) ? 'block' : 'none';
    });

    document.getElementById('prev-btn').style.display = pagina === 0 ? 'none' : 'inline-block';
    document.getElementById('next-btn').style.display = pagina === Math.ceil(questoes.length / questoesPorPagina) - 1 ? 'none' : 'inline-block';
    document.getElementById('submit-btn').style.display = pagina === Math.ceil(questoes.length / questoesPorPagina) - 1 ? 'inline-block' : 'none';
}

function paginaAnterior() {
    if (paginaAtual > 0) {
        paginaAtual--;
        mostrarPagina(paginaAtual);
    }
}

function proximaPagina() {
    const questoes = document.querySelectorAll('.questao');
    if (paginaAtual < Math.ceil(questoes.length / questoesPorPagina) - 1) {
        paginaAtual++;
        mostrarPagina(paginaAtual);
    }
}

function enviarRespostas() {
    const questoes = document.querySelectorAll('.questao');
    let corretas = 0;

    questoes.forEach(questao => {
        const respostaCorreta = questao.getAttribute('data-resposta');
        const opcoes = questao.querySelectorAll('input[type="radio"]');
        let respostaSelecionada = null;

        opcoes.forEach(opcao => {
            if (opcao.checked) {
                respostaSelecionada = opcao.value;
            }
        });

        if (respostaSelecionada === respostaCorreta) {
            corretas++;
        }
    });

    const totalQuestoes = questoes.length;
    const porcentagemCorretas = (corretas / totalQuestoes) * 100;

    const resultadoPopup = document.getElementById('resultado-popup');
    const resultadoMensagem = document.getElementById('resultado-mensagem');
    resultadoMensagem.textContent = `Parabéns! Você acertou ${corretas} de ${totalQuestoes} questões (${porcentagemCorretas.toFixed(2)}%).`;
    resultadoPopup.classList.add('show');

    // Fecha o popup do quiz
    fecharQuiz();

    // Fecha o popup de resultado automaticamente após 5 segundos
    setTimeout(fecharResultado, 5000);

    // Adiciona efeito de confete se a porcentagem de acertos for maior que 80%
    if (porcentagemCorretas > 80) {
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 }
        });
    }

    // Adiciona mensagem de incentivo se a porcentagem de acertos for menor que 60%
    if (porcentagemCorretas < 60) {
        resultadoMensagem.textContent += "\nContinue se esforçando, você consegue!";
    }
}


function fecharQuiz() {
    const quizPopup = document.getElementById('quiz-popup');
    quizPopup.classList.remove('show');
}


function fecharResultado() {
    const resultadoPopup = document.getElementById('resultado-popup');
    resultadoPopup.classList.remove('show');
}

