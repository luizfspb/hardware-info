// app.js
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
    popup.style.display = 'block';
}

function fecharPopup() {
    const popup = document.getElementById('popup');
    popup.style.display = 'none';
}
