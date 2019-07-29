var https = require('https');
var fs = require('fs')

var result;

https.get('https://api.scryfall.com/cards/random?q=t%3Abasic&unique=prints', (resp) => {
	let data = '';
	resp.on('data', (chunk) => {
		data += chunk;
	});

	resp.on('end', () => {
		result = JSON.parse(data);
		let img_url = result.image_uris.art_crop;
		//write('images/'+result.oracle_id+'.json', data)
		fs.writeFile('images/'+result.oracle_id+'.json', data, 'utf-8', function(err){
			if (err) throw err
			console.log("Card info saved.")
		})
		get_img(img_url)
	});

}).on("error", (err) => {
	console.log("Error: " + err.message);
});

function get_img(img_url){
	https.get(img_url, (resp) => {
		let img_data = '';
		resp.setEncoding('binary');

		resp.on('data', (chunk) => {
			img_data += chunk;
		});
		
		resp.on('end', () => {
			fs.writeFile('images/'+result.oracle_id+'.png', img_data, 'binary', function(err){
				if (err) throw err
				console.log('Image saved.')
			})
		});

	}).on("error", (err) => {
		console.log("Error: " + err.message);
	})
};
