Template.menuDetails.helpers({
    ownMenu: function () {
        return this.userId == Meteor.userId();
    },
    menu: function () {
        return Menus.findOne(Session.get('menu_id'));
    },
    edit_menu: function () {
        return Menus.findOne(Session.get('edit_menu'));
    }
});

Template.menuDetails.events({
    'click input.edit': function (e) {
        e.preventDefault();

        Session.set('edit_menu', Session.get('menu_id'));
    }
});