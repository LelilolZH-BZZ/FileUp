//variables
var obj = "#fileInput";
var robj = document.querySelector(window.obj);
var robj_form = document.querySelector('#resetForm');
var uploadToken;

//window onload
window.onload = function(){
    document.querySelector("body").style.display = "block";
    //window.robj_form.reset();
    syncVisual();
}

//reload icon button
function reloadPage(){
    window.location = window.location.href;
}

//filedropper
function getInputContent(){
    return window.robj.files;
}

//anny changes
function inputChanges(){
    syncVisual(getInputContent());
}

//drop handler
function dropHandler(ev){
    ev.preventDefault();
    var newValue = new DataTransfer();
    for(var i = 0; i < window.robj.files.length; i++){
        newValue.items.add(window.robj.files[i]);
    }
    for(var i = 0; i < ev.dataTransfer.files.length; i++){
        newValue.items.add(ev.dataTransfer.files[i]);
    }
    window.robj.files = newValue.files;
    syncVisual(getInputContent());
}

//drag hover
function dragOverHandler(ev) {
    ev.preventDefault();
}

//visual sync
function syncVisual(){
    //console.log(">syncVisual");
    var innerIcon = document.querySelector(".frameBox_dropBox1_uploadIcon_inner");
    var outherObj = document.querySelector(".fileContentViewer");
    var formholder = document.querySelector(".fileInput_label");
    var uploadbutton = document.querySelector(".uploadButtonBox_outher");
    if(getInputContent().length > 0){
        innerIcon.classList.add('makeInvisible');
        formholder.classList.add('makeInvisible');
        outherObj.classList.remove('makeInvisible');
        uploadbutton.classList.remove('makeInvisible');
        document.querySelector(".fileContentViewer").innerHTML = '';
        startSyncBuilder(getInputContent());
        addSpaceToEnd();
    }else{
        innerIcon.classList.remove('makeInvisible');
        formholder.classList.remove('makeInvisible');
        outherObj.classList.add('makeInvisible');
        uploadbutton.classList.add('makeInvisible');
        document.querySelector(".fileContentViewer").innerHTML = '';
    }
}

function startSyncBuilder(from){
    //console.log(">startSyncBuilder");
    var mustBeDeleted = new Array();
    var theFile = from;
    
    for(var i = 0; i < theFile.length; i++){
        //start
        var title = theFile[i]["name"];
        var newDelete = syncBuilder(title, i, from);
        if(newDelete >= 0){
            mustBeDeleted.push(newDelete);
        }
    }
    for(var i = 0; i < mustBeDeleted.length; i++){
        removeData(mustBeDeleted[i]);
    }
}

function syncBuilder(title, randId){
    //console.log(">syncBuilder ("+title+", "+randId+")");
    var gotRemoved = -1;
    
    //check file
    if(getInputContent()[randId]["size"] > 1000000 * 100){
        //remove item from list
        gotRemoved = randId;
        console.log(">Removed: "+title);
    }
    //1000000 = 1mb
    
    //start create
    let oneFileBox = document.createElement("DIV");
    let oneFileBoxText = document.createElement("DIV");
    let oneFileBoxButtonOuther = document.createElement("DIV");
    let oneFileBoxButtonInner = document.createElement("DIV");
    let deleteButtonImage = document.createElement("IMG");
    let deleteButtonHover = document.createElement("DIV");
    let loadingbarOuther = document.createElement("DIV");
    let loadingbarInner = document.createElement("DIV");
    
    //set Name
    oneFileBoxText.appendChild(document.createTextNode(title));
    
    //set classes -> setAttribute("class", "democlass");
    oneFileBox.setAttribute("class", "oneFileBox randid"+randId);
    oneFileBoxText.setAttribute("class", "oneFileBoxText");
    oneFileBoxButtonOuther.setAttribute("class", "oneFileBoxButtonOuther");
    oneFileBoxButtonInner.setAttribute("class", "oneFileBoxButtonInner");
    deleteButtonImage.setAttribute("class", "deleteButtonImage");
    deleteButtonHover.setAttribute("class", "deleteButtonHover");
    loadingbarOuther.setAttribute("class", "loadingbarOuther makeInvisible");
    loadingbarInner.setAttribute("class", "loadingbarInner");
    
    //set image
    deleteButtonImage.setAttribute("src", "/img/close.svg");
    deleteButtonImage.setAttribute("alt", "Löschen");
    
    //check if removed
    if(gotRemoved >= 0){
        //set bg color
        oneFileBox.setAttribute("style", "display: none;");
        //set button
        deleteButtonHover.setAttribute("onclick", "removeItemFromList("+randId+")");
    }else{
        //set button
        deleteButtonHover.setAttribute("onclick", "removeItemFromList("+randId+")");
    }
    
    //create object
    oneFileBoxButtonInner.appendChild(deleteButtonImage);
    oneFileBoxButtonInner.appendChild(deleteButtonHover);
    
    oneFileBoxButtonOuther.appendChild(oneFileBoxButtonInner);
    
    loadingbarOuther.appendChild(loadingbarInner);
    
    oneFileBox.appendChild(oneFileBoxText);
    oneFileBox.appendChild(oneFileBoxButtonOuther);
    oneFileBox.appendChild(loadingbarOuther);
    
    //insert data only when not deleted
    if(gotRemoved === -1){
        document.querySelector(".fileContentViewer").appendChild(oneFileBox);   
    }
    return gotRemoved;
}

