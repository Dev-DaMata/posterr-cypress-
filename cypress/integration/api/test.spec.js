import test from "../../mocks/factories/test"

describe('test', () => {
    let tests = test.test();
    it('teste', ()=> {
        /*cy.log(JSON.stringify('Foi'))
        cy.log(JSON.stringify(tests))
        cy.test(tests.test)*/
        cy.log(cy.viewPosting())
    })

    it.only('teste query command',()=>{

        cy.viewPosting(tests.take, tests.skip).then(res=>{
            cy.log(JSON.stringify(res.body))
        })
    })
})
