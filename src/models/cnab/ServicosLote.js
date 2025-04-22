class ServicosLote {
  static FORNECEDORES = '20';
  static PIX = '45';
  static PIX_TRANSFERENCIA = '47';
  static TRIBUTOS = '22';
  static DIVERSOS = '98';

  static getSegmentosByServico(servico) {
    const segmentos = {
      '20': ['A', 'B'], // Fornecedores
      '45': ['A', 'B', 'J52'], // PIX QRCode
      '47': ['A', 'B'], // PIX Transferência
      '22': ['N', 'B', 'W'], // Tributos
      '98': ['A', 'B'] // Diversos
    };
    return segmentos[servico] || [];
  }
}

module.exports = ServicosLote;
