
const CnabGeneratorFactory = require('../factories/CnabGeneratorFactory');

class CnabService {
  constructor() {
    this.generators = new Map();
  }

  getGenerator(formato, versao, banco) {
    const key = `${banco}_${formato}_${versao}`;
    if (!this.generators.has(key)) {
      this.generators.set(key, CnabGeneratorFactory.createGenerator(formato, versao, banco));
    }
    return this.generators.get(key);
  }

  async generateRemessaFile(empresa, pagamentos, tipoServico, formato = '240', versao = '086', banco = '341') {
    try {
      const generator = this.getGenerator(formato, versao, banco);
      const linhas = [];
      let valorTotal = 0;
      
      linhas.push(generator.generateHeaderArquivo(empresa));
      linhas.push(generator.generateHeaderLote(empresa, 20));
      
      let numSeq = 2;
      pagamentos.forEach((pagamento) => {
        valorTotal += pagamento.valorPagamento;
        linhas.push(generator.generateSegment('A', pagamento, numSeq++));
        
        if (pagamento.enderecoBeneficiario) {
          linhas.push(generator.generateSegment('B', pagamento, numSeq++));
        }
      });
      
      linhas.push(generator.generateTrailerLote(pagamentos.length + 2, valorTotal));
      
      return linhas.join('\n');
    } catch (error) {
      throw new Error(`Erro ao gerar arquivo remessa: ${error.message}`);
    }
  }
}

module.exports = new CnabService();
