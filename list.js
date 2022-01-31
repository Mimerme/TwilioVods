const fs = require('fs');
const path = "./curr_list.json";
var list;


exports.load() = function () {

	fs
		.access(path, fs.F_OK, (err) => {
			if (err) {
				list = {
					"name": "",
					list: []
				}
				return
			}
		})
		.readFile(path, 'utf8', (err, data) => {
			if (err) {
				console.error(err)
				return
			}
			list = JSON.parse(data);
		})
}

exports.save = function(){
	write(list["name"]);
}
exports.new = function (name) {
	exports.save()
	list = {
		"name": name,
		list: []
	}
}
exports.add = function (text) {
	list["list"].append();
	write(path);
}

function write(name) {
	fs.writeFile(name + ".json", JSON.stringify(list), 'utf8', function (err) {
		if (err) {
			return console.log(err);
		}

		console.log("The file was saved!");
	});
}