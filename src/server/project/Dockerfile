# Use uma imagem Node.js como base
FROM node:16

# Defina o diretório de trabalho dentro do container
WORKDIR /app

# Copie o package.json e package-lock.json
COPY package*.json ./

# Instale as dependências
RUN npm install

# Copie todo o código para o diretório de trabalho
COPY . .

EXPOSE 3002

# Comando para iniciar o serviço
CMD ["npm", "run", "dev"]