//delete functions
function removeData(x){
    //console.log(">removeItemFromList: "+x);
    var y = getInputContent();
    var z = new DataTransfer();
    for(var i = 0; i < y.length; i++){
        if(i !== x){
            z.items.add(y[i]);
        }
    }
    window.robj.files = z.files;
    console.log(z.files);
    syncVisual(getInputContent());
}

function removeItemFromList(x){
    console.log(">removeItemFromList: "+x);
    removeData(x);
}

function addSpaceToEnd(){
    let oneFileBox = document.createElement("DIV");

    oneFileBox.setAttribute("class", "oneFileBoxBottomSPace");
    
    document.querySelector(".fileContentViewer").appendChild(oneFileBox);
}

//upload button function
function submitButton(){
    var uploadButton = document.querySelector(".uploadButtonBox_inner");
    var itembox = document.querySelector(".fileContentViewer");
    
    var deleteButton = document.querySelectorAll(".oneFileBoxButtonOuther");
    var loadingBar = document.querySelectorAll(".loadingbarOuther");
    
    uploadButton.classList.add('makeInvisible');
    
    itembox.scrollTo(0, 0);
    itembox.style.overflow = "hidden";
    
    for(var i=0;i<deleteButton.length;i++){
        deleteButton[i].classList.add("makeInvisible");
    }
    for(var i=0;i<loadingBar.length;i++){
        loadingBar[i].classList.remove("makeInvisible");
    }
    
    requestToken();
}

function requestToken(){
    var req = new XMLHttpRequest;
    req.open("GET", "/req/token.php", true);
    req.onload = function(){
        var resp = this.responseText;
        if(resp.includes('{token}(')){
            var token = resp.replace('{token}(', '');
            console.log(token);
            window.uploadToken = token;
            startUpload(token);
            showSettings();
        }else{
            alert(resp);
        }
    }
    req.onerror = function(){
        alert("Please reconnect to the Wifi. Will retry in 30s.");
        setTimeout(requestToken, 1000 * 30);
    }
    req.send();
}

var activeUploads = 0;
var madeOutOfList = new Array();

function startUpload(token){
    var uploadButton = document.querySelector(".uploadButtonBox_inner");
    var itembox = document.querySelector(".fileContentViewer");
    
    var deleteButton = document.querySelectorAll(".oneFileBoxButtonOuther");
    var loadingBar = document.querySelectorAll(".loadingbarOuther");
    
    var allFiles = getInputContent();
    if(allFiles.length > 3){
        uploadDirect(token, getNextUploadIdFile());
        uploadDirect(token, getNextUploadIdFile());
        uploadDirect(token, getNextUploadIdFile());
    }else{
        uploadDirect(token, getNextUploadIdFile());
    }
}

function getNextUploadIdFile(){
    var x = 0;
    for(var i = 0; i < window.madeOutOfList.length; i++){
        if(window.madeOutOfList.indexOf(x) !== -1){
            x++;
        }else{
            break;
        }
    }
    window.madeOutOfList.push(x);
    return x;
}

function uploadDirect(token, i){
    var loadingBar = document.querySelectorAll(".loadingbarInner");
    window.activeUploads++;
    
    var data = new FormData();
    var files = getInputContent();
    data.append('file', files[i]);
    
    var req = new XMLHttpRequest;
    req.open("POST", "/req/upload.php", true);
    req.onload = function(){
        hideFileBox(i);
        console.log("["+i+"]>"+this.responseText);
        var nextId = getNextUploadIdFile();
        if(getInputContent()[nextId]){
            setTimeout(function(){
                uploadDirect(token, nextId);
                window.activeUploads = window.activeUploads - 1;
            }, 100);
            //console.log(window.madeOutOfList);
        }else{
            window.activeUploads = window.activeUploads - 1;
            if(window.activeUploads === 0){
                finishUpload();
            }
        }
    }
    req.upload.onprogress = function(e){
        //loaded & total
        loadingBar[i].style.width = 100 / e.total * e.loaded+"%";
    }
    req.onerror = function(){
        alert("File Upload Error. Retry will start in 30s.");
        setTimeout(uploadDirect(token, i), 1000 * 30);
    }
    req.send(data);
}

