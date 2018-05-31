/**
 * This example shows how to query into Salesforce
 * It involves two steps
 * 1. Authorizing into Salesforce to get token and instance url
 * 2. Use this token and instance url to make a query to a service in your account.
 * 
 */
function SalesforceExampleQuery(req, resp){
    
    var sendResponse = function(err, queryResult) {
        if (err ){
            resp.error("Failed to execute Query " + queryResult);
        }else {
            resp.success(queryResult)   
        }
        
    };
    var salesforce = Salesforce();
    
    salesforce.authenticate(querySelectedInstanceCallback);

    function querySelectedInstanceCallback(err, data) {
        if (err){
            sendResponse(true, ("Failed to authenticate " + data));
        }else {
            //Ex: query: "SELECT phone from Contact where name = 'John Doe'"
            var field = "phone";
            var object = "Contact";
            var filterField = "name";
            var filterOperator = "=";
            var filterValue = "'JohnDoe'"
            
            salesforce.querySelectedInstance(field, object, filterField, filterOperator, filterValue, sendResponse);
        }
    }
    
}