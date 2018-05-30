/**
 * This service ensures that constants for this ipm package are set.
 */
function SalesforceTestSetup(req, resp){
    Configuration = {
         SALESFORCE_CONSUMERKEY,
         SALESFORCE_CONSUMERSECRET,
         SALESFORCE_USERSECRET,
         SALESFORCE_USERNAME,
         SALESFORCE_PASSWORD
    }
    var checkConstantEmpty = function (constant) {
        if (constant === "") {
            return true;
        } else {
            return false;
        }
    }

    var errMessages = [];

    for (var property in Configuration) {
        if ( Configuration.hasOwnProperty(property) && (checkConstantEmpty(Configuration[property]))){
            errMessages.push(property + " not set in SalesforceConstants Library");
        }
    }  
    
    if(errMessages.length > 0){
        resp.error(errMessages);
    }
    else{
        resp.success("All constants have been set successfully")
    }
    
}