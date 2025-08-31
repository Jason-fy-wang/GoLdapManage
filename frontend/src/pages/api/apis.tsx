import axios from "axios";


// set for axios to setup authorization header
axios.interceptors.request.use((config) => {
    const skipUrls = ['/login', "/register"]
    const shoudSkip = skipUrls.some(url => config.url?.includes(url))
    if(!shoudSkip){
        const token = gettoken()
        if(token) {
            config.headers.Authorization = token
        }
    }
    return config
},
(error) => {
    console.log("setting header authorization error: ", error)
    return Promise.reject(error)
}
)

function login(username: string,pwd :string, host :string,port :string) {
    const formdata = new FormData()
    formdata.append("username", username)
    formdata.append("password", pwd)
    formdata.append("lhost", host)
    formdata.append("lport", port)
    return axios.post("/login", formdata, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    } )
}

function allRecords() {
    return axios.get("/ldap/all")
}


function getDnInfo(dn:string) {

    return axios.get("/ldap/dn?dn="+dn)
}

function getAllSchemas() {
    return axios.get("/schema")
}

function addRecord(recInfo:string) {
    return axios.post("/ldap/add", recInfo, {
        headers: {
            "Content-Type": "application/json"
        }
    })
}

function delRecord(dn:string) {
    const encoded = encodeURIComponent(dn)
    return axios.delete("/ldap/del?dn="+encoded)
}


const tokenkey = "token"
function storetoken(token: string) {
    localStorage.setItem(tokenkey, token)
}

function gettoken() {
    return localStorage.getItem(tokenkey)
}


export {login,storetoken,gettoken,allRecords,getDnInfo,getAllSchemas,addRecord,delRecord}