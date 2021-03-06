let fs = require('fs');

let Genders = {
    Any:     "a",
    Female:  "f",
    Male:    "m",
    Neutral: "n"
};

let genderValues = new Set(Object.values(Genders));

let OutputFormat = {
    Set:    "set",
    Array:  "array",
    Object: "object"
};

let StringFormat = {
    Lowercase:  "lowercase",
    Uppercase:  "uppercase",
    Capitalize: "capitalize",
    NoFormat:   "noformat"
};

let lowerCaseFormatter  = str => str.toLowerCase();
let upperCaseFormatter  = str => str.toUpperCase();
let capitalizeFormatter = str => str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
let noFormatFormatter   = str => str;

let addToSet = (set, valToAdd, valToCompare, _) => {
    set.add(valToAdd);
}
let addToSetAndExclude = (set, valToAdd, valToCompare, exclude) => {
    if (!exclude.has(valToCompare)) {
        set.add(valToAdd);
    }
}

class NVRNG {
    /*
    this.rset        - data itself
    this.genders     - set of all different genders
    this.spaces      - names of keys in rset
    this.spaceLength - length of spaces array
    */

    constructor ({ limit = 100000 } = {}) {
        this.limit = limit;
    }

    static getStringFormatter (format) {
        switch (format) {
        case StringFormat.Lowercase:  return lowerCaseFormatter;
        case StringFormat.Uppercase:  return upperCaseFormatter;
        case StringFormat.Capitalize: return capitalizeFormatter;
        case StringFormat.NoFormat:   return noFormatFormatter;
        default: return null;
        }
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

    /**
        Key set must be non-empty
        If have 'a' key, then 'a' must be single array of space
    */
    static validateKeys (spacename, keys) {
        if (keys.length === 0) {
            return `Bad amount of keys for space "${spacename}". Supported keys are [${Object.values(Genders)}]`;
        }
        for (let key of keys) {
            if (!genderValues.has(key)) {
                return `Bad key "${key}" found in space "${spacename}". Supported keys are [${Object.values(Genders)}]`;
            }
            if (key === 'a' && keys.length > 1) {
                return `Wrong keys found in space "${spacename}". Key "a" must be single key of the space`;
            }
        }
        return null;
    }

    setup (data, { shuffle = true } = {}) {
        if (typeof(data) !== 'object') {
            return `Data passed to setup must be of type object, but ${typeof(data)} found`;
        }

        let self = this,
            allKeySets = [];

        self.rset = data;

        for (let [spacename, space] of Object.entries(self.rset)) {
            let keys = Object.keys(space);
            let err = NVRNG.validateKeys(spacename, keys);
            if (err) {
                return err;
            }
            allKeySets.push(keys.sort());
        }
        self.spaces = Object.keys(self.rset);
        self.spaceLength = self.spaces.length;

        for (let i = 0; i < self.spaceLength - 1; i += 1) {
            if (allKeySets[i].length === 1 && allKeySets[i][0] === Genders.Any) {
                allKeySets[i] = allKeySets[i + 1];
            }
        }
        for (let i = self.spaceLength - 1; i > 0; i -= 1) {
            if (allKeySets[i].length === 1 && allKeySets[i][0] === Genders.Any) {
                allKeySets[i] = allKeySets[i - 1];
            } else if (JSON.stringify(allKeySets[i]) !== JSON.stringify(allKeySets[i-1])) {
                return `Key sets [${allKeySets[i]}] and [${allKeySets[i-1]}] are not equal`;
            }
        }

        self.keys = JSON.parse(JSON.stringify(allKeySets[0]));
        if (self.keys[0] === 'a') {
            self.keys = ['f', 'm', 'n'];
        }
        allKeySets = [];


        if (shuffle) {
            for (let [key, space] of Object.entries(self.rset)) {
                for (let [key, arr] of Object.entries(space)) {
                    NVRNG.shuffle(arr);
                }
            }
        }

        return null;
    }

    upload (filename, { shuffle = true } = {}) {
        let self = this,
            data;
        try {
            data = require(filename);
        } catch (err) {
            return err;
        }

        let err = self.setup(data, { shuffle });
        if (err) {
            return err;
        }

        return null;
    }

    getArrOfGender (space, gender) {
        let self = this,
            keys = Object.keys(space);
        if (keys[0] === 'a') {
            return [gender, space['a']];
        }
        if (gender === Genders.Any) {
            let proGender = self.keys[ NVRNG.randIntFromZero(self.keys.length) ];
            return [proGender, space[proGender]];
        }
        return [gender, space[gender]];
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

    getKeys () {
        return this.keys;
    }

    static getJoiner (noJoin) {
        if (!!noJoin === true) {
            return (data, delimiter) => {
                return [data.join(delimiter), data];
            }
        } else {
            return (data, delimiter) => {
                let tstr = data.join(delimiter);
                return [tstr, tstr];
            }
        }
    }

    getOne ({ gender = Genders.Any, output = OutputFormat.Set, exclude = new Set(), delimiter = ' ', format = StringFormat.NoFormat, noJoin = false } = {}) {
        let self = this;
        if (gender !== Genders.Any) {
            if (!self.keys.includes(gender)) {
                return [`Vocabulary does not contain arrays of ${gender} gender, supported only ${self.keys}`, null];
            }
        }
        let [err, proExclude] = NVRNG.arrOrSetToSet(exclude);
        if (err) {
            return [err, null];
        }
        let formatter = NVRNG.getStringFormatter(format);
        if (formatter === null) {
            return [`Unsupported output string format "${format}". Use [${Object.keys(StringFormat)}]`, null];
        }
        let limitter  = self.limit,
            joiner    = NVRNG.getJoiner(noJoin),
            out, tstr, p, arr, index;
        do {
            let proGender = gender;
            p = [];
            for (let space of self.spaces) {
                [proGender, arr] = self.getArrOfGender(self.rset[space], proGender);
                index = NVRNG.randIntFromZero(arr.length);
                p.push(formatter(arr[index]));
            }
            [tstr, out] = joiner(p, delimiter);
        } while (limitter-->0 &&
            proExclude.has(tstr));
        return [null, out];
    }

    getSet (size, { gender = Genders.Any, output = OutputFormat.Set, include = new Set(), exclude = new Set(), delimiter = ' ', format = StringFormat.NoFormat, noJoin = false } = {}) {
        size = +size;
        if (isNaN(size) || size < 0) {
            return [`Bad "size" parameter`, null];
        }
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
        let formatter = NVRNG.getStringFormatter(format);
        if (formatter === null) {
            return [`Unsupported output string format "${format}". Use [${Object.keys(StringFormat)}]`, null];
        }
        let adder     = proExclude.size > 0 ? addToSetAndExclude : addToSet,
            limitter  = self.limit,
            joiner    = NVRNG.getJoiner(noJoin),
            tstr, tmp, p, arr;
        do {
            let proGender = gender;
            p = [];
            for (let space of self.spaces) {
                [proGender, arr] = self.getArrOfGender(self.rset[space], proGender);
                let index = NVRNG.randIntFromZero(arr.length);
                p.push(formatter(arr[index]));
            }
            [tstr, tmp] = joiner(p, delimiter);
            adder(out, tmp, tstr, proExclude);
        } while (out.size < size && limitter-->0);
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
module.exports.StringFormat = StringFormat;
























