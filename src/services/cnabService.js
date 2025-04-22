const CnabGeneratorFactory = require('../factories/CnabGeneratorFactory');
const ServicosLote = require('../models/cnab/ServicosLote');
const { generateSegment } = require('../utils/segmentFactory');

class CnabService {
  constructor() {
    this.generators = new Map();
  }

  /**
   * Obtém ou cria um gerador de CNAB com base no formato, versão e banco.
   * @param {string} formato - Formato do arquivo (ex.: '240').
   * @param {string} versao - Versão do arquivo (ex.: '086').
   * @param {string} banco - Código do banco (ex.: '341').
   * @returns {object} Gerador de CNAB.
   */
  getGenerator(formato, versao, banco) {
    const key = `${banco}_${formato}_${versao}`;
    if (!this.generators.has(key)) {
      const generator = CnabGeneratorFactory.createGenerator(formato, versao, banco);
      if (!generator) {
        throw new Error(`Configuração não encontrada para Banco ${banco}, formato ${formato, versao}`);
      }
      this.generators.set(key, generator);
    }
    return this.generators.get(key);
  }

  /**
   * Gera o arquivo de remessa CNAB.
   * @param {object} empresa - Dados da empresa.
   * @param {Array} pagamentos - Lista de pagamentos.
   * @param {number} tipoServico - Tipo de serviço (ex.: 20 para fornecedores).
   * @param {string} formato - Formato do arquivo (default: '240').
   * @param {string} versao - Versão do arquivo (default: '086').
   * @param {string} banco - Código do banco (default: '341').
   * @returns {string} Conteúdo do arquivo de remessa.
   */
  async generateRemessaFile(empresa, pagamentos, tipoServico, formato = '240', versao = '086', banco = '341') {
    try {
      // Obtém o gerador correspondente
      const generator = this.getGenerator(formato, versao, banco);

      // Inicializa as linhas do arquivo e o valor total
      const linhas = [];
      let valorTotal = 0;

      // Gera o header do arquivo e do lote
      linhas.push(generator.generateHeaderArquivo(empresa));
      linhas.push(generator.generateHeaderLote(empresa, tipoServico));

      // Gera os segmentos para cada pagamento
      let numSeq = 2; // Sequência inicial após os headers
      pagamentos.forEach((pagamento) => {
        valorTotal += pagamento.valor; // Soma o valor do pagamento
        const segmentos = ServicosLote.getSegmentosByServico(tipoServico);
        segmentos.forEach((segmento) => {
          linhas.push(generateSegment(segmento, pagamento, numSeq++));
        });
      });

      // Gera o trailer do lote
      linhas.push(generator.generateTrailerLote(pagamentos.length + 2, valorTotal));

      linhas.push(generator.generateTrailerArquivo(pagamentos.length + 2, valorTotal));

      // Gerar arquivo .rem no path .outputFile
      const outputFile = `./output/remessa_${tipoServico}.rem`;
      const fs = require('fs');
      fs.writeFileSync(outputFile, linhas.join('\n'), 'utf8');
      console.log(`Arquivo de remessa gerado: ${outputFile}`);
      // Gera o trailer do arquivo
      // Gera o arquivo .rem no path .outputFile




      // Retorna o conteúdo do arquivo como uma string
      return linhas.join('\n');
    } catch (error) {
      throw new Error(`Erro ao gerar arquivo remessa: ${error.message}`);
    }
  }
}

module.exports = new CnabService();
