
const CnabController = require('../controllers/cnabController');

class CnabService {
  async generateRemessaFile(empresa, pagamentos) {
    try {
      const linhas = [];
      let valorTotal = 0;
      
      // Header do Arquivo
      linhas.push(CnabController.generateHeaderArquivo(empresa));
      
      // Header do Lote
      linhas.push(CnabController.generateHeaderLote(empresa, 20)); // 20 = Fornecedores
      
      // Adiciona registros de pagamento
      let numSeq = 2;
      pagamentos.forEach((pagamento) => {
        valorTotal += pagamento.valorPagamento;
        
        // Segmento A
        linhas.push(CnabController.generateSegmentoA(pagamento, numSeq++));
        
        // Segmento B (opcional)
        if (pagamento.enderecoBeneficiario) {
          linhas.push(CnabController.generateSegmentoB(pagamento, numSeq++));
        }
      });
      
      // Trailer do Lote
      linhas.push(CnabController.generateTrailerLote(pagamentos.length + 2, valorTotal));
      
      // TODO: Implementar Trailer do Arquivo
      
      return linhas.join('\n');
    } catch (error) {
      throw new Error(`Erro ao gerar arquivo remessa: ${error.message}`);
    }
  }
}

module.exports = new CnabService();
