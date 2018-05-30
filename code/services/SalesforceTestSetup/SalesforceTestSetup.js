/**
 * This service ensures that constants for this ipm package are set.
 */
function SalesforceTestSetup(req, resp){
    var isConfigured = function (constant) {
        return constant ? true : false
    }

    var errMessages = [];

    for (var property in SALESFORCE_CONFIG) {
        if (SALESFORCE_CONFIG.hasOwnProperty(property) && (!isConfigured(SALESFORCE_CONFIG[property]))){
            errMessages.push(property + " not set in SalesforceConstants Library");
        }
    }  
    
    if(errMessages){
        resp.error(errMessages);
    }
    else{
        resp.success("All constants have been set successfully")
    }
    
}