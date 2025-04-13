import post from "../../../../mocks/factories/post"

describe('Listing posts', () => {
    const posts = post.postData()
    posts.postContent = 'Essa postagem deve ser encontrada na busca pela paravra chave por alguma palavra'

    beforeEach(() => {
        cy.createPosting(posts).then(res => {
            expect(res.body.authorId).to.eq(posts.authorId);
            expect(res.body.postContent).to.eq(posts.postContent);
            expect(res.status).to.eq(200);
        })
    })
    afterEach(() => {
        cy.task("READFROMDB", {
            dbConfig: Cypress.config('DBAPP'),
            sql: 'DELETE FROM "Posts" WHERE "UserId" = 4;'
        }).then(res => {
            cy.log(res.command)
            cy.log(res.rowCount)    
        })
    })

    it('When filtering results by keywords, only exact matches to the post content are expected.', () => {
        const key =  'encontrada';
        cy.listPostByKey(key).then(res => {
            expect(res.body[0].postContent).to.eq(posts.postContent);
            expect(res.status).to.eq(200);
        })
    })
})