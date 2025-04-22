const cnabService = require('../services/cnabService');
const fs = require('fs').promises;
const path = require('path');

jest.mock('../services/cnabService');

describe('CNAB Service - Pagamentos a Fornecedores com Mock Data', () => {
  let mockData;
  const mockFolderPath = path.join(__dirname, './mock');

  beforeAll(async () => {
    try {
      const mockFile = path.join(mockFolderPath, '341_240_086.json');
      const data = await fs.readFile(mockFile, 'utf8');
      mockData = JSON.parse(data);
    } catch (error) {
      console.error("Erro ao ler o arquivo de mock:", error);
      throw error;
    }
  });

  beforeEach(() => {
    cnabService.generateRemessaFile.mockClear();
  });

  it('Deve gerar arquivo remessa para Fornecedores (20) usando dados do mock', async () => {
    const mockEmpresa = mockData.empresa;
    const mockPagamentos = mockData.pagamentos.filter(p => p.tipo === 20);
    const mockRemessa = 'Header\nSegmento A\nSegmento B\nTrailer';

    cnabService.generateRemessaFile.mockResolvedValue(mockRemessa);

    const result = await cnabService.generateRemessaFile(mockEmpresa, mockPagamentos);

    expect(result).toBe(mockRemessa);
    expect(cnabService.generateRemessaFile).toHaveBeenCalledWith(mockEmpresa, mockPagamentos);
  });

  it('Deve gerar arquivo remessa para PIX (45) usando dados do mock', async () => {
    const mockEmpresa = mockData.empresa;
    const mockPagamentos = mockData.pagamentos.filter(p => p.tipo === 45);
    const mockRemessa = 'Header\nSegmento A\nSegmento B\nTrailer';

    cnabService.generateRemessaFile.mockResolvedValue(mockRemessa);

    const result = await cnabService.generateRemessaFile(mockEmpresa, mockPagamentos);

    expect(result).toBe(mockRemessa);
    expect(cnabService.generateRemessaFile).toHaveBeenCalledWith(mockEmpresa, mockPagamentos);
  });

  it('Deve gerar arquivo remessa para Tributos (22) usando dados do mock', async () => {
    const mockEmpresa = mockData.empresa;
    const mockPagamentos = mockData.pagamentos.filter(p => p.tipo === 22);
    const mockRemessa = 'Header\nSegmento A\nSegmento B\nTrailer';

    cnabService.generateRemessaFile.mockResolvedValue(mockRemessa);

    const result = await cnabService.generateRemessaFile(mockEmpresa, mockPagamentos);

    expect(result).toBe(mockRemessa);
    expect(cnabService.generateRemessaFile).toHaveBeenCalledWith(mockEmpresa, mockPagamentos);
  });
});