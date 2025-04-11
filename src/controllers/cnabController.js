
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


  generateHeaderLote(empresa, servicoLote) {
    const linha = [];
    linha.push(formatNumeric(0, 3)); // Banco
    linha.push(formatNumeric(1, 4)); // Lote
    linha.push(formatNumeric(1, 1)); // Registro
    linha.push(formatAlpha('C', 1)); // Operação
    linha.push(formatNumeric(servicoLote, 2)); // Serviço
    linha.push(formatAlpha('', 2)); // CNAB
    linha.push(formatNumeric(81, 3)); // Layout
    linha.push(formatAlpha('', 1)); // CNAB
    linha.push(formatNumeric(2, 1)); // Tipo Inscrição
    linha.push(formatNumeric(empresa.cnpj || '', 14)); // CNPJ
    linha.push(formatAlpha(empresa.convenio || '', 20)); // Convênio
    linha.push(formatNumeric(empresa.agencia || '', 5)); // Agência
    linha.push(formatAlpha(empresa.digitoAgencia || '', 1)); // Dígito Agência
    linha.push(formatNumeric(empresa.conta || '', 12)); // Conta
    linha.push(formatAlpha(empresa.digitoConta || '', 1)); // Dígito Conta
    linha.push(formatAlpha(empresa.digitoAgConta || '', 1)); // Dígito Ag/Conta
    linha.push(formatAlpha(empresa.nome.slice(0, 30), 30)); // Nome Empresa
    linha.push(formatAlpha('', 40)); // Finalidade Lote
    linha.push(formatAlpha('', 30)); // Histórico C/C
    linha.push(formatAlpha('', 10)); // Endereço
    linha.push(formatNumeric(0, 5)); // Número
    linha.push(formatAlpha('', 15)); // Complemento
    linha.push(formatAlpha('', 20)); // Cidade
    linha.push(formatNumeric(0, 8)); // CEP
    linha.push(formatAlpha('', 2)); // Estado
    linha.push(formatAlpha('', 10)); // CNAB
    return linha.join('');
  }

  generateTrailerLote(qtdRegistros, valorTotal) {
    const linha = [];
    linha.push(formatNumeric(0, 3)); // Banco
    linha.push(formatNumeric(1, 4)); // Lote
    linha.push(formatNumeric(5, 1)); // Registro
    linha.push(formatAlpha('', 9)); // CNAB
    linha.push(formatNumeric(qtdRegistros, 6)); // Qtd Registros
    linha.push(formatValue(valorTotal, 2)); // Valor Total
    linha.push(formatNumeric(0, 6)); // Qtd Moeda
    linha.push(formatNumeric(0, 217)); // Número Aviso
    linha.push(formatAlpha('', 10)); // CNAB
    return linha.join('');
  }
