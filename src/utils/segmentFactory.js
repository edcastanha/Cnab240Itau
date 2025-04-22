const { generateSegmentoA, generateSegmentoB, generateSegmentoN, generateSegmentoW, generateSegmentoJ52 } = require('../generators/Cnab240ItauGenerator');

function generateSegment(segmento, dados, numSeq) {
  switch (segmento.toUpperCase()) {
    case 'A':
      return generateSegmentoA(dados, numSeq);
    case 'B':
      return generateSegmentoB(dados, numSeq);
    case 'N':
      return generateSegmentoN(dados, numSeq);
    case 'W':
      return generateSegmentoW(dados, numSeq);
    case 'J52':
      return generateSegmentoJ52(dados, numSeq);
    default:
      throw new Error(`Segmento ${segmento} não suportado`);
  }
}

module.exports = { generateSegment };