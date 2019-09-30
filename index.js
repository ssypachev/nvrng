const fs = require('fs');

class Genders = {
	Any:     "a",
	Female:  "f",
	Male:    "m",
	Neutral: "n"
};

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
	
	getData () {
		return this.rset;
	}
	
	upload (filename, { shuffle = true, control = true } = {}) {
		let self = this;
		let self.genders = [];
		try {
			self.rset = require(filename);
		} catch (err) {
			return err;
		}
		if (shuffle) {
			for (let [key, space] of Object.entries(self.rset)) {
				for (let [key, arr] of Object.entries(space)) {
					NVRNG.shuffle(arr);
				}
			}
		}
		return null;
	}
	
	getSet (size, { gender: Genders.Any } = {}) {
		let out  = new Set(),
			self = this;
		for (;;) {
			for (let [key, space] of Object.entries(self.rset)) {
				
				
				
			}
		}
	}
	
	static getSetBut (size, exclude, { gender: Genders.Any } = {}) {
	}
	
}

module.exports.NVRNG   = NVRNG;
mosule.exports.Genders = Genders;
























