
const { formatNumeric, formatAlpha, formatDate, formatValue } = require('../utils/formatters');

class CnabController {
  generateHeaderArquivo(empresa) {
    const linha = [];
    // Controle
    linha.push(formatNumeric(0, 3)); // Banco
    linha.push(formatNumeric(0, 4)); // Lote
    linha.push(formatNumeric(0, 1)); // Registro
    linha.push(formatAlpha('', 9));  // CNAB
    linha.push(formatNumeric(2, 1)); // Tipo Inscrição
    linha.push(formatNumeric(empresa.cnpj || '', 14)); // CNPJ
    linha.push(formatAlpha(empresa.convenio || '', 20)); // Convênio
    linha.push(formatNumeric(empresa.agencia || '', 5)); // Agência
    linha.push(formatAlpha(empresa.digitoAgencia || '', 1)); // Dígito Agência
    linha.push(formatNumeric(empresa.conta || '', 12)); // Conta
    linha.push(formatAlpha(empresa.digitoConta || '', 1)); // Dígito Conta
    linha.push(formatAlpha(empresa.digitoAgConta || '', 1)); // Dígito Ag/Conta
    linha.push(formatAlpha(empresa.nome.slice(0, 30), 30)); // Nome Empresa
    linha.push(formatAlpha('BANCO ITAU SA', 30)); // Nome Banco
    linha.push(formatAlpha('', 10)); // CNAB
    linha.push(formatNumeric(1, 1)); // Arquivo Remessa
    linha.push(formatDate(new Date())); // Data Geração
    linha.push(formatNumeric(new Date().getHours().toString().padStart(2,'0') + 
               new Date().getMinutes().toString().padStart(2,'0') + 
               new Date().getSeconds().toString().padStart(2,'0'), 6)); // Hora Geração
    linha.push(formatNumeric(1, 6)); // Número Sequencial
    linha.push(formatNumeric(81, 3)); // Layout
    linha.push(formatNumeric(1, 5)); // Densidade
    linha.push(formatAlpha('', 20)); // Reservado Banco
    linha.push(formatAlpha('', 20)); // Reservado Empresa
    linha.push(formatAlpha('', 29)); // CNAB

    return linha.join('');
  }
}

module.exports = new CnabController();
