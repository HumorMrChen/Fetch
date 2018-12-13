
const transToURLSearchParams = (data) => {
    let formData = new URLSearchParams();
    let bodyKeys = Object.keys(data)
    bodyKeys.forEach((key)=>{
        if(typeof data[key] === 'object') {
            formData.append(key, JSON.stringify(data[key]))
        }else{
            formData.append(key, data[key])
        }
    })
    return formData;
}
const Fetch =(opt)=> {
    if(typeof opt === 'string') {
        return fetch(opt).then((res)=>res.json() || res.text()).catch(e=>{console.log(e)})
    }else {
        let method = opt.method ? opt.method.toLocaleUpperCase() : 'GET';
        switch(method) {
            case 'GET':
                return Fetch.GET(opt);
            case 'POST':
                return Fetch.POST(opt);
            case 'PUT':
                return Fetch.PUT(opt);
            case 'DELETE':
                return Fetch.DELETE(opt);
            default:
                return Fetch.GET(opt);
        }
    }
}
Fetch.GET = (opt) => {
    try{
        let params = opt.params || opt.data || null;
        let url = opt.url;
        if( params !== null && Object.keys(params).length ) {
            let keys = Object.keys(params);

            let reg = /\?/;
            if(!url.match(reg)){
                url += '?'
            }
            keys.forEach((key, index)=>{
                if(index === 0) {
                    url += `${key}=${params[key]}`
                }else {
                    url += `&${key}=${params[key]}`
                }
            })

            return fetch(url).then((res)=>{
                switch (opt.type) {
                    case 'buffer':
                        return res.arrayBuffer();
                    case 'blob':
                        return res.blob();
                    case 'text':
                        return res.text();
                    default:
                        return res.json()
                }
            }).catch(e=>{console.log(e)})
        }
    }catch (e) {
        console.log(e)
    }
}

Fetch.POST = (opt) => {
    let url = opt.url;
    let newOpt = {}
    let keys = Object.keys(opt);
    keys.forEach((key)=>{
        if(key !== 'url' && key !=='method' && key !== 'data' && key !== 'body') {
            newOpt[key] = opt[key]
        }
    })
    newOpt.method = 'POST';
    if(opt.body) {
        newOpt.body = transToURLSearchParams(opt.body);
    }
    if(opt.data){
        newOpt.body = transToURLSearchParams(opt.data);
    }
    return fetch(url, newOpt).then(res=>{
        switch (opt.type) {
            case 'buffer':
                return res.arrayBuffer();
            case 'blob':
                return res.blob();
            case 'text':
                return res.text();
            default:
                return res.json()
        }
    }).catch(e=>{console.log(e)})
}

Fetch.PUT = (opt) => {
    let url = opt.url;
    let newOpt = {}
    let keys = Object.keys(opt);
    keys.forEach((key)=>{
        if(key !== 'url' && key !=='method' && key !== 'data' && key !== 'body') {
            newOpt[key] = opt[key]
        }
    })
    newOpt.method = 'PUT';
    if(opt.body) {
        newOpt.body = transToURLSearchParams(opt.body);
    }
    if(opt.data){
        newOpt.body = transToURLSearchParams(opt.data);
    }
    return fetch(url, newOpt).then(res=>{
        switch (opt.type) {
            case 'buffer':
                return res.arrayBuffer();
            case 'blob':
                return res.blob();
            case 'text':
                return res.text();
            default:
                return res.json()
        }
    }).catch(e=>{console.log(e)})
}

Fetch.DELETE = (opt) => {
    let url = opt.url;
    let newOpt = {}
    let keys = Object.keys(opt);
    keys.forEach((key)=>{
        if(key !== 'url' && key !== 'method' && key !== 'data' && key !== 'body') {
            newOpt[key] = opt[key]
        }
    })
    newOpt.method = 'DELETE';
    if(opt.body) {
        newOpt.body = transToURLSearchParams(opt.body);
    }
    if(opt.data){
        newOpt.body = transToURLSearchParams(opt.data);
    }
    return fetch(url, newOpt).then(res=>{
        switch (opt.type) {
            case 'buffer':
                return res.arrayBuffer();
            case 'blob':
                return res.blob();
            case 'text':
                return res.text();
            default:
                return res.json()
        }
    }).catch(e=>{console.log(e)})
}
export default Fetch;