function hideFileBox(i){
    var oneFileBox = document.querySelectorAll(".oneFileBox");
    oneFileBox[i].style.transition = "0.3s";
    oneFileBox[i].style.height = oneFileBox[i].offsetHeight + "px";
    oneFileBox[i].style.overflow = "hidden";
    setTimeout(function(){
        oneFileBox[i].style.height = "0px";
        oneFileBox[i].style.paddingTop = "0px";
        oneFileBox[i].style.paddingBottom = "0px";
        oneFileBox[i].style.margin = "0px";
        oneFileBox[i].style.border = "0px";
        oneFileBox[i].style.opacity = 0;
        setTimeout(function(){
            oneFileBox[i].style.display = "none";
        }, 400);
    }, 100);
}

function finishUpload(){
    setTimeout(function(){
        window.robj_form.reset();
    }, 500);
}

function resetSiteForm(){
    var uploadButton = document.querySelector(".uploadButtonBox_inner");
    var itembox = document.querySelector(".fileContentViewer");
    var deleteButton = document.querySelectorAll(".oneFileBoxButtonOuther");
    var loadingBar = document.querySelectorAll(".loadingbarOuther");
    var theForm = document.querySelector(".fileContentViewer");
    
    theForm.innerHTML = "";
    uploadButton.classList.remove('makeInvisible');
    
    itembox.scrollTo(0, 0);
    itembox.style.overflowY = "scroll";
    itembox.style.overflowX = "hidden";
    
    for(var i=0;i<deleteButton.length;i++){
        deleteButton[i].classList.remove("makeInvisible");
    }
    for(var i=0;i<loadingBar.length;i++){
        loadingBar[i].classList.add("makeInvisible");
    }
    
    //reset global variables
    window.activeUploads = 0;
    window.madeOutOfList = new Array();
}

//settings function

function showSettings(){
    var box = document.querySelector(".settingsUpload");
    box.classList.remove('makeInvisible');
}

function saveSettingsForUpload(){
    //hide settings
    var box = document.querySelector(".settingsUpload");
    box.classList.add('makeInvisible');
    var req = new XMLHttpRequest();
    req.open("POST", "/req/save.php", true);
    req.onload = function(){
        resetSiteForm();
        syncVisual();
        showLink(this.responseText);
    }
    req.onerror = function(){
        alert("Check your wifi connection.");
        box.classList.remove('makeInvisible');
    }
    
    if(checkDatas() === "ok"){
        req.send(getSettingsDataInForm());  
    }else{
        alert(checkDatas());
    }
}
function checkDatas(){
    //stunde, minuten, downloads, viewers, passwort
    var stunde = document.querySelector("#stunde").value;
    var minuten = document.querySelector("#minuten").value;
    var downloads = document.querySelector("#downloads").value;
    var viewers = document.querySelector("#viewers").value;
    var passwort = document.querySelector("#passwort").value;
    
    if(stunde >= 0 && stunde <= 120 && stunde + minuten > 0){
        
    }else{
        return("Die Zeitangabe "+stunde+"h "+minuten+"min ist ungültig.");
    }
    
    if(downloads >= 1 && downloads <= 1000){
        
    }else{
        return("Die maximale Downloadzahl muss zwischen 1 und 1'000 liegen.");
    }
    
    if(viewers >= 10 && viewers <= 10000){
        
    }else{
        return("Max Viewers muss zwischen 10 und 10'000 liegen.");
    }
    return("ok");
}

function getSettingsDataInForm(){
    var stunde = document.querySelector("#stunde").value;
    var minuten = document.querySelector("#minuten").value;
    var downloads = document.querySelector("#downloads").value;
    var viewers = document.querySelector("#viewers").value;
    var passwort = document.querySelector("#passwort").value;
    
    var data = new FormData();
    data.append("stunden", stunde);
    data.append("minuten", minuten);
    data.append("downloads", downloads);
    data.append("viewers", viewers);
    data.append("passwort", passwort);
    return(data);
}

function showLink(){
    
}