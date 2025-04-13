import post from "../../../../mocks/factories/post"
import reposts from "../../../../mocks/factories/reposts"

describe('Create a repost', () => {
    //Criar uma postagem com um usuário     FEITO
    //respostar ele com outro usuário   
    //validar ambos
    
    const posts = post.postData()
    const repost = reposts.repostData()
    let postId;

    beforeEach(() => {
        posts.postContent = 'publicação criada pelo usuário 4 para ser repostada por outro usuário';
        cy.createPosting(posts).then(res => {
            expect(res.body.authorId).to.eq(posts.authorId);
            expect(res.body.postContent).to.eq(posts.postContent);
            expect(res.status).to.eq(200);
        })
        const key =  'repostada';
        cy.listPostByKey(key).then(res => {
            expect(res.body[0].postContent).to.eq(posts.postContent);
            expect(res.status).to.eq(200);
            cy.log(res.body[0].postId)
            postId = res.body[0].postId
        })
    })

    afterEach(() => {
        cy.task("READFROMDB", {
            dbConfig: Cypress.config('DBAPP'),
            sql: `DELETE FROM "Posts" WHERE "PostId" = ${postId};`
        })

        cy.task("READFROMDB", {
            dbConfig: Cypress.config('DBAPP'),
            sql: `DELETE FROM "Reposts" WHERE "ParentPostId" = ${postId};`
        })
    })


    it('Create a repost', () => { //retornar mensagem no body
        cy.log(postId)
        cy.log('Criando repost')
        repost.userId = 1
        repost.postId = postId
        cy.createRepost(repost).then(res => {
            cy.log(res.body)
        })
    })
})