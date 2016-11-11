/**
* Gets the current paramers in the url
* @return {object} params The parameters in the current url
*/
function getParams(){
    let params = {};
    //Get all parameters from the url
    let query = window.location.search.substring(1).split("&");
    query.forEach(function(param){
        let pair = param.split("=");
        if( pair[0] && pair[1] ){
            params[pair[0]] = pair[1];
        }
    });

    return params;
}
/**
*
*/
function setParams(){

}


module.exports.getParams = getParams;
module.exports.setParams = setParams;
