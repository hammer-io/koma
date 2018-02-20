define({ "api": [
  {
    "type": "get",
    "url": "/heartbeats",
    "title": "Get Heartbeats",
    "version": "1.0.0",
    "name": "Get_Heartbeat",
    "group": "Heartbeats",
    "permission": [
      {
        "name": "None"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>The id of the project which is posting a new heartbeat</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Response Example",
          "content": "HTTP/1.1 200 OK\n[\n {\"timestamp\": \"1452488445471\"}\n]",
          "type": "json"
        }
      ]
    },
    "filename": "src/routes/heatbeat.routes.js",
    "groupTitle": "Heartbeats"
  },
  {
    "type": "post",
    "url": "/heartbeats",
    "title": "Post New Heartbeat",
    "version": "1.0.0",
    "name": "Post_Heartbeat",
    "group": "Heartbeats",
    "permission": [
      {
        "name": "None"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>The id of the project which is posting a new heartbeat</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request Example:",
          "content": "{\n \"id\": \"111-1111-111\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/routes/heatbeat.routes.js",
    "groupTitle": "Heartbeats"
  },
  {
    "type": "get",
    "url": "/tokens/:tokenId",
    "title": "Delete Token",
    "version": "1.0.0",
    "name": "Delete_Token",
    "group": "Tokens",
    "permission": [
      {
        "name": "Endor only (Authorization: \"Bearer <token>\")"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "tokenId",
            "description": "<p>The id of the token being deleted (not the token string itself)</p>"
          }
        ]
      }
    },
    "filename": "src/routes/tokens.routes.js",
    "groupTitle": "Tokens"
  },
  {
    "type": "get",
    "url": "/tokens",
    "title": "Get Tokens",
    "version": "1.0.0",
    "name": "Get_Tokens",
    "group": "Tokens",
    "permission": [
      {
        "name": "Endor only (Authorization: \"Bearer <token>\")"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "projectId",
            "description": "<p>The id of the project to filter tokens by</p>"
          },
          {
            "group": "Parameter",
            "optional": true,
            "field": "String",
            "description": "<p>tokenId The id of the token being requested (not the token string itself)</p>"
          }
        ]
      }
    },
    "filename": "src/routes/tokens.routes.js",
    "groupTitle": "Tokens"
  },
  {
    "type": "post",
    "url": "/tokens",
    "title": "Post New API Token",
    "version": "1.0.0",
    "name": "Post_Token",
    "group": "Tokens",
    "permission": [
      {
        "name": "Endor only (Authorization: \"Bearer <token>\")"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "projectId",
            "description": "<p>The id of the project to create the token for</p>"
          }
        ]
      }
    },
    "filename": "src/routes/tokens.routes.js",
    "groupTitle": "Tokens"
  }
] });
