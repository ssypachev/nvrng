let { NVRNG, OutputFormat, Genders, StringFormat } = require('../index.js');

let gen = new NVRNG();
let err = gen.upload(__dirname + '/../examples/simplest4.json');
console.log(err);
let set;
[err, set] = gen.getSet(3, { delimiter: '-', format: StringFormat.Capitalize });

console.log(err); //null
set.forEach(item => console.log(item));

let newname;
[err, newname] = gen.getOne({ delimiter: '-', format: StringFormat.Capitalize, exclude: set });

console.log(newname);

//No Join

[err, set] = gen.getSet(3, { format: StringFormat.Capitalize, noJoin: true });
console.log(set);

[err, set] = gen.getOne({ format: StringFormat.Capitalize, noJoin: true });
console.log(set);

