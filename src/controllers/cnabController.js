
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

  generateSegmentoA(pagamento, numSeq) {
    const linha = [];
    linha.push(formatNumeric(0, 3)); // Banco
    linha.push(formatNumeric(1, 4)); // Lote
    linha.push(formatNumeric(3, 1)); // Registro
    linha.push(formatNumeric(numSeq, 5)); // Número Sequencial
    linha.push(formatAlpha('A', 1)); // Segmento
    linha.push(formatNumeric(pagamento.tipoMovimento || 0, 1)); // Tipo Movimento
    linha.push(formatNumeric(pagamento.codInstrucao || 0, 2)); // Instrução
    linha.push(formatNumeric(pagamento.codCamara || 0, 3)); // Câmara
    linha.push(formatNumeric(pagamento.bancoBeneficiario || 0, 3)); // Banco Beneficiário
    linha.push(formatNumeric(pagamento.agenciaBeneficiario || '', 5)); // Agência Beneficiário
    linha.push(formatAlpha(pagamento.digitoAgenciaBenef || '', 1)); // Dígito Agência
    linha.push(formatNumeric(pagamento.contaBeneficiario || '', 12)); // Conta Beneficiário
    linha.push(formatAlpha(pagamento.digitoContaBenef || '', 1)); // Dígito Conta
    linha.push(formatAlpha(pagamento.digitoAgContaBenef || '', 1)); // Dígito Ag/Conta
    linha.push(formatAlpha(pagamento.nomeBeneficiario.slice(0, 30), 30)); // Nome Beneficiário
    linha.push(formatAlpha(pagamento.seuNumero || '', 20)); // Seu Número
    linha.push(formatDate(pagamento.dataPagamento)); // Data Pagamento
    linha.push(formatAlpha(pagamento.moeda || 'BRL', 3)); // Tipo Moeda
    linha.push(formatNumeric(0, 15)); // Quantidade Moeda
    linha.push(formatValue(pagamento.valorPagamento, 2)); // Valor Pagamento
    linha.push(formatAlpha(pagamento.nossoNumero || '', 20)); // Nosso Número
    linha.push(formatDate(pagamento.dataReal || '')); // Data Real
    linha.push(formatValue(pagamento.valorReal || 0, 2)); // Valor Real
    linha.push(formatAlpha(pagamento.informacao2 || '', 40)); // Informação 2
    linha.push(formatNumeric(pagamento.codFinalidadeDOC || 0, 2)); // Finalidade DOC
    linha.push(formatAlpha(pagamento.codFinalidadeTED || '', 5)); // Finalidade TED
    linha.push(formatAlpha(pagamento.codFinalidadeComplementar || '', 2)); // Finalidade Complementar
    linha.push(formatAlpha('', 3)); // CNAB
    linha.push(formatNumeric(pagamento.avisoFavorecido || 0, 1)); // Aviso
    linha.push(formatAlpha('', 10)); // CNAB
    return linha.join('');
  }

  generateSegmentoB(pagamento, numSeq) {
    const linha = [];
    linha.push(formatNumeric(0, 3)); // Banco
    linha.push(formatNumeric(1, 4)); // Lote
    linha.push(formatNumeric(3, 1)); // Registro
    linha.push(formatNumeric(numSeq, 5)); // Número Sequencial
    linha.push(formatAlpha('B', 1)); // Segmento
    linha.push(formatAlpha('', 3)); // CNAB
    linha.push(formatNumeric(pagamento.tipoInscricaoBenef || 2, 1)); // Tipo Inscrição
    linha.push(formatNumeric(pagamento.cpfCnpjBeneficiario || '', 14)); // CNPJ/CPF
    linha.push(formatAlpha(pagamento.enderecoBeneficiario || '', 30)); // Endereço
    linha.push(formatNumeric(pagamento.numeroBeneficiario || '', 5)); // Número
    linha.push(formatAlpha(pagamento.complementoBeneficiario || '', 15)); // Complemento
    linha.push(formatAlpha(pagamento.bairroBeneficiario || '', 15)); // Bairro
    linha.push(formatAlpha(pagamento.cidadeBeneficiario || '', 20)); // Cidade
    linha.push(formatNumeric(pagamento.cepBeneficiario || '', 8)); // CEP
    linha.push(formatAlpha(pagamento.estadoBeneficiario || '', 2)); // Estado
    linha.push(formatDate(pagamento.dataVencimento || '')); // Data Vencimento
    linha.push(formatValue(pagamento.valorDocumento || 0, 2)); // Valor Documento
    linha.push(formatValue(pagamento.valorAbatimento || 0, 2)); // Abatimento
    linha.push(formatValue(pagamento.valorDesconto || 0, 2)); // Desconto
    linha.push(formatValue(pagamento.valorMora || 0, 2)); // Mora
    linha.push(formatValue(pagamento.valorMulta || 0, 2)); // Multa
    linha.push(formatAlpha(pagamento.codigoDocumento || '', 15)); // Código Documento
    linha.push(formatAlpha('', 15)); // CNAB
    return linha.join('');
  }

}

module.exports = new CnabController();
