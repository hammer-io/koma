define({ "api": [
  {
    "type": "get",
    "url": "/heartbeats/:id",
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
  }
] });
