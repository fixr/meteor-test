// 1. HTML as templates.
// 2. Spacebars {{ ... }}. {{# each }}, {{# if }}, etc...
// 3. Javascript "helpers" for templates
// 4. Collections
//    meteor mongo
//    db.talks.insert({ title: "Conquistando al mundo, un buffer de Emacs a la vez.", createdAt: new Date() });
// 5. Events
//    real-time ability
// 6. Inserting values to DB and sorting on the view

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
      return Talks.find({}, { sort: { createdAt: -1 }});
    }
  });

  Template.body.events({
    "submit .new-talk": function (event) {
      // This function is called when the new talk form is submitted
      console.log(event);

      var title = event.target.title.value;

      Talks.insert({
        title: title,
        createdAt: new Date() // current time
      });

      // Clear form
      event.target.title.value = "";

      // Prevent default form submit
      return false;
    }
  });

}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
