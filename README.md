Objectives
==========
- Define [Surfaces] onto which things can be projected
- Surfaces are quads, which map to container <divs> or Famous surfaces
- Corner points can be moved on a quad to position/transform it
- A surface can contain a piece of [Content]: videos, images, fills, fugue ink, arbitrary html
- Should run in browser at URL

Nice to haves
=============
- Midi sync of some sort
- Chromecast support
- Saving/loading configurations
- Remote editing of alignments
- Timelined stuff

Implementation brainstorm
=========================
Meteor
- Saving and remote sync is built-in
- Possibly overkill, heavyweight

Sockets
- Likely essential for doing any kind of sync

Rekapi
- Timelining, incl serialization

