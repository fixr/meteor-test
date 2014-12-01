// 1. HTML as templates.
// 2. Spacebars {{ ... }}. {{# each }}, {{# if }}, etc...
// 3. Javascript "helpers" for templates
// 4. Collections
//    meteor mongo
//    db.talks.insert({ title: "Conquistando al mundo, un buffer de Emacs a la vez.", createdAt: new Date() });
// 5. Events
//    real-time ability
// 6. Inserting values to DB and sorting on the view
// 7. Update and delete events
// 8. Mobile
//    # Android
//    meteor install-sdk android
//    meteor add-platform android
//    meteor run android # emulator
//    meteor run android-device [--mobile-server codetails.meteor.com]
//    # iOS
//    meteor install-sdk ios
//    meteor add-platform ios
//    meteor run ios # emulator
//    meteor run ios-device [--mobile-server codetails.meteor.com]


Talks = new Mongo.Collection("talks");

if (Meteor.isClient) {

  // Body helpers
  Template.body.helpers({
    // talks: [
    //   { title: "Arreglando el Asset Pipeline" },
    //   { title: "Mi hijo, llamado Godzilla" },
    //   { title: "¿Cómo me cargué los assets del bucket? #bucketgate" }
    // ]

    talks: function () {
      if (Session.get("hideCompleted")) {
        return Talks.find({ checked: { $ne: true } }, { sort: { createdAt: -1 } });
      } else {
        return Talks.find({}, { sort: { createdAt: -1 }});
      }
    },

    hideCompleted: function () {
      return Session.get("hideCompleted");
    },

    incompleteCount: function () {
      return Talks.find({ checked: { $ne: true } }).count();
    }
  });

  //
  // Body events
  //
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
    },

    "change .hide-completed input": function (event) {
      Session.set("hideCompleted", event.target.checked);
    }
  });

  //
  // "Talk" template events
  //
  Template.talk.events({

    // [!] Important
    // Inside the event handlers, "this" refers to an individual task object

    // Set the checked property to the opposite of its current value
    "click .toggle-checked": function () {
      Talks.update(this._id, { $set: { checked: ! this.checked } });
    },

    // delete
    "click .delete": function () {
      Talks.remove(this._id);
    }
  });

}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
