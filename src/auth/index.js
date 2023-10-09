
export const doLogin=(data)=>{
    localStorage.setItem("data",JSON.stringify(data));
};

export const doLogout=()=>{
    localStorage.removeItem("data");
};

export const isLoggedIn=()=>{
    let data=localStorage.getItem("data");
    if(data==null)
    {
        return false;
    }
    else{
        return true;
    }
}

export const getCurrentUser=()=>{
    if(isLoggedIn)
    {
        return JSON.parse(localStorage.getItem("data"));
    }
    else
    {
        return false;
    }
}