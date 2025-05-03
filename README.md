
# API CNAB240 - Gerador de Arquivos de Remessa

API REST para geração de arquivos de remessa no formato CNAB240, compatível com SISPAG do Itaú.

## 🚀 Características

- Geração de arquivos CNAB240 para pagamentos
- Suporte para múltiplos tipos de pagamento (fornecedores, salários, tributos)
- Validação completa dos dados de entrada
- Logs detalhados das operações
- Testes automatizados

## 📋 Pré-requisitos

- Node.js 16.x
- NPM 8.x ou superior

## 🔧 Instalação e Execução

1. Clone o repositório
2. Instale as dependências:
```bash
npm install
```

3. Execute os testes:
```bash
npm test
```

4. Inicie o servidor:
```bash
npm start
```

## 🔌 Configuração do Ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
PORT=3000
NODE_ENV=development
LOG_LEVEL=info
OUTPUT_DIR=./output
```

## 🐳 Desenvolvimento com Docker

Para desenvolvimento local usando Docker, você pode usar o seguinte `docker-compose.yml`:

```yaml
version: '3.8'

services:
  api:
    build:
      context: .
      dockerfile: Dockerfile
    image: cnab240-api
    container_name: cnab240-api
    ports:
      - "3000:3000"
    volumes:
      - .:/app
      - /app/node_modules
    environment:
      - NODE_ENV=development
      - PORT=3000
    command: npm run dev

volumes:
  node_modules:
```

E o Dockerfile correspondente:

```dockerfile
FROM node:16-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
```

## 📝 Documentação

Para mais informações sobre os endpoints e formatos de dados, consulte:

- [Manual Técnico](docs/manual_tecnico.txt)
- [Arquitetura API](docs/arquitetura_api.md)
- [Requisitos](docs/requisitos.md)

## ✅ Testes

Execute os testes unitários:

```bash
npm test
```

## 🤝 Contribuindo

1. Faça o fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença ISC - veja o arquivo [LICENSE.md](LICENSE.md) para detalhes.

## ✨ Autor

Edson Lourenço Bezerra Filho
