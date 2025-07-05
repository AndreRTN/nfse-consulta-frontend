# NfseConsulta

Aplicação Angular para consulta de NFSe (Nota Fiscal de Serviços Eletrônica).

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 20.0.5.

## Executar com Docker (Recomendado)

### Pré-requisitos
- Docker
- Docker Compose

### Como rodar a aplicação

#### 1. Clone o repositório
```bash
git clone <url-do-repositorio>
cd nfse-consulta
```

#### 2. Execute com Docker Compose
```bash
docker-compose up --build
```

#### 3. Acesse a aplicação
Abra o navegador e acesse: `http://localhost:4200`

### Comandos úteis

#### Parar a aplicação
```bash
docker-compose down
```

#### Rebuild da aplicação
```bash
docker-compose up --build
```

#### Ver logs
```bash
docker-compose logs -f
```

## Desenvolvimento Local

### Pré-requisitos
- Node.js
- npm
- Angular CLI

### Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

### Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

### Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

### Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

### Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Estrutura do projeto

- **Dockerfile**: Configuração para build da aplicação Angular e servir com nginx
- **docker-compose.yaml**: Orquestração dos serviços Docker
- A aplicação roda na porta 4200 do host e é mapeada para a porta 80 do container

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.