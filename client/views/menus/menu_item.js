Template.menuItem.helpers({
    ownMenu: function () {
        return this.userId == Meteor.userId();
    },
	domain: function () {
		var a = document.createElement('a');
		a.href = this.url;
		return a.hostname;
	}
});

Template.menuItem.events({
    'click .details': function (e) {
        e.preventDefault();

        Session.set('edit_menu', 'changed');
        Session.set('menu_id', this._id);
    }
});