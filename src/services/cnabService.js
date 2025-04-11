
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
      pagamentos.forEach((pagamento, index) => {
        valorTotal += pagamento.valor;
        // TODO: Implementar geração de segmentos A, B, etc.
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
