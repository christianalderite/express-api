const AWS = require('aws-sdk');
const config = require('./dynamo_config');

class dynamoHelper {

  constructor(){
    AWS.config.update(config.aws_remote_config);
    this.docClient = new AWS.DynamoDB.DocumentClient();
    this.table_name = null;
  }

  get(table_name){
    if (process.env.NODE_ENV === 'test') {
      this.table_name = 'test_' + table_name;
    } else {
      this.table_name = table_name;
    }
  };

  put(json) {
    var params = {
      TableName: table_name,
      Item: json
    };
    docClient.put(params, function(err, data) {
      if (err) {
        console.log("Error", err);
        return false;
      } else {
        console.log("Success", data);
        return true;
      }
    });
  }

  findOne(json) {
    var params = {
      TableName: table_name,
      Key: json
    };
    docClient.get(params, function(err, data) {
      if (err) {
          console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
          return false;
      } else {
          console.log("GetItem succeeded:", JSON.stringify(data, null, 2));
          return data;
      }
    });
  }

  find(){
    var params = {
      TableName: table_name,
      Select: "ALL_ATTRIBUTES"
    };
    docClient.scan(params, function(err, data) {
      if (err) {
         console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
         return false;
      } else {
         console.log("GetItem succeeded:", JSON.stringify(data, null, 2));
         return data;
      }
    });
  
  }

};

const db = dynamoHelper();

module.exports = db;