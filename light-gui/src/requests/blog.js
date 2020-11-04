export const GET_POST =(id)=>{ 
  return {
   query:    ` 
   query{  
    post(id: "${id}"){
      id
      title
      content
      pictureUrl
      dateCreated
      dateUpdated
      user{
        id 
        username
        email
        avatarUrl
      }
    }
  }
   `}
}

export const GET_ALL_POST =()=>{ 
   return {
    query:    ` 
        query{
                allPost{
                    pageInfo{
                        hasNextPage
                        hasPreviousPage
                        startCursor
                        endCursor
                      }
                    edges{
                        node{
                        id
                        title
                        content
                        pictureUrl
                        dateCreated
                        dateUpdated
                        user{
                            id
                            username
                            email
                            avatarUrl
                        }
                        }
                    }
                }
            }  
    `}
}


export const GET_ALL_USER_POST =(username)=>{ 
    return {
     query:    ` 
     query{
      allUsers(username: "${username}"){
        edges{
          node{
          posts{
            pageInfo{
              hasNextPage
              hasPreviousPage
              startCursor
              endCursor
            }
            edges{
              node{
                id
                title
                content
                pictureUrl
                dateCreated
                dateUpdated
                user{
                    id
                    username
                    email
                    avatarUrl
                }
              }
          }
          }
          }
        }
      }
    }    
     `}
 }

export const QUERY_ADD_POST = (title, content) => {
    return {
        query: `
        mutation($input: PostMotationInput!){
            post(input: $input){
              post{
                id
                title
                content
                pictureUrl
                dateCreated
                dateUpdated
                user{
                    id
                    username
                    email
                    avatarUrl
                }
              }
            }
          }  
        `, 
        variables: {
            input: {
                title: title,
                content: content
            }
        }
}
}


export const QUERY_UPDATE_POST = (id,title, content) => {
  return {
      query: `
      mutation($input: PostMotationInput!){
          post(input: $input){
            post{
              id
              title
              content
              pictureUrl
              dateCreated
              dateUpdated
              user{
                  id
                  username
                  email
                  avatarUrl
              }
            }
          }
        }  
      `, 
      variables: {
          input: {
              id: id,
              title: title,
              content: content
          }
      }
}
}

export const DELETE_POST =(id)=>{ 
  return {
   query:    ` 
    mutation($input: RemovePostInput!){
      removePost(input: $input){
        post{
          id
          title
          content
        }
      }
  }
   `,
   variables: {
    input: {
        id: id
      }
    }
  }
}
