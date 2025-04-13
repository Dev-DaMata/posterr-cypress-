import { faker } from '@faker-js/faker';

let userIdLet = 1 
let PostContentMsg = faker.lorem.paragraphs(3)

export default {
    postData(){
        let data = {
            //PostId: postId,
            authorId: userIdLet,
            postContent: PostContentMsg
        }
        return data
    }
}