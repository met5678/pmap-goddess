/*
{
	width: 100,
	height: 100,
	corners: [ [0,0],   [100,0],
						 [100,0], [100,100] ],
	content: {
		video: null,
		fugueInk: {

		},
		background: '#FFFFFF'
	}
}
*/

Surfaces = new Mongo.Collection('surfaces');

if(Meteor.isServer) {
	if(Surfaces.find().count() === 0) {
		Surfaces.insert({
			width: 100,
			height: 100,
			corners: [ [0,0],    [100,0],
								 [50,100], [150,100] ],
			content: {
				video: null,
				fugueInk: null,
				background: '#FFFFFF'
			}
		});
	}
}