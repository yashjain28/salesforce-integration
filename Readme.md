# ipm package: salesforce-integration

## Overview

Rapidly integrate Salesforce to add context to your IoT Solution.  This library demonstrates how to query against your organizations Salesforce data.

This is an ipm package, which contains one or more reusable assets within the ipm Community. The 'package.json' in this repo is a ipm spec's package.json, [here](https://docs.clearblade.com/v/3/6-ipm/spec), which is a superset of npm's package.json spec, [here](https://docs.npmjs.com/files/package.json).

[Browse ipm Packages](https://ipm.clearblade.com)

## Setup

Edit the library SalesforceConstants to attach to your Salesforce instance. 
Use the library _SalesforceLib_ to authenticate to your instance. Then run SOQL query against Salesforce.

## Usage

Rapidly integrate Salesforce to add context to your IoT Solution. Easily query against your organizations Salesforce data. 

## Assets
### Code Services

#### Example

`SalesforceExampleQuery` - Shows an example to run an SOQL query on Salesforce.

#### Test

`SalesforceTestSetup` - This service ensures that constants for this ipm package are set.
### Code Libraries

* `SalesforceLib` - This library helps user to authenticate and query Salesforce. Access it by creating an instance using _Salesforce()_.

* `SalesforceConstants` - a constants library, which holds constants specific to this ipm package. 

## API

### Typedefs

<dl>
<dt><a href="#callback">callback</a> : <code>function</code></dt>
<dd><p>This callback is displayed as part of this Library.</p>
</dd>
<dt><a href="#Salesforce">Salesforce</a> : <code>Object</code></dt>
<dd><p>This library demonstrates how to query against your organizations Salesforce data.</p>
</dd>
</dl>

<a name="callback"></a>

### callback : <code>function</code>
This callback is displayed as part of this Library.

**Kind**: global typedef  

| Param | Type |
| --- | --- |
| err | <code>Object</code> | 
| data | <code>Object</code> | 

<a name="Salesforce"></a>

### Salesforce : <code>Object</code>
This library demonstrates how to query against your organizations Salesforce data.

**Kind**: global typedef  
**Example**  

```js
var salesforce = Salesforce();
```

* [Salesforce](#Salesforce) : <code>Object</code>
    * [.authenticate(callback)](#Salesforce.authenticate)
    * [.querySelectedInstance(field, object, filterField, filterOperator, filterValue, callback)](#Salesforce.querySelectedInstance)

<a name="Salesforce.authenticate"></a>

#### Salesforce.authenticate(callback)
This method helps user authorize into Salesforce platform and get a tokena dn instance_url in response.
It assumes the global constants in the SalesforceConstants library are set.
On successful execution of this function, *instance_url* and *token* variables are set.

**Kind**: static method of [<code>Salesforce</code>](#Salesforce)  

| Param | Type |
| --- | --- |
| callback | [<code>callback</code>](#callback) | 

**Example**  

```js
var salesforce = Salesforce();
salesforce.authenticate(querySelectedInstanceCallback);
```
<a name="Salesforce.querySelectedInstance"></a>

#### Salesforce.querySelectedInstance(field, object, filterField, filterOperator, filterValue, callback)
This method lets user query services in an user's instance on salesforce platform.
https://developer.salesforce.com/docs/atlas.en-us.soql_sosl.meta/soql_sosl/sforce_api_calls_soql.htm

**Kind**: static method of [<code>Salesforce</code>](#Salesforce)  

| Param | Type | Description |
| --- | --- | --- |
| field | <code>string</code> | Example: "phone" |
| object | <code>string</code> | Example: "Contact" |
| filterField | <code>string</code> | Example: "name" |
| filterOperator | <code>string</code> | Example: "=" |
| filterValue | <code>string</code> | Example: "'John Doe'" |
| callback | [<code>callback</code>](#callback) |  |

**Example**  

```js
var salesforce = Salesforce();
salesforce.authenticate(querySelectedInstanceCallback);

var sendResponseCallback = function(err, queryResult) {
  if (err ){
      resp.error("Failed to execute Query" + queryResult);
  }else {
      resp.success(queryResult)   
  }
};

function querySelectedInstanceCallback(err, data) {
    if (err){
        sendResponse(true, ("Failed to authenticate" + data));
    }else {
        //Ex: query: "SELECT phone from Contact where name = 'John Doe'"
        var field = "phone";
        var object = "Contact";
        var filterField = "name";
        var filterOperator = "=";
        var filterValue = "'JohnDoe'"
        
        salesforce.querySelectedInstance(field, object, filterField, filterOperator, filterValue, sendResponseCallback);
    }
}
```
