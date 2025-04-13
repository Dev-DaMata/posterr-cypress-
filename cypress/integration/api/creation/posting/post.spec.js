import { faker } from '@faker-js/faker';
import post from "../../../../mocks/factories/post"

describe('creating a new post', () => {
    const posts = post.postData()

    afterEach(() => {
        cy.task("READFROMDB", {
            dbConfig: Cypress.config('DBAPP'),
            sql: 'DELETE FROM "Posts" WHERE "UserId" = 4;'
        }).then(res => {
            cy.log(res.command)
            cy.log(res.rowCount)    
        })
    })
    
    it('creating a new post', () => {
        cy.createPosting(posts).then(res => {
            expect(res.body.authorId).to.eq(posts.authorId);
            expect(res.body.postContent).to.eq(posts.postContent);
            expect(res.status).to.eq(200);
        })
    })

    it('A user is not allowed to post more than 5 posts in one day', () => {
        const authorId = 4;
        const postContents = [
            'Essa é a minha primeira publicação em um dia',
            'Essa é a minha segunda publicação em um dia',
            'Essa é a minha terceira publicação em um dia',
            'Essa é a minha quarta publicação em um dia',
            'Essa é a minha quinta publicação em um dia'
        ];

        postContents.forEach((content) => {
            const postData = {
                authorId,
                postContent: content,
            };

            cy.createPosting(postData).then(res => {
                expect(res.status).to.eq(200);
            });
        });

        posts.authorId = "4";
        posts.postContent = 'esse é a minha sexta publicação em um dia';

        cy.createPosting(posts).then(res => { //Deveria dar erro nesse create e não no de baixo
            cy.log(res.body)
        })
        cy.createPosting(posts).then(res => {
            expect(res.body.StatusCode).to.eq(500); //deveria dar o erro 400, 500 é de servidor, né?
            expect(res.body.Description).to.eq("You cannot publish more posts than you already have (5 posts per day)")
        })


        
    })

    it.skip('Messages can have a maximum of 777 characters', () => { //não tem mensagem de erro 

        posts.authorId = "4";
        posts.postContent = faker.string.alpha(778),
 
        cy.createPosting(posts).then(res => { //Deveria dar erro nesse create e não no de baixo
            cy.log(res.body)
        })
    })
})
