function gerarNome() {
    // Requisição para o arquivo de nomes
    fetch('data/pessoas.txt')
        .then(response => response.text())
        .then(nomesText => {
            const nomes = nomesText.split('\n');

            // Requisição para o arquivo de nomes de empresas
            fetch('data/empresas.txt')
                .then(response => response.text())
                .then(empresasText => {
                    const empresas = empresasText.split('\n');

                    // Selecionando um nome aleatório
                    const nomeAleatorio = nomes[Math.floor(Math.random() * nomes.length)];
                    // Selecionando uma empresa aleatória
                    const empresaAleatoria = empresas[Math.floor(Math.random() * empresas.length)];
                    // Gerando um número aleatório entre 200 e 5 milhões
                    const numeroAleatorio = (Math.random() * (5000000 - 200) + 200).toFixed(2);
                    // Gerando uma data com a distância de 1 mês
                    const dataAleatoria = gerarDataAleatoria();

                    // Exibindo o nome pessoal aleatório
                    document.getElementById('nomePessoal').innerText = nomeAleatorio;
                    // Exibindo o nome da empresa aleatória
                    document.getElementById('nomeEmpresa').innerText = empresaAleatoria;
                    // Exibindo o número aleatório no formato BRL
                    document.getElementById('numeroAleatorio').innerText = 'R$ ' + formatarNumeroBRL(numeroAleatorio);
                    // Exibindo a data aleatória
                    document.getElementById('dataAleatoria').innerText = dataAleatoria.toLocaleDateString('pt-BR');

                    // Iniciar o cronômetro
                    iniciarCronometro();
                })
                .catch(error => console.error('Erro ao ler o arquivo de nomes de empresas:', error));
        })
        .catch(error => console.error('Erro ao ler o arquivo de nomes:', error));
}
// Função para formatar o número no formato BRL
function formatarNumeroBRL(numero) {
    return numero.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

// Função para gerar uma data com a distância de 1 mês
function gerarDataAleatoria() {
    const hoje = new Date();
    hoje.setMonth(hoje.getMonth() + 1);
    return hoje;
}

// Função para iniciar o cronômetro
function iniciarCronometro() {
    let segundos = 0;
    let minutos = 0;
    let horas = 0;
    const cronometroElement = document.getElementById('cronometro');

    const atualizarCronometro = () => {
        segundos++;
        if (segundos >= 60) {
            segundos = 0;
            minutos++;
            if (minutos >= 60) {
                minutos = 0;
                horas++;
            }
        }
        cronometroElement.innerText = `${horas}:${minutos}:${segundos}`;
    };

    setInterval(atualizarCronometro, 1000);
}