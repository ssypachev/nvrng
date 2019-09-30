const fs = require('fs');

const Genders = {
	Any:     "a",
	Female:  "f",
	Male:    "m",
	Neutral: "n"
};

class NVRNG {
	/*
	this.rset        - data itself
	this.genders     - set of all different genders
	this.spaces      - array of keys
	this.spaceLength - length of spaces array
	*/
	
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
	
	upload (filename, { shuffle = true } = {}) {
		let self = this;
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
		let allKeySets = [];
		for (let [key, space] of Object.entries(self.rset)) {
			allKeySets.push(Object.keys(space).sort());
		}
		self.spaces = Object.keys(self.rset);
		self.spaceLength = self.spaces.length;
		if (allKeySets.length > 0) {
			for (let i = 0; i < self.spaceLength - 1; i += 1) {
				if (JSON.stringify(allKeySets[i]) !== JSON.stringify(allKeySets[i+1])) {
					return `Key sets ${allKeySets[i]} and ${allKeySets[j]} are not equal`;
				}
			}
		}
		self.keys = JSON.parse(JSON.stringify(allKeySets[0]));
		allKeySets = [];
		return null;
	}
	
	getArrOfGender (space, gender) {
		let self = this;
		if (gender === Genders.Any) {
			return space[self.keys[NVRNG.randIntFromZero(self.keys.length)]]; 
		}
		return space[gender];
	}
	
	getSet (size, { gender = Genders.Any } = {}) {
		let out  = new Set(),
			self = this;
		for (;;) {
			for (let [key, space] of Object.entries(self.rset)) {
				
				
				
			}
		}
	}
	
	static getSetBut (size, exclude, { gender = Genders.Any } = {}) {
		let self = this;
		if (gender !== Genders.Any) {
			if (!self.keys.includes(gender)) {
				throw `Vocabulary does not contain arrays of ${gender} gender, supported only ${self,keys}`;
			}
		}
	}
	
}

module.exports.NVRNG   = NVRNG;
module.exports.Genders = Genders;
























