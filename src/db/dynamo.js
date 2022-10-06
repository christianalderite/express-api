var AWS = require('aws-sdk');
var { aws_remote_config } = require('./dynamo_config');

class dynamoHelper {
  
  constructor(){
    AWS.config.update(aws_remote_config);
    this.docClient = new AWS.DynamoDB.DocumentClient();
    this.table_name = null;
    console.log(aws_remote_config);
  }

  get(table_name){
    if (process.env.NODE_ENV === 'test') {
      this.table_name = 'test_' + table_name;
    } else {
      this.table_name = table_name;
    }
    return this;
  };

  async insert(json) {
    var response = null;
    var params = {
      TableName: this.table_name,
      Item: json
    };
    response = await this.docClient.put(params, function(err, data) {
      if (err) {
        console.log("Error", err);
      } else {
        console.log("Success", data);
      }
    }).promise();
    return response;
  }

  async findOne(json) {
    var response = null;
    var params = {
      TableName: this.table_name,
      Key: json
    };
    response = await this.docClient.get(params, function(err, data) {
      if (err) {
          console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
      } else {
          console.log("GetItem succeeded:", JSON.stringify(data, null, 2));
      }
    }).promise();
    return response["Item"];
  }

  async find() {
    var response = null;
    var params = {
      TableName: this.table_name,
      Select: "ALL_ATTRIBUTES"
    };
    response = await this.docClient.scan(params, function(err, data) {
      if (err) {
         console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
      } else {
         console.log("GetItem succeeded:", JSON.stringify(data, null, 2));
      }
    }).promise();
    return response["Items"];
  }


};

const db = new dynamoHelper();

module.exports = db;