Meteor.publish('surfaces', function() {
	return Surfaces.find();
});