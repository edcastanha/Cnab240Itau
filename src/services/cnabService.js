
const CnabController = require('../controllers/cnabController');

class CnabService {
  async generateRemessaFile(empresa, pagamentos) {
    try {
      const linhas = [];
      
      // Header do Arquivo
      linhas.push(CnabController.generateHeaderArquivo(empresa));
      
      // TODO: Implementar geração de lotes e registros
      
      return linhas.join('\n');
    } catch (error) {
      throw new Error(`Erro ao gerar arquivo remessa: ${error.message}`);
    }
  }
}

module.exports = new CnabService();
