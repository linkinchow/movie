
function createFulltextIndex(){
    var xmlHttp = null;
    try {
        // Mozilla, Opera, Safari sowie Internet Explorer (ab v7)
        xmlHttp = new XMLHttpRequest();
    } catch(e) {
        try {
            // MS Internet Explorer (ab v6)
            xmlHttp  = new ActiveXObject("Microsoft.XMLHTTP");
        } catch(e) {
            try {
                // MS Internet Explorer (ab v5)
                xmlHttp  = new ActiveXObject("Msxml2.XMLHTTP");
            } catch(e) {
                xmlHttp  = null;
            }
        }
    }
    if (xmlHttp) {
        xmlHttp.open('POST', '/movieRating/sina/server/createFulltextIndex.xsjs', false);
        xmlHttp.onreadystatechange = function () {
            if (xmlHttp.readyState === 4) {
                window.console.log(xmlHttp.statusText);
                // alert(xmlHttp.responseText);
            }
        };
        xmlHttp.send(null);
    }
}



if(typeof define === "function" && define.amd){
    define( [], function($) {
        "use strict";

        createFulltextIndex();
    });

}else{
    createFulltextIndex();
}
