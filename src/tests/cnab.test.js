
const CnabService = require('../services/cnabService');

describe('CNAB Service - Pagamentos a Fornecedores', () => {
  const empresa = {
    nome: 'EMPRESA TESTE LTDA',
    cnpj: '12345678901234',
    agencia: '1234',
    digitoAgencia: '1',
    conta: '123456789012',
    digitoConta: '1',
    digitoAgConta: '1',
    convenio: '12345678'
  };

  const pagamento = {
    tipoMovimento: 0,
    codInstrucao: 1,
    codCamara: 18, // TED
    bancoBeneficiario: 341,
    agenciaBeneficiario: '1234',
    digitoAgenciaBenef: '1',
    contaBeneficiario: '123456789012',
    digitoContaBenef: '1',
    digitoAgContaBenef: '1',
    nomeBeneficiario: 'FORNECEDOR TESTE LTDA',
    seuNumero: 'PAG123',
    dataPagamento: new Date('2024-01-20'),
    moeda: 'BRL',
    valorPagamento: 1000.50,
    nossoNumero: '123456789',
    dataReal: new Date('2024-01-20'),
    valorReal: 1000.50,
    informacao2: 'PAGAMENTO DE FORNECEDOR',
    codFinalidadeDOC: 1,
    codFinalidadeTED: '00001',
    codFinalidadeComplementar: '01',
    avisoFavorecido: 0,
    // Dados para Segmento B
    enderecoBeneficiario: 'RUA TESTE',
    numeroBeneficiario: '123',
    complementoBeneficiario: 'SALA 1',
    bairroBeneficiario: 'CENTRO',
    cidadeBeneficiario: 'SAO PAULO',
    cepBeneficiario: '01234567',
    estadoBeneficiario: 'SP',
    cpfCnpjBeneficiario: '98765432101234',
    tipoInscricaoBenef: 2
  };

  test('Deve gerar arquivo remessa com Segmentos A e B corretamente', async () => {
    const remessa = await CnabService.generateRemessaFile(empresa, [pagamento]);
    const linhas = remessa.split('\n');
    
    // Deve ter 5 linhas: Header Arquivo, Header Lote, Segmento A, Segmento B, Trailer Lote
    expect(linhas.length).toBe(5);
    
    // Verifica Segmento A
    const segmentoA = linhas[2];
    expect(segmentoA.substring(13, 14)).toBe('A'); // Tipo de Registro
    expect(segmentoA.substring(17, 19)).toBe('01'); // Código Instrução
    expect(segmentoA.substring(19, 22)).toBe('018'); // Câmara (TED)
    
    // Verifica Segmento B
    const segmentoB = linhas[3];
    expect(segmentoB.substring(13, 14)).toBe('B'); // Tipo de Registro
    expect(segmentoB.substring(17, 18)).toBe('2'); // Tipo Inscrição
    expect(segmentoB.substring(18, 32)).toBe('98765432101234'); // CNPJ
  });
});
