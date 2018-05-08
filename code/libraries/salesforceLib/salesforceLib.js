var instance_url ="";
var token = "";


var authSalesforce = function(callback) {
    var authBody = "grant_type=password&client_id=" + salesforce_consumerKey + "&client_secret=" + salesforce_consumerSecret + "&username=" + salesforce_username + "&password=" + salesforce_password + salesforce_userSecret;
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
            data = JSON.parse(data);
            token = data.access_token;
            instance_url = data.instance_url;
            callback(false, token, instance_url)
        }
    });
}

//https://developer.salesforce.com/docs/atlas.en-us.soql_sosl.meta/soql_sosl/sforce_api_calls_soql.htm
//sample field : "phone"
//sample object : "Contact"
//sample filterField: "name"
//sample filterOperator: "="
//sample filterValue: "'John Doe'"
var querySalesforce = function(token, instance_url, field, object, filterField, filterOperator, filterValue, callback) {
    var q = "SELECT "+field +" from "+object+" where "+filterField+" "+filterOperator+" "+filterValue;
    var queryOptions = {
        "uri": instance_url + "/services/data/v20.0/query/",
        "qs": {
            "q": q 
        },
        "headers": {
            "Authorization": "Bearer " + token,
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

