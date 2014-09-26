Template.menusList.helpers({
	menus: function () {
        return Menus.find({}, {sort: {submitted: -1}});
    }
});