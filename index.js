const fs = require('fs');

let rset = null;

class NVRNG {
	
	static randIntFromZero (max) {
		return Math.floor(Math.random() * (max + 1));
	}
	
	static shuffle (arr) {
		let i = arr.length - 1;
		for (; i > 0; i -= 1) {
			let j = NVRNG.randIntFromZero(i),
			    tmp = arr[j];
			arr[j] = arr[i];
			arr[i] = tmp;
		}
	}
	
	static async upload (filename, { shuffle = true }) {
		let [err, data] = await new Promise((resolve) => {
			fs.readFile(filename, (err, data) => {
				if (err) {
					resolve([err, null]);
				}
				return resolve([null, data]);
			});
		});
		if (err) {
			throw err;
		}
		rset = data;
	}
	
	static getSet (size, options) {
	}
	
	static getSetBut (size, exclude, options) {
	}
	
}

module.exports.NVRNG = NVRNG;