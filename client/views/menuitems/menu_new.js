Template.menuNew.events( {
    'submit form': function (e) {
        e.preventDefault();

        var post = {
            title: $(e.target).find('[name=title]').val(),
            description: $(e.target).find('[name=description]').val()
        };

        Meteor.call('saveMenu', post, function (error, id) {
            if (error) {
                throwError(error.reason);

                if (error.error === 302) {
                    Router.go('menuPage', {_id: error.details});
                }
            } else {
                Router.go('menuPage', {_id: id});
            }
        });
    }
});