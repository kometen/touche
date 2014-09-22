if (Posts.find().count() === 0) {
    Posts.insert({
        title: 'Introducing Telescope',
        author: 'Sacha Greif',
        url: 'http://www.gnome.no'
    });
    Posts.insert({
        title: 'Meteor',
        author: 'Tom Coleman',
        url: 'http://www.meteor.com'
    });
}