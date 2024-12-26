# Inteli - Instituto de Tecnologia e Liderança 

<p align="center">
<a href= "https://www.inteli.edu.br/"><img src="docs/img/logo-inteli.png" alt="Inteli - Instituto de Tecnologia e Liderança" border="0" width=85% height=85%></a>
</p>

# Arquitetura de software flexível e sustentável

## Projeto: Inspetec
## Grupo 04: Os Inspetáculares

## 👨‍🎓 Integrantes: 
- <a href="https://www.linkedin.com/in/isabella-fernandes-saldanha-138a631b4/">Isabella Fernandes Saldanha</a>
- <a href="https://www.linkedin.com/in/biancablins/">Bianca Borges Lins</a>
- <a href="https://www.linkedin.com/in/omatheusrsantos?miniProfileUrn=urn%3Ali%3Afs_miniProfile%3AACoAADn7h9gBn9knNloeN6ogMSTaEuUmYuOdQb4&lipi=urn%3Ali%3Apage%3Ad_flagship3_search_srp_all%3BqK8fJyEASJqyRabkpMdnbQ%3D%3D">Matheus Ribeiro dos Santos</a>
- <a href="https://www.linkedin.com/in/raphaela-guiland-ferraz/">Raphaela Guiland Ferraz</a>
- <a href="https://www.linkedin.com/in/kaiane-souza?miniProfileUrn=urn%3Ali%3Afs_miniProfile%3AACoAAEGBY1IBkXfl3Q9yebhNwA7PP5NPrG9jTZo&lipi=urn%3Ali%3Apage%3Ad_flagship3_search_srp_all%3BJTYNxrwIQ%2FmWMNnsMt8fKw%3D%3D">Kaiane Souza Cordeiro</a>


## 👩‍🏫 Professores:
### Orientador(a) 
- Hermano Peixoto

### Instrutores
- Reginaldo Arakaki
- Victor Hayashi
- Hermano Peixoto
- Francisco Escobar
- Geraldo Magela
- Lisane Valdo
- Ana Cristina dos Santos

## 📜 Descrição

O projeto "Arquitetura de uma Plataforma de Apoio à Inspeção Técnica de Obras de Construção Civil" é uma iniciativa do Instituto de Pesquisas Tecnológicas do Estado de São Paulo (IPT) com o objetivo de desenvolver uma estrutura arquitetônica inovadora e robusta para otimizar o processo de inspeções prediais. Essa plataforma surge como resposta à ausência de soluções tecnológicas eficazes e padronizadas no mercado de inspeções prediais, um setor que se depara com desafios complexos devido à variedade de características que cada edifício apresenta, como idade, tipo de construção e sistemas instalados. 

A proposta deste projeto é criar uma arquitetura de software que simplifique e otimize a elaboração de relatórios de inspeção predial, com foco em atender os requisitos não funcionais de Confidencialidade e Interoperabilidade. A plataforma permitirá não apenas a sistematização das informações, mas também a padronização do processo de armazenamento da inspeção, possibilitando maior eficiência e confiabilidade na gestão predial. O desenvolvimento dessa estrutura trará benefícios significativos, como a redução do tempo necessário para a emissão de relatórios, aumento da precisão dos dados registrados e a criação de um ambiente seguro e rastreável para armazenar as informações coletadas.

A solução a ser proposta envolve a concepção de requisitos arquitetônicos que abarquem aspectos críticos como segurança e rastreabilidade. A complexidade do projeto exige uma arquitetura que ofereça flexibilidade e que seja compatível com diversas tecnologias emergentes, como inteligência artificial, por exemplo. Essas tecnologias podem ser facilmente integradas à plataforma, aumentando a precisão das inspeções.

Além disso, o projeto visa estabelecer padrões que possibilitem a padronização dos processos de inspeção, principalmente em relação ao armazenamento das informações e ao gerenciamento de acesso de documentos, seguindo normas de segurança e privacidade de dados, essenciais para o ambiente predial. Dessa forma, espera-se que a plataforma seja capaz de atender a um mercado diverso, com necessidades que variam conforme o tipo de construção e os sistemas presentes.

O resultado final é uma arquitetura de software voltada para uma plataforma que não apenas funcione como um suporte ao processo de inspeções, mas que também permita ao parceiro agregar inovação e eficiência ao setor de engenharia e manutenção predial. Esse projeto está restrito à criação da arquitetura e não prevê o desenvolvimento de um aplicativo final para uso em campo; no entanto, os requisitos estabelecidos servirão como base para futuras implementações, proporcionando uma fundação sólida para a construção de uma solução completa e alinhada com as melhores práticas de engenharia de software e tecnologia.

