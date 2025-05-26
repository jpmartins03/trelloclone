# Esqueleto do Banco de Dados para o Projeto TaskMaster

## Visão Geral
Este documento descreve a estrutura de banco de dados sugerida para o aplicativo TaskMaster, um sistema de gerenciamento de tarefas no estilo Trello. O design visa suportar as funcionalidades principais implementadas e futuras expansões.

## Entidades Principais

### 1. Usuários (`users`)
Armazena informações sobre os usuários registrados no sistema.

| Coluna          | Tipo                               | Restrições                                     | Descrição                                          |
|-----------------|------------------------------------|------------------------------------------------|----------------------------------------------------|
| `user_id`       | UUID ou INT (auto-increment)       | CHAVE PRIMÁRIA                                 | ID único do usuário                                |
| `username`      | VARCHAR(255)                       | ÚNICO, NÃO NULO                                | Nome de usuário para login                         |
| `email`         | VARCHAR(255)                       | ÚNICO, NÃO NULO                                | Email do usuário                                   |
| `password_hash` | VARCHAR(255)                       | NÃO NULO                                       | Hash da senha do usuário                           |
| `avatar_url`    | VARCHAR(255)                       | OPCIONAL                                       | URL para a foto de perfil do usuário               |
| `created_at`    | TIMESTAMP                          | NÃO NULO, PADRÃO: NOW()                        | Data e hora de criação do registro do usuário      |
| `updated_at`    | TIMESTAMP                          | NÃO NULO, PADRÃO: NOW() (ou ON UPDATE NOW())   | Data e hora da última atualização do registro      |

### 2. Quadros (`boards`)
Representa os quadros onde as listas e tarefas são organizadas.

| Coluna     | Tipo                               | Restrições                                     | Descrição                                          |
|------------|------------------------------------|------------------------------------------------|----------------------------------------------------|
| `board_id` | UUID ou INT (auto-increment)       | CHAVE PRIMÁRIA                                 | ID único do quadro                                 |
| `user_id`  | UUID ou INT                        | CHAVE ESTRANGEIRA (ref. `users.user_id`), NÃO NULO | ID do usuário proprietário do quadro               |
| `title`    | VARCHAR(255)                       | NÃO NULO                                       | Título do quadro                                   |
| `created_at` | TIMESTAMP                          | NÃO NULO, PADRÃO: NOW()                        | Data e hora de criação do quadro                   |
| `updated_at` | TIMESTAMP                          | NÃO NULO, PADRÃO: NOW() (ou ON UPDATE NOW())   | Data e hora da última atualização do quadro        |

### 3. Listas/Colunas (`lists`)
Representa as colunas dentro de um quadro (ex: "A Fazer", "Em Andamento").

| Coluna    | Tipo                               | Restrições                                     | Descrição                                          |
|-----------|------------------------------------|------------------------------------------------|----------------------------------------------------|
| `list_id` | UUID ou INT (auto-increment)       | CHAVE PRIMÁRIA                                 | ID único da lista/coluna                           |
| `board_id`| UUID ou INT                        | CHAVE ESTRANGEIRA (ref. `boards.board_id`), NÃO NULO | ID do quadro ao qual a lista pertence              |
| `title`   | VARCHAR(255)                       | NÃO NULO                                       | Título da lista                                    |
| `position`| INTEGER                            | NÃO NULO                                       | Ordem da lista na área de listas regulares         |
| `created_at`| TIMESTAMP                          | NÃO NULO, PADRÃO: NOW()                        | Data e hora de criação da lista                    |
| `updated_at`| TIMESTAMP                          | NÃO NULO, PADRÃO: NOW() (ou ON UPDATE NOW())   | Data e hora da última atualização da lista         |

### 4. Cartões/Tarefas (`cards`)
Representa as tarefas individuais dentro de uma lista.

| Coluna        | Tipo                               | Restrições                                     | Descrição                                          |
|---------------|------------------------------------|------------------------------------------------|----------------------------------------------------|
| `card_id`     | UUID ou INT (auto-increment)       | CHAVE PRIMÁRIA                                 | ID único do cartão/tarefa                          |
| `list_id`     | UUID ou INT                        | CHAVE ESTRANGEIRA (ref. `lists.list_id`), NÃO NULO | ID da lista à qual o cartão pertence               |
| `title`       | VARCHAR(255)                       | NÃO NULO                                       | Título da tarefa                                   |
| `description` | TEXT                               | OPCIONAL                                       | Descrição detalhada da tarefa                      |
| `due_date`    | DATE ou VARCHAR(255)               | OPCIONAL                                       | Data de entrega                                    |
| `priority`    | VARCHAR(50)                        | NÃO NULO (Ex: "Baixa", "Normal", "Média", "Alta") | Prioridade da tarefa                             |
| `status`      | VARCHAR(50)                        | NÃO NULO (Ex: "Pendente", "Em andamento", "Concluído") | Status atual da tarefa                           |
| `position`    | INTEGER                            | NÃO NULO                                       | Ordem do cartão dentro da lista                    |
| `created_at`  | TIMESTAMP                          | NÃO NULO, PADRÃO: NOW()                        | Data e hora de criação do cartão                   |
| `updated_at`  | TIMESTAMP                          | NÃO NULO, PADRÃO: NOW() (ou ON UPDATE NOW())   | Data e hora da última atualização do cartão        |

