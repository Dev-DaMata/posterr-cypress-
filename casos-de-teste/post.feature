Feature: Casos de teste para os posts 
    Como um usuário do sistema
    Eu quero garantir que as regras de negócio para os posts sejam aplicadas corretamente
    Para que eu possa ter certeza de que o sistema está funcionando como esperado

    Scenario: Criar um post com sucesso (Backend)
        Dado que eu sou um usuário 
        Quando eu crio um post com o título "Meu primeiro post" e o conteúdo "Este é o conteúdo do meu primeiro post"
        Então eu devo ver uma mensagem de sucesso "Post criado com sucesso"
        E o post deve ser salvo no banco de dados
    
    Scenario: Um usuário não pode postar mais de 5 posts por dia (Backend)
        Dado que eu sou um usuário 
        E eu já criei 5 posts hoje
        Quando eu tento criar um novo post com o título "Meu sexto post" e o conteúdo "Este é o conteúdo do meu sexto post"
        Então eu devo ver uma mensagem de erro "Limite de posts diários atingido"
        E o post não deve ser salvo no banco de dados
    
    Scenario: As postagens podem ter no máximo 777 caracteres (Backend / Frontend)
        Dado que eu sou um usuário 
        Quando eu crio um post com o título "Post longo" e o conteúdo "a" repetido 778 vezes
        Então eu devo ver uma mensagem de erro "O conteúdo do post deve ter no máximo 777 caracteres"
        E o post não deve ser salvo no banco de dados 

    Scenario: A renderização da postagem deve incluir o nome do usuário do autor e a data de criação, além do condeúdo (Frontend)
        Dado que eu sou um usuário 
        E eu criei um post com o título "Meu primeiro post" e o conteúdo "Este é o conteúdo do meu primeiro post"
        Quando eu visualizo o post
        Então eu devo ver o nome do usuário "Usuário" 
        E eu devo ver a data de criação "2023-10-01" (Com a data da criação do post)
        E eu devo ver o conteúdo "Este é o conteúdo do meu primeiro post"

    Scenario: Os usuários não podem atualizar ou excluir suas postagens (Frontend)
        Dado que eu sou um usuário 
        E eu criei um post com o título "Meu primeiro post" e o conteúdo "Este é o conteúdo do meu primeiro post"
        Quando eu tento atualizar o post com o título "Meu primeiro post atualizado" e o conteúdo "Este é o conteúdo do meu primeiro post atualizado"
        Então eu devo ver uma mensagem de erro "Você não tem permissão para atualizar este post"
        E o post não deve ser atualizado no banco de dados
        Quando eu tento excluir o post
        Então eu devo ver uma mensagem de erro "Você não tem permissão para excluir este post"
        E o post não deve ser excluído do banco de dados

    ##Scenario: Os usuários podem alterar a classificação entre "mais recentes" e "tendências". Ao escolher "mais recentes" (padrão), as postagens serão renderizadas em ordem decrescente da data de criação. Para postagens "tendências", aquelas com mais republicações devem vir primeiro.

    Scenario: Ao filtrar os resultados por palavras-chaves, são esperadas apenas corresponências exatas para o conteúdo da postagem 
        Dado que eu sou um usuário 
        E eu criei um post com o título "Meu primeiro post" e o conteúdo "Este é o conteúdo do meu primeiro post"
        Quando eu filtro os resultados por palavras-chave "primeiro"
        Então eu devo ver o post com o título "Meu primeiro post" e o conteúdo "Este é o conteúdo do meu primeiro post"
        E não devo ver outros posts que não correspondam à palavra-chave

    Scenario: Somente postagens originais são esperadas como resultado da filtragem por palavras-chave, não permitindo repostagens
        Dado que eu sou um usuário 
        E eu criei um post com o título "Meu primeiro post" e o conteúdo "Este é o conteúdo do meu primeiro post"
        E eu criei uma repostagem com o título "Repostagem do meu primeiro post" e o conteúdo "Este é o conteúdo da repostagem"
        Quando eu filtro os resultados por palavras-chave "primeiro"
        Então eu devo ver apenas o post original com o título "Meu primeiro post" e o conteúdo "Este é o conteúdo do meu primeiro post"
        E não devo ver a repostagem com o título "Repostagem do meu primeiro post" e o conteúdo "Este é o conteúdo da repostagem"