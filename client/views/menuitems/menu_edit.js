Template.menuEdit.events({
    'submit form': function (e) {
        e.preventDefault();

        var currentMenuId = this._id;

        var menuProperties = {
            title: $(e.target).find('[name=title]').val(),
            description: $(e.target).find('[name=description]').val()
        }

        Menus.update(currentMenuId, {$set: menuProperties}, function (error) {
            if (error) {
                alert(error.reason);
            } else {
                Router.go('menusList');
            }
        });
    },

    'click .delete': function (e) {
        e.preventDefault();

        if (confirm('Delete this menu?')) {
            var currentMenuId = this._id;
            Menus.remove(currentMenuId);
            Router.go('menusList');
        }
    }
});