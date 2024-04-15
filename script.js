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
                    // Gerando um número aleatório entre 200 e 1 milhões
                    const valorBruto = Math.random() * (1000000 - 200) + 200;

                    // Calculando a taxa com base no valor bruto
                    const taxa = calcularTaxa(valorBruto);
                    // Calculando o intervalo de meses com base no valor bruto
                    const intervaloMeses = calcularIntervaloMeses(valorBruto);

                    // Gerando datas com base no intervalo de meses
                    const [dataInicial, dataFinal] = gerarIntervaloDatas(intervaloMeses);
                    
                    // Calculando a taxa com base no valor bruto e no intervalo de meses
                    const taxa1 = calcularTaxa(valorBruto, intervaloMeses);

                    // Calculando o valor líquido
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

// Função para calcular a taxa com base no valor bruto e no intervalo de meses
function calcularTaxa(valorBruto, intervaloMeses) {
    // Quanto maior for o valor bruto, maior será a taxa
    if (valorBruto < 500000) {
        if (intervaloMeses <= 6) {
            return Math.random() * (1.6 - 0.2) + 0.2; // Taxa entre 0.2% e 1.6%
        } else {
            return Math.random() * (3.6 - 1.7) + 1.7; // Taxa entre 1.7% e 3.6%
        }
    } else {
        if (intervaloMeses > 6) {
            return Math.random() * (3.6 - 1.7) + 1.7; // Taxa entre 2.7% e 4.6%
        } else {
            return Math.random() * (4 - 3.7) + 3.7; // Taxa entre 4.7% e 5%
        }
    }
}

// Função para calcular o intervalo de meses com base no valor bruto
function calcularIntervaloMeses(valorBruto) {
    // Quanto maior for o valor bruto, maior será o intervalo de meses
    if (valorBruto < 500000) {
        return Math.floor(Math.random() * 6) + 1; // Receber entre 1 e 6 meses
    } else {
        return Math.floor(Math.random() * 7) + 6; // Receber entre 6 e 12 meses
    }
}

// Função para formatar o número no formato BRL com duas casas decimais
function formatarNumeroBRL(numero) {
    return 'R$ ' + numero.toLocaleString('pt-BR', { minimumFractionDigits: 2 });
}

// Função para formatar a data
function formatarData(data) {
    const dia = String(data.getDate()).padStart(2, '0');
    const mes = String(data.getMonth() + 0).padStart(2, '0');
    return `${dia}/${mes}`;
}

// Função para gerar datas com base no intervalo de meses
function gerarIntervaloDatas(intervaloMeses) {
    const hoje = new Date();
    const dataInicial = new Date(hoje);
    dataInicial.setMonth(dataInicial.getMonth() + 1); // Adicionar 1 mês à data atual
    const dataFinal = new Date(dataInicial);
    dataFinal.setMonth(dataFinal.getMonth() + intervaloMeses); // Adicionar o intervalo de meses
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

    // Função para pausar o cronômetro
function pausarCronometro() {
    clearInterval(intervaloCronometro);
}

// Função para resetar o cronômetro
function resetarCronometro() {
    clearInterval(intervaloCronometro);
    document.getElementById('cronometro').innerText = '00:00:00';
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