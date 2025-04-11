const CnabService = require("../services/cnabService");
const fs = require('fs').promises;
const path = require('path');

describe("CNAB Service - Pagamentos a Fornecedores com Mock Data", () => {
  let mockData;
  const mockFolderPath = path.join(__dirname, '../mock'); // Adjust the path if your 'mock' folder is in a different location

  beforeAll(async () => {
    try {
      const mockFile = path.join(mockFolderPath, '341_240_086.json'); // Assuming your JSON file is named '341_240_086.json'
      const data = await fs.readFile(mockFile, 'utf8');
      mockData = JSON.parse(data);
    } catch (error) {
      console.error("Erro ao ler o arquivo de mock:", error);
      // Fail the tests if mock data cannot be loaded
      throw error;
    }
  });

  test("Deve gerar arquivo remessa para Fornecedores (20) usando dados do mock", async () => {
    const empresa = mockData.empresa;
    const pagamentos = mockData.pagamentos;
    const tipoServico = '20';
    const expectedLinhasLength = 5; // Adjust based on your mock data

    const remessa = await CnabService.generateRemessaFile(empresa, pagamentos, tipoServico);
    const linhas = remessa.split("\n");

    expect(linhas.length).toBe(expectedLinhasLength);
    expect(linhas[1].substring(9, 11)).toBe(tipoServico);

    // Salva o arquivo na pasta mock
    const remessaFilePath = path.join(mockFolderPath, 'remessa.rem');
    await fs.writeFile(remessaFilePath, remessa);
  });

  test("Deve gerar arquivo remessa para PIX (45) usando dados do mock", async () => {
    const empresa = mockData.empresa;
    const pagamentos = mockData.pagamentos;
    const tipoServico = '45';
    const expectedLinhasLength = 6; // Adjust based on your mock data

    const remessa = await CnabService.generateRemessaFile(empresa, pagamentos, tipoServico);
    const linhas = remessa.split("\n");

    expect(linhas.length).toBe(expectedLinhasLength);
    expect(linhas[1].substring(9, 11)).toBe(tipoServico);

    // Salva o arquivo na pasta mock
    const remessaFilePath = path.join(mockFolderPath, 'remessa.rem');
    await fs.writeFile(remessaFilePath, remessa);
  });

  test("Deve gerar arquivo remessa para Tributos (22) usando dados do mock", async () => {
    const empresa = mockData.empresa;
    const pagamentos = mockData.pagamentos;
    const tipoServico = '22';
    const expectedLinhasLength = 6; // Adjust based on your mock data

    const remessa = await CnabService.generateRemessaFile(empresa, pagamentos, tipoServico);
    const linhas = remessa.split("\n");

    expect(linhas.length).toBe(expectedLinhasLength);
    expect(linhas[1].substring(9, 11)).toBe(tipoServico);

    // Salva o arquivo na pasta mock
    const remessaFilePath = path.join(mockFolderPath, 'remessa.rem');
    await fs.writeFile(remessaFilePath, remessa);
  });

  test("Deve verificar a estrutura do arquivo remessa gerado com dados do mock", async () => {
    const empresa = mockData.empresa;
    const pagamentos = mockData.pagamentos;
    const tipoServico = '20'; // Assuming you want to test with a specific tipoServico here

    const remessa = await CnabService.generateRemessaFile(empresa, pagamentos, tipoServico);
    const linhas = remessa.split("\n");
    const expectedLinhasLength = 5; // Adjust based on your mock data

    expect(linhas.length).toBe(expectedLinhasLength);

    // Salva o arquivo na pasta mock
    const remessaFilePath = path.join(mockFolderPath, 'remessa.rem');
    await fs.writeFile(remessaFilePath, remessa);

    // Verifica o Header do Arquivo
    const headerArquivo = linhas[0];
    expect(headerArquivo.substring(0, 3)).toBe('341'); // Código do Itaú
    expect(headerArquivo.substring(142, 172).trim()).toBe(empresa.nome);

    // Verifica o Segmento A (assuming at least one pagamento exists)
    if (pagamentos && pagamentos.length > 0) {
      const segmentoA = linhas[2];
      expect(segmentoA.substring(3, 7)).toBe('0001'); // Número do Lote
      expect(segmentoA.substring(13, 14)).toBe('A'); // Código Segmento
      // Add more specific checks based on your mock data structure
    }

    // Verifica o Trailer do Arquivo
    const trailerArquivo = linhas[linhas.length - 1];
    expect(trailerArquivo.substring(0, 3)).toBe('341'); // Código do Itaú
  });
});