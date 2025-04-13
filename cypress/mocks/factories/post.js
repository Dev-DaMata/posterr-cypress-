import { faker } from '@faker-js/faker';

let userIdLet = 4 
let PostContentMsg = faker.lorem.paragraphs(3)

export default {
    postData(){
        let data = {
            authorId: userIdLet,
            postContent: PostContentMsg
        }
        return data
    }
}