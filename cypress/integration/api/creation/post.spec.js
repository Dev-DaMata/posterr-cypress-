import post from "../../../mocks/factories/post"
describe('creating a new post', () => {
    const posts = post.postData()
    it('creating a new post', () => {
        cy.createPosting(posts).then(res => {
            cy.log(res)
        })
    })
})
