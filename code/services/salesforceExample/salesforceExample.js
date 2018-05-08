function salesforceExample(req, resp){
    
    var sendResponse = function(err, queryResult) {
        if (err ){
            resp.error("Failed to execute Query");
        }else {
             resp.success(queryResult)   
        }
        
    };
    
    var runSalesforceQuery = function(err, token, instance_url) {
        if (err){
            sendResponse(true, "Failed to authenticate");
        }else {
            "SELECT phone from Contact where name = 'John Doe'"
            var field = "phone";
            var object = "Contact";
            var filterField = "name";
            var filterOperator = "=";
            var filterValue = "'JohnDoe'"
            
            querySalesforce(token, instance_url, field, object, filterField, filterOperator, filterValue, sendResponse)
        }
    }
    
    authSalesforce(runSalesforceQuery);   
}