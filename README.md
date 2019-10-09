[![Codecov Coverage](https://img.shields.io/codecov/c/github/ssypachev/nvrng/master.svg?style=flat-square)](https://codecov.io/gh/ssypachev/nvrng/)

# nvrng
Not very random temporary name generator

## Description

`NVRNG` generates array of random readable names, like 'Silver Raccoon', 'Purple Snake' or sets of real names like 'Aaron Smith', etc.
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

Some predefined vocabularies can be found in `vocabularies` folder in [repository](https://github.com/ssypachev/nvrng/tree/master/vocabularies)

[EN Colored Animals](https://github.com/ssypachev/nvrng/blob/master/vocabularies/en_colored_animals.json)

[RU Colored Animals](https://github.com/ssypachev/nvrng/blob/master/vocabularies/ru_colored_animals.json)

[EN Common Names](https://github.com/ssypachev/nvrng/blob/master/vocabularies/en_common_names.json)

Please, make pull request if found any errors or if you have any other vocabulary to suggest.

## Methods

#### `constructor({ limit = 100000 })`

`limit` - max number of attempts to create set

#### `upload(filename, { shuffle = true }) => err`

Setup vocabulary. Returns error. If everything is ok, then returns `null`;

`filename` - path to `json` vocabulary

`shuffle`  - to shuffle vocabulary after upload

#### `getSet(size, { gender = Genders.Any, output = OutputFormat.Set, include, exclude, delimiter = ' ', format = StringFormat.NoFormat, noJoin = false }) => [err, set]`
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

`include` - array or set of values that would be injected to output set, default is empty set. For example, if `include` is 3 unique strings long and
you generate 5 new strings, then output would be 5 + 3 = 8 strings long

`exclude` - array or set of values that must be ommitted in output set, default is empty set

`delimiter` - char to join random words, default is ' '

`noJoin` - not to join elements of string. Returns collection of arrays, for example

```js
let gen = new NVRNG();
gen.upload(__dirname + '/../examples/simplest4.json');

let [err, set] = gen.getSet(3, { format: StringFormat.Capitalize, noJoin: true });
console.log(set);
```

prints

```js
Set {
  [ 'Red', 'Horse', 'With', 'Notebook' ],
  [ 'Green', 'Horse', 'With', 'Keys' ],
  [ 'Yellow', 'Duck', 'With', 'Keys' ] }
```

Be careful with `include` in this case. `noJoin` uses concatenated strings to compare values and join strings with `delimiter`.

#### `getOne({ gender = Genders.Any, exclude, delimiter = ' ', format = StringFormat.NoFormat, noJoin = false }) => [err, string]`

Returns array of error and single string (or array, if `noJoin` is used). Same options as in `getSet` (except `include` and `output`).

#### getKeys => Array

Returns array of keys available for uploaded vocabulary

```js
const filename = __dirname + '/../examples/gender.json';
err = gen.upload(filename);
console.log(gen.getKeys()); //[ 'f', 'm', 'n' ]
```

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

Number of "spaces" is not limited. If one array can be used for different genders (like adjective for male and female animals in english, or second name for both male and female first name)
then it can be substituted with one "a" array, see [EN Common Names](https://github.com/ssypachev/nvrng/blob/master/vocabularies/en_common_names.json). Array must contain at least one word.

NOTE: if "a" is used, then "space" must not have any other keys. Also, all keys from all different "spaces" must match, except for an "a" key. If
vocabulary has any errors then `upload` method will return error with description of the problem.

## Examples
```js
let { NVRNG, OutputFormat, Genders, StringFormat } = require('../index.js');

let gen = new NVRNG();
gen.upload(__dirname + '/../examples/simplest4.json');

let [err, set] = gen.getSet(3, { delimiter: '-', format: StringFormat.Capitalize });

console.log(err);
set.forEach(item => console.log(item));

let newname;
[err, newname] = gen.getOne({ delimiter: '-', format: StringFormat.Capitalize, exclude: set });

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





















