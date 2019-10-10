const   chai    = require('chai'),
      { NVRNG } = require('../index.js');

const filename     = __dirname + '/../examples/simplest.json';
const filename_s   = __dirname + '/../examples/genders_shuffled.json';
const badkeys      = __dirname + '/../examples/err_bad_keys.json';
const malformed    = __dirname + '/../examples/malformed.json';
const unknownKey   = __dirname + '/../examples/err_unknown_keys.json';
const tooManyKey   = __dirname + '/../examples/err_too_many_keys.json';
const lostKey      = __dirname + '/../examples/err_lost_keys.json';
const aCombinedKey = __dirname + '/../examples/err_a_combined.json';
const combinedKey  = __dirname + '/../examples/a_combined.json';
const onlyAKey     = __dirname + '/../examples/only_a.json';
const combinedBadKey = __dirname + '/../examples/a_combined_bad_keys.json';

describe('Should test upload method', () => {

    it ('Should not fail on only "a"', () => {
        let gen = new NVRNG();
        let err = gen.upload(onlyAKey);
        chai.expect(err).to.be.null;

        let keys = gen.getKeys();
        chai.expect(keys).to.include.members(['f', 'm', 'n']);
    });

    it ('Should not fail on "a" shuffled', () => {
        let gen = new NVRNG();
        let err = gen.upload(combinedKey);
        chai.expect(err).to.be.null;
    });

    it ('Should fail on a combined', () => {
        let gen = new NVRNG();
        let err = gen.upload(aCombinedKey);
        chai.expect(err).not.to.be.null;
        console.log(err);
        chai.expect(err).to.equal('Wrong keys found in space "nouns". Key "a" must be single key of the space');
    });

    it ('Should fail on a shuffled with wronf keys, like a - n -a - f,m - a', () => {
        let gen = new NVRNG();
        let err = gen.upload(combinedBadKey);
        chai.expect(err).not.to.be.null;
        console.log(err);
        chai.expect(err).to.equal('Key sets [f,n] and [n] are not equal');
    });

    it ('Should fail on lost keys', () => {
        let gen = new NVRNG();
        let err = gen.upload(lostKey);
        chai.expect(err).not.to.be.null;
        console.log(err);
        chai.expect(err).to.equal('Bad amount of keys for space "adjectives". Supported keys are [a,f,m,n]');
    });

    it ('Should fail on too many keys', () => {
        let gen = new NVRNG();
        let err = gen.upload(tooManyKey);
        chai.expect(err).not.to.be.null;
        chai.expect(err).to.equal('Bad key "d" found in space "adjectives". Supported keys are [a,f,m,n]');
    });

    it ('Should fail on unknown key', () => {
        let gen = new NVRNG();
        let err = gen.upload(unknownKey);
        chai.expect(err).not.to.be.null;
    });

    it ('Should fail on malformed json', () => {
        let gen = new NVRNG();
        let err = gen.upload(malformed);
        chai.expect(err).not.to.be.null;
    });

    it ('Should fail on file not found', () => {
        let gen = new NVRNG();
        let err = gen.upload('some.some');
        chai.expect(err).not.to.be.null;
    });

    it ('Should test on simplest test file with default options', () => {
        let gen = new NVRNG();
        let err = gen.upload(filename);
        chai.expect(err).to.be.null;

        let data = gen.getData();
        chai.expect(data).to.have.property('adjectives');
        chai.expect(data).to.have.property('nouns');
        chai.expect(data.adjectives).to.have.property('n');
        chai.expect(data.nouns).to.have.property('n');
        chai.expect(data.adjectives.n).to.include.members(["red", "orange", "yellow", "green", "blue", "dark blue", "purple"]);
        chai.expect(data.nouns.n).to.include.members(["cat", "dog", "cow", "horse", "mouse", "duck", "elephant"]);
    });

    it ('should test shuffle option true', () => {
        let b = JSON.parse(JSON.stringify(require('../examples/simplest.json')));
        let gen = new NVRNG();
        let err = gen.upload(filename);
        chai.expect(err).to.be.null;

        let data = gen.getData();

        chai.expect(data.adjectives.n).to.include.members(b.adjectives.n);
        chai.expect(JSON.stringify(data.adjectives.n)).not.to.equal(JSON.stringify(b.adjectives.n));
    });

    it ('should test shuffle option false', () => {
        let b = JSON.parse(JSON.stringify(require('../examples/simplest.json')));
        let gen = new NVRNG();
        let err = gen.upload(filename, { shuffle: false });
        chai.expect(err).to.be.null;

        let data = gen.getData();

        chai.expect(data.adjectives.n).to.include.members(b.adjectives.n);
        chai.expect(JSON.stringify(data.adjectives.n)).to.equal(JSON.stringify(b.adjectives.n));
    });

    it ('shoud fail on bad file', () => {
        let gen = new NVRNG();
        let err = gen.upload(badkeys, { shuffle: false });
        chai.expect(err).not.to.be.null;
        console.log(err);
    });

    it ('shoud not fail on shuffled', () => {
        let gen = new NVRNG();
        let err = gen.upload(filename_s, { shuffle: false });
        chai.expect(err).to.be.null;
    });

});











