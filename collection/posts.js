Posts = new Meteor.Collection('posts');

Posts.allow({
    update: ownsDocument,
    remove: ownsDocument
});

Posts.deny({
    update: function (userId, doc, fields) {
        // Only edit specified fields
        return (_.without(fields, 'url', 'title', 'message').length > 0);
    }
});

Meteor.methods({
    savePost: function (postAttributes) {
        var user = Meteor.user();
        var postLink = Posts.findOne({url: postAttributes.url});

        // ensure user is logged in
        if (!user) {
            throw new Meteor.Error(401, 'You need to log in to add new posts');
        }
        if (!postAttributes.url) {
            throw new Meteor.Error(422, 'Please fill in the URL');
        }
        if (!postAttributes.title) {
            throw new Meteor.Error(422, 'Please fill in the title');
        }
        if (!postAttributes.message) {
            throw new Meteor.Error(422, 'Please fill in a message');
        }
        // Check there are no previous posts with the same link
        if (postAttributes.url && postLink) {
            throw new Meteor.Error(302, 'Link has already been posted', postLink._id);
        }

        // whitelisted keys
        var post = _.extend(_.pick(postAttributes, 'url', 'title', 'message'), {
            userId: user._id,
            author: user.username,
            submitted: new Date().getTime()
        });

        var postId = Posts.insert(post);

        return postId;
    }
});