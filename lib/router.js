Router.configure({
    layoutTemplate: 'layout',
    loadingTemplate: 'loading',
    waitOn: function () {
        return [
            Meteor.subscribe('posts'),
            Meteor.subscribe('menus')
        ];
    }
});

Router.map(function () {
    this.route('postsList', {path: '/'});
    this.route('menusList', {path: '/menus'});

    this.route('postNew', {
        path: '/posts/new'
    });
    this.route('menuNew', {
        path: '/menus/new'
    });

    this.route('postPage', {
        path: '/posts/:_id',
        data: function () { return Posts.findOne(this.params._id); }
    });
    this.route('menuPage', {
        path: '/menus/:_id',
        data: function () { return Menus.findOne(this.params._id); }
    });

    this.route('postEdit', {
        path: '/posts/:_id/edit',
        data: function () { return Posts.findOne(this.params._id); }
    });
    this.route('menuEdit', {
        path: '/menus/:_id/edit',
        data: function () { return Menus.findOne(this.params._id); }
    });
});

var requireLogin = function (pause) {
    if (!Meteor.user()) {
        if (Meteor.loggingIn()) {
            this.render(this.loadingTemplate);
        } else {
            this.render('accessDenied');
        }
        pause();
    }
};

Router.onBeforeAction('loading');
Router.onBeforeAction(requireLogin, {only: 'postNew'});
Router.onBeforeAction(requireLogin, {only: 'menuNew'});
Router.onBeforeAction(function () { clearErrors() });