## Entidades de Relacionamento e Suporte

### 5. Listas Fixadas por Usuário (`pinned_user_lists`)
Gerencia as listas que um usuário fixou em um quadro específico, respeitando a ordem e o limite de 3.

| Coluna            | Tipo                               | Restrições                                     | Descrição                                          |
|-------------------|------------------------------------|------------------------------------------------|----------------------------------------------------|
| `user_id`         | UUID ou INT                        | CHAVE ESTRANGEIRA (ref. `users.user_id`), CP   | ID do usuário                                      |
| `board_id`        | UUID ou INT                        | CHAVE ESTRANGEIRA (ref. `boards.board_id`), CP   | ID do quadro                                       |
| `list_id`         | UUID ou INT                        | CHAVE ESTRANGEIRA (ref. `lists.list_id`), CP     | ID da lista fixada                                 |
| `pinned_position` | INTEGER                            | NÃO NULO (Ex: 0, 1, 2)                         | Ordem da lista fixada                              |
| `pinned_at`       | TIMESTAMP                          | NÃO NULO, PADRÃO: NOW()                        | Data e hora em que a lista foi fixada              |
| *Chave Primária (CP)* | (`user_id`, `board_id`, `list_id`) |                                                | Garante unicidade                                  |

*Nota: A lógica para o limite de 3 listas fixadas por `user_id` e `board_id` deve ser implementada no backend.*

### 6. Tags (`tags`) (Opcional)
Se for implementada a funcionalidade de tags para tarefas.

| Coluna    | Tipo                               | Restrições                                     | Descrição                                          |
|-----------|------------------------------------|------------------------------------------------|----------------------------------------------------|
| `tag_id`  | UUID ou INT (auto-increment)       | CHAVE PRIMÁRIA                                 | ID único da tag                                    |
| `board_id`| UUID ou INT                        | CHAVE ESTRANGEIRA (ref. `boards.board_id`), OPCIONAL | ID do quadro (se tags forem por quadro)          |
| `user_id` | UUID ou INT                        | CHAVE ESTRANGEIRA (ref. `users.user_id`), OPCIONAL | ID do usuário (se tags forem por usuário)        |
| `name`    | VARCHAR(100)                       | NÃO NULO, ÚNICO (dentro do escopo do board/user ou global) | Nome da tag                                      |
| `color`   | VARCHAR(7)                         | OPCIONAL (Ex: "#RRGGBB")                       | Cor da tag                                         |
| `created_at`| TIMESTAMP                          | NÃO NULO, PADRÃO: NOW()                        | Data e hora de criação da tag                      |

### 7. Tags dos Cartões (`card_tags`) (Opcional)
Tabela de junção para a relação Muitos-para-Muitos entre `cards` e `tags`.

| Coluna    | Tipo        | Restrições                               | Descrição                               |
|-----------|-------------|------------------------------------------|-----------------------------------------|
| `card_id` | UUID ou INT | CHAVE ESTRANGEIRA (ref. `cards.card_id`), CP | ID do cartão                            |
| `tag_id`  | UUID ou INT | CHAVE ESTRANGEIRA (ref. `tags.tag_id`), CP   | ID da tag                               |
| *Chave Primária (CP)* | (`card_id`, `tag_id`) |                                          | Garante unicidade da relação            |

## Considerações Adicionais
* **Tipos de ID**: UUIDs são preferíveis para escalabilidade e para evitar colisões em ambientes distribuídos. Inteiros auto-incrementais são mais simples para bancos de dados únicos.
* **Índices**: É crucial adicionar índices em chaves estrangeiras e em colunas frequentemente usadas em consultas (`WHERE`, `JOIN`, `ORDER BY`) para otimizar a performance. Campos `position` são candidatos importantes para índices.
* **Validação**: O backend deve ser responsável por todas as validações de dados (tipos, formatos, regras de negócio como o limite de listas fixadas).
* **Operações de Arrastar e Soltar (DND)**:
    * Endpoints serão necessários para atualizar os campos `position` de listas e cartões.
    * A lógica para mover listas entre as áreas "regular" e "fixada" envolverá transações para garantir a consistência entre a tabela `lists` (para sua `position` na área regular) e `pinned_user_lists` (para sua `pinned_position` e associação).
* **Consultas para Listas (Regulares vs. Fixadas)**:
    * **Listas Regulares**: `SELECT * FROM lists WHERE board_id = :boardId AND list_id NOT IN (SELECT list_id FROM pinned_user_lists WHERE user_id = :userId AND board_id = :boardId) ORDER BY position;`
    * **Listas Fixadas**: `SELECT l.*, pul.pinned_position FROM lists l JOIN pinned_user_lists pul ON l.list_id = pul.list_id WHERE pul.user_id = :userId AND pul.board_id = :boardId ORDER BY pul.pinned_position;`
* **Soft Deletes**: Para funcionalidades de "lixeira" ou recuperação, considere adicionar um campo `deleted_at` (TIMESTAMP, Nulo por padrão) ou `is_deleted` (BOOLEAN) às tabelas principais em vez de realizar exclusões físicas.

Este esqueleto deve servir como um bom ponto de partida para a discussão e implementação do banco de dados pelo desenvolvedor backend.