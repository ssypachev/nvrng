[![Codecov Coverage](https://img.shields.io/codecov/c/github/ssypachev/nvrng/master.svg?style=flat-square)](https://codecov.io/gh/ssypachev/nvrng/)

# nvrng
Not very random temporary name generator

## Description

`NVRNG` generates array of random readable names, like 'Silver Raccoon' or 'Purple Snake'.
`NVRNG` can create sets for different genders (like 'Lemon Stallion' or 'Marble Actress').
`NVRNG` uses vocabulary in `json` format.

## Installation

`npm install nvrng --save`

Example
```js
const { NVRNG } = require('nvrng');

let gen = new NVRNG();
gen.upload('./file.json');
let [err, nameset] = gen.getSet(5);

```
Here `nameset` is of type `Set`

## Methods

#### `constructor({ limit = 100000 })`

`limit` - max number of attempts to create set

#### `upload(filename, { shuffle = true }) => err`

Setup vocabulary. Returns error. If everything is ok, then returns `null`;

`filename` - path to `json` vocabulary

`shuffle`  - to shuffle vocabulary after upload

#### `getSet(size, { gender = Genders.Any, output = OutputFormat.Set, include, exclude, delimiter = ' ', format = StringFormat.NoFormat }) => [err, set]`
Generate set of random names. Returns array. First element is error (`null` if ok), second is a set of names;

`gender` - gender, possible values are 'n', 'f', 'm', or 'a'. You can also use Enum `Genders` with values

- `Genders.Any`
- `Genders.Female`
- `Genders.Male`
- `Genders.Nuetral`

if bad value is used then getSet will return error and null;

Note that possible variants depend on your vocabulary file. Hence, if there is only 'n' gender, then you can not use 'f' or 'm' gender.
'a' value will return list with random genders.

`output` - output format. Possible formats are 'set', 'array', 'object', or

- `OutputFormat.Set`
- `OutputFormat.Array`
- `OutputFormat.Object`

`format` - string output format. Possible values are 'lowercase', 'uppercase', 'capitalize', 'noformat', or

- `StringFormat.Lowercase`
- `StringFormat.Uppercase`
- `StringFormat.Capitalize`
- `StringFormat.NoFormat`

Note, don't forget to export enums with NVRNG:
```js
let { NVRNG, OutputFormat, Genders, StringFormat } = require('nvrng');
```

if bad value is used, then `getSet` will return error and set.

`include` - array or set of values that would be injected to output set, default is empty set. For example, if `include` is 3 unique string long and
you generate 5 new string, then output would be 5 + 3 = 8 strings long
`exclude` - array or set of values that must be ommitted in output set, default is empty set.
`delimiter` - char to join random words, default is ' '

## `getOne({ gender = Genders.Any, exclude, delimiter = ' ', format = StringFormat.NoFormat }) => [err, string]`

Returns one string. Same options as in `getSet` (except `include` and `output`).

## Vocabulary
Vocabulary is a json object which contains one or more objects ("spaces") with
1 to 3 different arrays. For example
```json
{
    "adjectives": {
        "n": ["red", "orange", "yellow", "green", "blue", "dark blue", "purple"]
    },
    "nouns": {
        "n": ["cat", "dog", "cow", "horse", "mouse", "duck", "elephant"]
    }
}
```
or
```json
{
    "adjectives": {
        "n": ["red", "orange", "yellow", "green", "blue", "dark blue", "purple"],
        "f": ["red", "orange", "yellow", "green", "blue", "dark blue", "purple"],
        "m": ["red", "orange", "yellow", "green", "blue", "dark blue", "purple"]
    },
    "nouns": {
        "n": ["artist",  "heir",     "server",   "chicken", "spouse",  "horse",    "person"],
        "f": ["actress", "princess", "waitress", "hen",     "wife",    "mare",     "woman"],
        "m": ["actor",   "prince",   "waiter",   "rooster", "husband", "stallion", "man"]
    }
}
```

## Examples
```js
let { NVRNG, OutputFormat, Genders, StringFormat } = require('../index.js');

let gen = new NVRNG();
gen.upload(__dirname + '/../examples/simplest4.json');

let [err, set] = gen.getSet(3, { delimiter: '-', format: StringFormat.Capitalize });

console.log(err);
set.forEach(item => console.log(item));

let newname;
[err, newname] = gen.getOne({ delimiter: '-', format: StringFormat.Capitalize });

console.log(newname);
```
Output is
```js
null
Dark-blue-Mouse-With-Notebook
Purple-Dog-With-Gun
Green-Elephant-With-Gun
Purple-Dog-With-Car
```


## Testing
Clone repository and run

`npm run test`

`npm run cover`





















