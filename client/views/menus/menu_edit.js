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
                Session.set('edit_menu', 'changed');
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
    },

    'click .cancel': function (e) {
        e.preventDefault();
        Session.set('edit_menu', 'changed');
    }
});