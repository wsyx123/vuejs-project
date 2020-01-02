import axios from 'axios'
//登录api
export function loginAPI(url,username,password){
  var basicAuth = 'Basic ' + btoa(username + ':' + password);
  axios.post(url,{},{
    headers:{
      'Authorization': basicAuth,
      'content-type': 'application/json'
    }
  }).then(res => {
    const data = res.data;
    this.data=data;
  })
}

export function loginAPI1(url,username,password) {
  var basicAuth = 'Basic ' + btoa(username + ':' + password);
  return  new Promise(resolve => {
    axios.post(url, {},{
      headers:{
        'Authorization': basicAuth,
        'content-type': 'application/json'
      }
    }).then(response => {
        resolve(response.data);
    })
  });
}

export function getAPItoken(url,token) {
  const tokenAuth = 'Token '+token;
  return  new Promise(resolve => {
    axios.get(url,{
      headers:{
        'Authorization': tokenAuth,
        'content-type': 'application/json'
      }
    }).then(response => {
        resolve(response.data);
    })
  });
}


export function postAPItoken(url,kwargs,token) {
  const tokenAuth = 'Token '+token;
  return  new Promise(resolve => {
    axios.post(url,kwargs,{
      headers:{
        'Authorization': tokenAuth,
        'content-type': 'application/json'
      }
    }).then(response => {
        resolve(response.data);
    })
  });
}

export function patchAPItoken(url,kwargs,token){
  const tokenAuth = 'Token '+token;
  return  new Promise(resolve => {
    axios.patch(url,kwargs,{
      headers:{
        'Authorization': tokenAuth,
        'content-type': 'application/json'
      }
    }).then(response => {
        resolve(response);
    })
  });
}

export function putAPItoken(url,kwargs,token){
  const tokenAuth = 'Token '+token;
  return  new Promise(resolve => {
    axios.put(url,kwargs,{
      headers:{
        'Authorization': tokenAuth,
        'content-type': 'application/json'
      }
    }).then(response => {
        resolve(response.data);
    })
  });
}

export function deleteAPItoken(url,kwargs,token){
  const tokenAuth = 'Token '+token;
  return  new Promise(resolve => {
    axios.delete(url,{
      headers:{
        'Authorization': tokenAuth,
        'content-type': 'application/json'
      }
    }).then(response => {
        resolve(response.data);
    })
  });
}