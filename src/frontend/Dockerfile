# Etapa 1: Construir os arquivos estáticos
FROM node:16 AS build

# Defina o diretório de trabalho
WORKDIR /app

# Copie os arquivos necessários para o build
COPY package*.json ./

# Instale as dependências
RUN npm install

# Copie todo o código do projeto para dentro do container
COPY . .

# Construa os arquivos estáticos
RUN npm run build

# Etapa 2: Servir os arquivos estáticos com Nginx
FROM nginx:alpine

# Copie os arquivos construídos para o diretório padrão do Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Exponha a porta 80 para o servidor Nginx
EXPOSE 80

# Inicie o servidor Nginx
CMD ["nginx", "-g", "daemon off;"]

