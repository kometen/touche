Posts = new Meteor.Collection('posts');

Posts.allow({
    update: ownsPost,
    remove: ownsPost
});

Posts.deny({
    update: function (ownerId, doc, fields) {
        // Only edit specified fields
        return (_.without(fields, 'url', 'title', 'message').length > 0);
    }
});

Meteor.methods({
    postPost: function (postAttributes) {
        var user = Meteor.user();

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

        // whitelisted keys
        var post = _.extend(_.pick(postAttributes, 'url', 'title', 'message'), {
            ownerId: post._id,
            owner: post.username,
            submitted: new Date().getTime()
        });

        var postId = Posts.insert(post);

        return postId;
    }
});