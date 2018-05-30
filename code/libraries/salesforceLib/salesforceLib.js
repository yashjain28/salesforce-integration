

/**
 * This library demonstrates how to query against your organizations Salesforce data.
 * @typedef {Object} Salesforce
 * 
 * @example 
 * 
 * var salesforce = Salesforce();
 */
function Salesforce(){
    
    var instance_url ="";
    var token = "";

    /**
     * This method helps user authorize into Salesforce platform and get a tokena dn instance_url in response.
     * It assumes the global constants in the SalesforceConstants library are set.
     * On successful execution of this function, *instance_url* and *token* variables are set.
     * @memberof Salesforce
     * @method authenticate
     * 
     * @param {callback} callback
     * @example
     * 
     * var salesforce = Salesforce();
     * salesforce.authenticate(querySelectedInstanceCallback);
     */
    function authenticate(callback) {
        var authBody = "grant_type=password&client_id=" + CONFIG.SALESFORCE_PASSWORDSALESFORCE_CONSUMER_KEY + "&client_secret=" + CONFIG.SALESFORCE_PASSWORDSALESFORCE_CONSUMER_SECRET + "&username=" + CONFIG.SALESFORCE_PASSWORDSALESFORCE_USER_NAME + "&password=" + CONFIG.SALESFORCE_PASSWORDSALESFORCE_PASSWORD + CONFIG.SALESFORCE_PASSWORDSALESFORCE_USER_SECRET;
        var requestObject = Requests();
        var options = {
            "uri": "https://login.salesforce.com/services/oauth2/token",
            "body": authBody,
            "headers": {
                "Accept": "application/json",
                "Content-Type": "application/x-www-form-urlencoded"
            }
        };
        requestObject.post(options, function(err, data) {
            if(err) {
                log("Error: " + JSON.stringify(data))
                callback(true, JSON.stringify(data))
                resp.error(data);
            } else {
                var parsedData = JSON.parse(data);
                token = parsedData.access_token;
                instance_url = parsedData.instance_url;
                callback(false, parsedData)
            }
        });
    }

    /**
     * This method lets user query services in an user's instance on salesforce platform.
     * https://developer.salesforce.com/docs/atlas.en-us.soql_sosl.meta/soql_sosl/sforce_api_calls_soql.htm
     * @memberof Salesforce
     * @method querySelectedInstance
     * @param {string} field - Example: "phone"
     * @param {string} object - Example: "Contact" 
     * @param {string} filterField - Example: "name" 
     * @param {string} filterOperator - Example: "=" 
     * @param {string} filterValue - Example: "'John Doe'" 
     * @param {callback} callback
     * 
     * @example
     * 
     * var salesforce = Salesforce();
     * salesforce.authenticate(querySelectedInstanceCallback);
     * 
     * var sendResponseCallback = function(err, queryResult) {
     *   if (err ){
     *       resp.error("Failed to execute Query" + queryResult);
     *   }else {
     *       resp.success(queryResult)   
     *   }
     * };
     * 
     * function querySelectedInstanceCallback(err, data) {
     *     if (err){
     *         sendResponse(true, ("Failed to authenticate" + data));
     *     }else {
     *         //Ex: query: "SELECT phone from Contact where name = 'John Doe'"
     *         var field = "phone";
     *         var object = "Contact";
     *         var filterField = "name";
     *         var filterOperator = "=";
     *         var filterValue = "'JohnDoe'"
     *         
     *         salesforce.querySelectedInstance(field, object, filterField, filterOperator, filterValue, sendResponseCallback);
     *     }
     * }
     */
    function querySelectedInstance(field, object, filterField, filterOperator, filterValue, callback) {
        var q = "SELECT "+field +" from "+object+" where "+filterField+" "+filterOperator+" "+filterValue;
        var queryOptions = {
            "uri": instance_url + "/services/data/v20.0/query/",
            "qs": {
                "q": q 
            },
            "headers": {
                "Authorization": ["Bearer", token].join(' '),
                "Content-Type": "application/json"
            }
        };
        
        requestObject.get(queryOptions, function(err, data) {
            if(err) {
                log("Error getting contact info " + JSON.stringify(data));
                callback(true, JSON.stringify(data))
            } else {
                callback(false, data);
            }
        });
    }
    
}

/**
* This callback is displayed as part of this Library.
* @callback callback
* @param {Object} err
* @param {Object} data
*/