# ISP ↔ OZmap Data Sync Service

Pequeno serviço em **Node.js + TypeScript** que sincroniza, de forma periódica, dados de um (mock) **ISP** para o **OZmap**, tratando *rate-limits*, *retries* e recuperação de falhas.  
A proposta foi manter **simplicidade e funcionalidade**, atendendo ao desafio técnico sem sobre-engenharia nem tempo excessivo de preparação.

## ⚙️ Pilha Tecnológica

| Finalidade                    | Escolha                         | Motivo                                                     |
| ----------------------------- | ------------------------------  | ---------------------------------------------------------- |
| Runtime / Linguagem           | **Node.js 18 + TypeScript**     | Iteração rápida e ecossistema maduro                       |
| HTTP client + tentativas      | **axios** + **axios-retry**     | Back-off automático com poucas linhas                      |
| Limite de requisições         | **Redis**                       | Garante 50 req/min no ISP                                  |
| Persistência                  | **MySQL 8** via **TypeORM**     | Relacional simples, joins fáceis                           |
| Jobs em segundo plano         | bullmq                          | Mantém dependências mínimas; orquestrado via Docker        |
| Logs                          | **winston**                     | Saída JSON, alta performance                               |
| Contêinerização               | **Docker + docker-compose**     | *One-liner* para subir tudo                                |

## Como rodar o projeto

Faça o clone do projeto
cd <nome da past>
cp .env.example .env   # edita credenciais / API keys
docker compose up -d


## Por que esta arquitetura?
Módulos pequenos, simples que reduz a carga cognitiva: acessos externos (HTTP, DB, cache) ficam em clients ou repositories, enquanto services permanecem puros e testáveis. Docker garante ambiente reproduzível — basta docker compose up -d para avaliar em poucos minutos.
