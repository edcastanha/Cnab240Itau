
class ICnabFileGenerator {
  generateHeaderArquivo(empresa) { throw new Error('Not implemented'); }
  generateHeaderLote(empresa, servicoLote) { throw new Error('Not implemented'); }
  generateTrailerLote(qtdRegistros, valorTotal) { throw new Error('Not implemented'); }
  generateTrailerArquivo(qtdLotes, qtdRegistros) { throw new Error('Not implemented'); }
  generateSegment(tipo, dados, numSeq) { throw new Error('Not implemented'); }
}

module.exports = ICnabFileGenerator;
