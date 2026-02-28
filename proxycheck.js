
__get$ = function(a,b){return a,b};

function checkScramjet(){
  if (window.$scramjetVersion != undefined || window.$scramjet != undefined || window.$scramjet$wrap != undefined){
    return true;
  }

  let rewriter = checkForRewrite()
  for (i in rewriter){
    const rewriterName = rewriter[i];
    eval("var oranges = window." + rewriterName + "(`window.top`)");
    if (oranges.startsWith("window.") && oranges.endsWith("_top")){
        return true;
    }
  }
}

function checkRH(){
  if (window.__rhget$IM != undefined){
    return true;
  }
  else {
    return false;
  }
}

function checkForConfig(){
    const configFiles = [];
    for (let i in window) {
    if (i == undefined || i == null){continue;}
    nugget = i.toString();
    if (typeof window[i] === 'object' && nugget.endsWith("$config")) {
        configFiles.push(i);
    }
    }
    return(configFiles);  
}

function checkForCookies(){
    const cookies = [];
    for (let key of Object.getOwnPropertyNames(window)) {
        var temp = window[key];
        if (typeof temp == 'string' ) {
            if (key.endsWith("$cookies")){
                cookies.push(key);
            }
        }
    }
    return(cookies);  
}


function checkForRewrite(){
    const rewrite = [];
    for (let key of Object.getOwnPropertyNames(window)) {
        var temp = window[key];
        if (typeof temp == 'function' ) {
            if (key.endsWith("$rewrite")){
                rewrite.push(key);
            }
        }
    }
    return(rewrite);  
}

function checkForIdk(){
    const rewrite = [];
    for (let key of Object.getOwnPropertyNames(window)) {
        var temp = window[key];
        if (key.endsWith("get$Eval")){
            rewrite.push(key);
        }
    }
    return(rewrite[0]);  
}

function checkDynamic(){
    if (window.__dynamic$baseURL != undefined){
        return true;
    }
}


function checkUV(){
  let configFiles = checkForConfig()
  for (i in configFiles){
    const currentConfig = configFiles[i];
    const contents = eval("window." + currentConfig);
    if (contents.bare != undefined || contents.decodeUrl != undefined || contents.encodeUrl != undefined || contents.bundle != undefined){
        return true;
    }
  }
  const cookies = checkForCookies();
  for (i in cookies){
    const currentCookies = cookies[i];
    const contents = eval("window." + currentCookies);
    if (currentCookies.startsWith("_")){
        return true;
    }
  }

  if (window.__uv$config != undefined ){
   return true;
  }
}

function checkForCroxy(){
    if (window.__cpLocation != undefined){
        return true;
    }
}

if (checkUV() || checkScramjet() || checkRH() || checkDynamic() || checkForCroxy() || checkForIdk() != undefined){
    var inProxy = true;
}

