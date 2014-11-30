// 1. HTML as templates.
// 2. Spacebars {{ ... }}. {{# each }}, {{# if }}, etc...
// 3. Javascript "helpers" for templates
// 4. Collections
//    meteor mongo
//    db.talks.insert({ title: "Conquistando al mundo, un buffer de Emacs a la vez.", createdAt: new Date() });

Talks = new Mongo.Collection("talks");

if (Meteor.isClient) {
  // This code only runs on the client
  Template.body.helpers({
    // talks: [
    //   { title: "Arreglando el Asset Pipeline" },
    //   { title: "Mi hijo, llamado Godzilla" },
    //   { title: "¿Cómo me cargué los assets del bucket? #bucketgate" }
    // ]

    talks: function () {
      return Talks.find({});
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
