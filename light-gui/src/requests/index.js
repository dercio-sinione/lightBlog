export const SERVER_URL = "http://127.0.0.1:8000";
export const SERVER_API_URL = "http://127.0.0.1:8000/graphql/";
export const TOKEN = localStorage.getItem('token')


export const LOGIN = (username, password) => {
    return {
        query: `
        mutation TokenAuth($input: ObtainJSONWebTokenInput!){
            tokenAuth(input: $input){
            payload
            refreshExpiresIn
            refreshToken
            token
            user{
                id
                username
                email
            }
        }
        }  
        `, 
        variables: {
            input: {
                username: username,
                password: password
            }
        }
}
}

export const VERIFY_TOKEN = (token) => {
    return {
        query: `
        mutation($token: String!){
            verifyToken(token: $token){
              payload
            }
          }  
        `, 
        variables: {
            token: token,
        }
}
}
