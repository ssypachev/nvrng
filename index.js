let fs = require('fs');

let Genders = {
	Any:     "a",
	Female:  "f",
	Male:    "m",
	Neutral: "n"
};

let OutputFormat = {
	Set:    "set",
	Array:  "array",
	Object: "object"
};

let StringFormat = {
	Lowercase:  "lowercase",
	Uppercase:  "uppercase",
	Capitalize: "capitalize"
};

let addToSet = (set, val, _) => {
	set.add(val);
}
let addToSetAndExclude = (set, val, exclude) => {
	if (!exclude.has(val)) {
		set.add(val);
	}
}

class NVRNG {
	/*
	this.rset        - data itself
	this.genders     - set of all different genders
	this.spaces      - array of keys
	this.spaceLength - length of spaces array
	*/
	
	constructor ({ limit = 100000 } = {}) {
		this.limit = limit;
	}
	
	static getAdders () {
		return [addToSet, addToSetAndExclude];
	}
	
	static randIntFromZero (max) {
		//does not reach max
		return Math.floor(Math.random() * (max));
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
		
		for (let i = 0; i < self.spaceLength - 1; i += 1) {
			if (JSON.stringify(allKeySets[i]) !== JSON.stringify(allKeySets[i+1])) {
				return `Key sets [${allKeySets[i]}] of "${self.spaces[i]}" and [${allKeySets[i+1]}] of "${self.spaces[i+1]}" are not equal`;
			}
		}
		
		self.keys = JSON.parse(JSON.stringify(allKeySets[0]));
		allKeySets = [];
		return null;
	}
	
	getArrOfGender (space, gender) {
		let self = this;
		if (gender === Genders.Any) {
			return space[self.keys[ NVRNG.randIntFromZero(self.keys.length) ]]; 
		}
		return space[gender];
	}
	
	static convertSet (data, type = OutputFormat.Set) {
		switch (type) {
			case OutputFormat.Set:    
				return data;
			case OutputFormat.Array:
				return [...data];
			case OutputFormat.Object: {
				let out = {};
				data.forEach((item) => {
					out[item] = true;
				});
				return out;
			}
			default:
				throw `Convert type "${type}" is not supported`;
		}
	}
	
	static arrOrSetToSet (arr) {
		if (Array.isArray(arr)) {
			return [null, new Set(arr)];
		}
		if (! (arr instanceof Set)) {
			return [`option include must be of type Array or Set`, null];
		}
		return [null, arr];
	}
	
	getSet (size, { gender = Genders.Any, output = OutputFormat.Set, include = new Set(), exclude = new Set(), delimiter = ' ' } = {}) {
		let self = this;
		if (gender !== Genders.Any) {
			if (!self.keys.includes(gender)) {
				return [`Vocabulary does not contain arrays of ${gender} gender, supported only ${self.keys}`, null];
			}
		}
		let err, proInclude, proExclude;
		[err, proInclude] = NVRNG.arrOrSetToSet(include);
		if (err) {
			return [err, null];
		}
		let out = new Set(proInclude);
		size += proInclude.size;
		[err, proExclude] = NVRNG.arrOrSetToSet(exclude);
		if (err) {
			return [err, null];
		}
		let adder = proExclude.size > 0 ? addToSetAndExclude : addToSet;
		let limitter = self.limit;
		while (out.size < size && limitter-->0) {
			let p = [];
			for (let space of self.spaces) {
				let arr = self.getArrOfGender(self.rset[space], gender);
				p.push(arr[NVRNG.randIntFromZero(arr.length)]);
			}
			let tmp = p.join(delimiter);
			adder(out, tmp, proExclude);
		}
		switch (output) {
			case OutputFormat.Set: case OutputFormat.Array: case OutputFormat.Object: 
				break;
			default: 
				return [`Convert type "${output}" is not supported`, out];
		}
		return [null, NVRNG.convertSet(out, output)];
	}
}

module.exports.NVRNG   = NVRNG;
module.exports.Genders = Genders;
module.exports.OutputFormat = OutputFormat;
























