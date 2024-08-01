# Use a imagem oficial do Node.js como base
FROM node:20.9.0

# Defina o diretório de trabalho no contêiner
WORKDIR /app

# Copie os arquivos de pacotes e instale as dependências
COPY package*.json ./
RUN npm install

# Copie todos os arquivos do projeto para o contêiner
COPY . .

# Exponha a porta que o aplicativo irá usar
EXPOSE 3333

# Comando para iniciar o aplicativo
CMD ["npm", "run", "start:dev"]
