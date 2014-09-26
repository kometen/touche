Meteor.publish('posts', function () {
    return Posts.find();
});

Meteor.publish('menus', function () {
    return Menus.find();
});