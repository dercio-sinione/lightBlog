
export const updateObject = (oldObject, updateObjectProperties) =>{
    return{
        ...oldObject,
        ...updateObjectProperties
    }
}


export const getCookie = name => {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

export const JWT_HEADER =(token)=> {
    return {
        headers:{
        "Content-type": "application/json",
        "Authorization": `JWT ${token}`
        }
    }
}

export const STANDARD_HEADER = () => {
    return {
        headers:{
        "Content-type": "application/json",
        }
    }
}