## 📁 Estrutura de pastas

```
docs/
│   README.md
├── img/
│
├── src/
│   ├── data/
│   ├── frontend/
│   └── server/
│       ├── api-gateway/
│       ├── auth-service/
│       ├── docs-service/
│       └── project/
│
├── simulacao/
│
└── README.md
```

### Explicação da Estrutura

- **docs/**: Contém documentação geral do projeto.
  - **img/**: Pasta para imagens.
  - **README.md**: Documentação principal do projeto.
- **src/**: Contém o código-fonte do projeto.
  - **data/**: Scripts e dados para manipulação do banco de dados.
  - **frontend/**: Código relacionado ao front-end.
  - **server/**: Back-end e microsserviços.
    - **api-gateway/**: Gerenciamento de roteamento e APIs.
    - **auth-service/**: Serviço responsável pela autenticação.
    - **docs-service/**: Manipulação de documentos.
    - **project/**: Lógica relacionada ao gerenciamento de projetos.
- **simulacao/**: Pasta destinada a simulações de sistema.
- **README.md**: este documento.


## 🔧 Instalação

1. **Tenha o [Docker](https://www.docker.com/) instalado e rodando** na sua máquina.

2. **Suba os serviços da arquitetura** com o Docker Compose:

No terminal, no diretório src.

   ```bash
   docker-compose up --build
   ```

   > Deixe o Docker rodando, pois todos os serviços necessários serão inicializados por ele.

3. **Inicie o front-end**:

   - Entre no diretório do front-end:

     ```bash
     cd src/frontend
     ```

   - Instale as dependências e rode o projeto:

     ```bash
     npm install
     npm run dev
     ```

4. **Acesse a aplicação**:

   Agora o projeto estará disponível no seguinte link:

   - **Frontend**: [http://localhost:5173](http://localhost:5173)

## 🗃 Histórico de lançamentos

* 1.0.0 - 19/12/2024 
    * Arquitetura do Sistema Novo (Storytelling de dados)
    * Revisão do Repositório Github

* 0.4.0 - 06/12/2024 
    * Ajustes de implementação
    * Evidências de testes não funcionais para ajustes
    * Medir o sistema novo
    * Identificar os tradeoffs arquiteturais

* 0.3.0 - 22/11/2024 
    * Implementação dos Mecanismos Arquiteturais
    * Testes automatizados não funcionais
    * Revisão do Modelo de Simulação do Sistema Novo

* 0.2.0 - 08/11/2024
    * Avaliação dos mecanismos utilizados no sistema atual (ATAM)
    * Especificação da solução técnica do sistema novo
    * Simulação do sistema novo

* 0.1.0 - 25/10/2024
    * Arquitetura do Sistema Atual - Visão Negócio (versão 1) (Visão Arquitetural - ISO 10746)
    * Arquitetura do Sistema Novo - Especificação de Requisitos
    * Visão Modelo Comportamental (Simulação do Atual)

## 📋 Licença/License

<p xmlns:cc="http://creativecommons.org/ns#" xmlns:dct="http://purl.org/dc/terms/"><a property="dct:title" rel="cc:attributionURL" href="https://github.com/Inteli-College/2024-2A-T09-ES07-G01">Inspetec</a> by <a rel="cc:attributionURL dct:creator" property="cc:attributionName" href="https://github.com/Inteli-College/2024-2A-T09-ES07-G01">INTELI, Isabella Fernandes Saldanha, Bianca Borges Lins, Matheus Ribeiro dos Santos, Raphaela Guiland Ferraz, Kaiane Souza Cordeiro</a> is licensed under <a href="https://creativecommons.org/licenses/by/4.0/?ref=chooser-v1" target="_blank" rel="license noopener noreferrer" style="display:inline-block;">Creative Commons Attribution 4.0 International<img style="height:22px!important;margin-left:3px;vertical-align:text-bottom;" src="https://mirrors.creativecommons.org/presskit/icons/cc.svg?ref=chooser-v1" alt=""><img style="height:22px!important;margin-left:3px;vertical-align:text-bottom;" src="https://mirrors.creativecommons.org/presskit/icons/by.svg?ref=chooser-v1" alt=""></a></p>
