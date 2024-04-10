let intervaloCronometro; // Variável para armazenar o intervalo do cronômetro

function gerarNome() {
    // Limpar o intervalo do cronômetro se existir
    clearInterval(intervaloCronometro);

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
                    const numeroAleatorio = Math.random() * (1000000 - 200) + 200;
                    // Gerando datas com um intervalo de 1 mês
                    const [dataInicial, dataFinal] = gerarIntervaloDatas();

                    // Calculando o valor bruto, líquido e a taxa
                    const valorBruto = numeroAleatorio;
                    const taxa = Math.random() * (4.6 - 0.2) + 0.2; // Porcentagem entre 0.2% e 5%
                    const valorLiquido = valorBruto * (1 - taxa / 100);

                    // Exibindo as informações na página
                    document.getElementById('nomePessoal').innerText = nomeAleatorio;
                    document.getElementById('nomeEmpresa').innerText = empresaAleatoria;
                    document.getElementById('valorBruto').innerText = formatarNumeroBRL(valorBruto);
                    document.getElementById('valorLiquido').innerText = formatarNumeroBRL(valorLiquido);
                    document.getElementById('taxa').innerText = taxa.toFixed(2) + '%';
                    document.getElementById('dataAleatoria').innerText = `${formatarData(dataInicial)} - ${formatarData(dataFinal)}`;

                    // Iniciar o cronômetro
                    iniciarCronometro();
                })
                .catch(error => console.error('Erro ao ler o arquivo de nomes de empresas:', error));
        })
        .catch(error => console.error('Erro ao ler o arquivo de nomes:', error));
}

// Função para formatar o número no formato BRL com duas casas decimais
function formatarNumeroBRL(numero) {
    return 'R$ ' + numero.toLocaleString('pt-BR', { minimumFractionDigits: 2 });
}

// Função para formatar a data
function formatarData(data) {
    const dia = String(data.getDate()).padStart(2, '0');
    const mes = String(data.getMonth() + 1).padStart(2, '0');
    return `${dia}/${mes}`;
}

// Função para gerar duas datas com um intervalo de 1 mês
function gerarIntervaloDatas() {
    const hoje = new Date();
    const dataInicial = new Date(hoje);
    dataInicial.setDate(dataInicial.getDate() - 15); // Definindo 15 dias antes da data atual
    const dataFinal = new Date(dataInicial);
    dataFinal.setMonth(dataFinal.getMonth() + 1); // Definindo 1 mês após a data inicial
    return [dataInicial, dataFinal];
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
        // Formatando os números com dois dígitos
        const horasFormatadas = horas < 10 ? '0' + horas : horas;
        const minutosFormatados = minutos < 10 ? '0' + minutos : minutos;
        const segundosFormatados = segundos < 10 ? '0' + segundos : segundos;
        cronometroElement.innerText = `${horasFormatadas}:${minutosFormatados}:${segundosFormatados}`;
    };

    // Limpar o intervalo do cronômetro se existir
    clearInterval(intervaloCronometro);
    
    // Iniciar o cronômetro
    intervaloCronometro = setInterval(atualizarCronometro, 1000);
} 
// Botão de limpar
function limparInformacoes() {
    document.getElementById('nomePessoal').innerText = '';
    document.getElementById('nomeEmpresa').innerText = '';
    document.getElementById('valorBruto').innerText = '';
    document.getElementById('valorLiquido').innerText = '';
    document.getElementById('taxa').innerText = '';
    document.getElementById('dataAleatoria').innerText = '';
    document.getElementById('cronometro').innerText = '00:00:00';
    clearInterval(intervaloCronometro);
}