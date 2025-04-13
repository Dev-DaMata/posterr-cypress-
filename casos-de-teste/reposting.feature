Feature: Casos de teste para repostagens 
    Como um usuário do sistema
    Eu quero garantir que as regras de negócio para os resposts sejam aplicadas corretamente
    Para que eu possa ter certeza de que o sistema está funcionando como esperado

    Scenario: Criar uma repostagem com sucesso
        Dado que eu sou um usuário 
        Quando eu crio uma repostagem com o título "Repostagem do meu primeiro post" e o conteúdo "Este é o conteúdo da repostagem"
        Então eu devo ver uma mensagem de sucesso "Repostagem criada com sucesso"
        E a repostagem deve ser salva no banco de dados

    Scenario: Um usuário não pode repostar mais de 5 posts por dia
        Dado que eu sou um usuário 
        E eu já repostei 5 posts hoje
        Quando eu tento criar uma nova repostagem com o título "Repostagem do meu sexto post" e o conteúdo "Este é o conteúdo da repostagem"
        Então eu devo ver uma mensagem de erro "Limite de repostagens diárias atingido"
        E a repostagem não deve ser salva no banco de dados
        
    Scenario: Os usuários podem republicar postagens de outros usuários (como Retweet do Twitter), limitado a postagens originais (não permitido republicar seus proprios posts)
        Dado que eu sou um usuário 
        E eu vejo uma repostagem de outro usuário com o título "Repostagem do meu primeiro post" e o conteúdo "Este é o conteúdo da repostagem"
        Quando eu clico no botão "Repostar"
        Então eu devo Repostar o post original e não a repostagem desse usuário
        E eu devo ver uma mensagem de sucesso "Repostagem criada com sucesso"
        E a repostagem deve ser salva no banco de dados
        E a repostagem deve ter o mesmo conteúdo e título do post original
        E a repostagem deve ter o ID do post original
    
    Scenario: Os usuários devem confirmar sua intenção de republicar.
        Dado que eu sou um usuário 
        E eu vejo uma repostagem de outro usuário com o título "Repostagem do meu primeiro post" e o conteúdo "Este é o conteúdo da repostagem"
        Quando eu clico no botão "Repostar"
        Então eu devo ver uma mensagem de confirmação "Você tem certeza que deseja repostar?"
        E eu clico no botão "Sim"
        Então a repostagem deve ser criada com sucesso
    
    Scenario: Não deveria ser possível republicar a mesma postagem duas vezes
        Dado que eu sou um usuário 
        E eu vejo uma repostagem de outro usuário com o título "Repostagem do meu primeiro post" e o conteúdo "Este é o conteúdo da repostagem"
        Quando eu clico no botão "Repostar"
        Então eu devo ver uma mensagem de sucesso "Repostagem criada com sucesso"
        E a repostagem deve ser salva no banco de dados
        Quando eu tento repostar a mesma postagem novamente
        Então eu devo ver uma mensagem de erro "Você já repostou essa postagem"
        E a repostagem não deve ser salva no banco de dados