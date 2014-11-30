// 1. HTML as templates.
// 2. Spacebars {{ ... }}. {{# each }}, {{# if }}, etc...
// 3. Javascript "helpers" for templates


if (Meteor.isClient) {
  // This code only runs on the client
  Template.body.helpers({
    talks: [
      { text: "Arreglando el Asset Pipeline" },
      { text: "Mi hijo, llamado Godzilla" },
      { text: "¿Cómo me cargué los assets del bucket? #bucketgate" }
    ]
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
