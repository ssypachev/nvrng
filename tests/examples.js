let { NVRNG, OutputFormat, Genders, StringFormat } = require('../index.js');

let gen = new NVRNG();
gen.upload(__dirname + '/../examples/simplest4.json');

let [err, set] = gen.getSet(3, { delimiter: '-', format: StringFormat.Capitalize });

console.log(err); //null
set.forEach(item => console.log(item));

let newname;
[err, newname] = gen.getOne({ delimiter: '-', format: StringFormat.Capitalize });

console.log(newname);