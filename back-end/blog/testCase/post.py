from . import json, GraphQLTestCase
from users.testCase.User import UserTestCase

class PostTestCase(GraphQLTestCase):
        
    def test_all_query(self):
        response = self.query(
            '''
            query {
                allPost{
                edges{
                node{
                    id
                    title
                    content
                    dateCreated
                    dateUpdated
                }
                }
            }
            }
            '''
        )

        content = json.loads(response.content)
        self.assertResponseNoErrors(response)
        new = len(content['data']['allPost']['edges'])
        self.assertEqual(new,0)

    # Adicionar novo Tipo de Usuario
    def test_Add_mutation(self):
        UserTestCase.setUp(self)
        UserTestCase.test_TokenAuth_superUser(self)
        
        response = self.query(
        '''
            mutation($input: PostMotationInput!){
            post(input: $input){
                post{
                id
                title
                content
                dateCreated
                dateUpdated
                user{
                    id
                    username
                }
                }
            }
            }
            ''',
            input_data={
                	"title": "Derone",
                    "content": "Categoria Angola"
                }
            )

        content = json.loads(response.content)
        self.assertResponseNoErrors(response)
        new = content['data']['post']['post']
        self.assertEqual(new['title'],'Derone')
        return new


    def test_Edit_mutation(self):
        users = UserTestCase.setUp(self)
        UserTestCase.test_TokenAuth_superUser(self)
        
        response = self.query(
        '''
            mutation($input: PostMotationInput!){
            post(input: $input){
                post{
                id
                title
                content
                dateCreated
                dateUpdated
                user{
                    id
                    username
                }
                }
            }
            }
            ''',
            input_data={
                	"title": "Post 1",
                    "content": "Categoria",
                }
            )

        content = json.loads(response.content)
        self.assertResponseNoErrors(response)
        new = content['data']['post']['post']
        self.assertEqual(new['title'],'Post 1')
        self.assertEqual(new['user']['username'],users["super_user"].username)
        return new


    def test_get_query(self):
        # return
        oldContent = self.test_Edit_mutation()

        response = self.query(
        '''
            query($id:ID!){
                post(id:$id){
                    id
                    title
                    content
                }
            }
        ''',
        variables={'id': oldContent['id']}
        )

        content = json.loads(response.content)
        self.assertResponseNoErrors(response)
        new = content['data']['post']
        self.assertIsNot(new,None)
        self.assertEqual(new['title'],oldContent['title'])


    # Eliminar Usuario
    def test_Eliminar_mutation(self):
        oldContent = self.test_Edit_mutation()

        response = self.query(
            '''
                mutation($input: RemovePostInput!){
                    removePost(input: $input){
                        post{
                        id
                        title
                        content
                        }
                    }
                }                      
            ''',
            input_data={"id": oldContent['id']}
            )

        content = json.loads(response.content)
        self.assertResponseNoErrors(response)
        new = content['data']['removePost']['post']
        self.assertEqual(new['title'],oldContent['title'])