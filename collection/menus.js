Menus = new Meteor.Collection('menus');

Menus.allow({
    update: ownsMenu,
    remove: ownsMenu
});

Menus.deny({
    update: function (userId, doc, fields) {
        // Only edit specified fields
        return (_.without(fields, 'title', 'description').length > 0);
    }
});

Meteor.methods({
    saveMenu: function (postAttributes) {
        var user = Meteor.user();
        var title = Menus.findOne({title: postAttributes.title});

        // ensure user is logged in
        if (!user) {
            throw new Meteor.Error(401, 'You need to log in to add new menus');
        }
        if (!postAttributes.title) {
            throw new Meteor.Error(422, 'Please fill in the title');
        }
        if (!postAttributes.description) {
            throw new Meteor.Error(422, 'Please fill in a description');
        }
        // Check there are no previous posts with the same link
        if (postAttributes.title && title) {
            throw new Meteor.Error(302, 'This menu has already been added', title._id);
        }

        // whitelisted keys
        var menu = _.extend(_.pick(postAttributes, 'title', 'description'), {
            userId: user._id,
            author: user.username,
            submitted: new Date().getTime()
        });

        var menuId = Menus.insert(menu);

        return menuId;
    }
});