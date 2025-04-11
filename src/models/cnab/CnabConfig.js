
class CnabConfig {
  constructor(formato, versao, banco) {
    this.formato = formato; // 240 ou 400
    this.versao = versao;  // ex: '086' para Itaú
    this.banco = banco;    // código do banco
    this.config = this.loadConfig();
  }

  loadConfig() {
    const configPath = `./config/${this.banco}_${this.formato}_${this.versao}.json`;
    try {
      return require(configPath);
    } catch (error) {
      throw new Error(`Configuração não encontrada para Banco ${this.banco}, formato ${this.formato}, versão ${this.versao}`);
    }
  }
}

module.exports = CnabConfig;
