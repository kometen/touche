var postsData = [
	{
		title: 'Introducing Telescope',
		author: 'Sacha Greif',
		url: 'http://www.gnome.no'
	},
	{
		title: 'Meteor',
		author: 'Tom Coleman',
		url: 'http://www.meteor.com'
	}
];
Template.postsList.helpers({
	posts: postsData
})