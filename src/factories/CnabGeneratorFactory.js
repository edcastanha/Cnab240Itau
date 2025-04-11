
const Cnab240ItauGenerator = require('../generators/Cnab240ItauGenerator');
const CnabConfig = require('../models/cnab/CnabConfig');

class CnabGeneratorFactory {
  static createGenerator(formato, versao, banco) {
    const config = new CnabConfig(formato, versao, banco);
    
    switch(banco) {
      case '341': // Itaú
        if (formato === '240' && versao === '086') {
          return new Cnab240ItauGenerator(config);
        }
        break;
      // Adicionar outros bancos aqui
    }
    
    throw new Error(`Combinação não suportada: Banco ${banco}, formato ${formato}, versão ${versao}`);
  }
}

module.exports = CnabGeneratorFactory;
