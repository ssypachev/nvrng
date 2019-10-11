const   chai    = require('chai'),
      { NVRNG } = require('../index.js');

const filename_en_animals  = __dirname + '/../vocabularies/en_colored_animals.json';
const filename_ru_animals  = __dirname + '/../vocabularies/ru_colored_animals.json';
const filename_en_names    = __dirname + '/../vocabularies/en_common_names.json';

describe('Should test ready-to-use vocabularies', () => {

    it ('Should test en_colored_animals.json', () => {
        let gen = new NVRNG();
        let uerr = gen.upload(filename_en_animals);
        chai.expect(uerr).to.be.null;

        let [err, out] = gen.getSet(30);
        chai.expect(err).to.be.null;
        chai.expect(out).not.to.be.null;
        chai.expect(out.size).to.equal(30);
        out.forEach((item) => console.log(item));
    });

    it ('Should test ru_colored_animals.json', () => {
        let gen = new NVRNG();
        let uerr = gen.upload(filename_ru_animals);
        chai.expect(uerr).to.be.null;

        let [err, out] = gen.getSet(30);
        chai.expect(err).to.be.null;
        chai.expect(out).not.to.be.null;
        chai.expect(out.size).to.equal(30);
        out.forEach((item) => console.log(item));
    });

    it ('Should test en_common_names.json', () => {
        let gen = new NVRNG();
        let uerr = gen.upload(filename_en_names);
        chai.expect(uerr).to.be.null;

        let [err, out] = gen.getSet(100, { gender: 'm' });
        chai.expect(err).to.be.null;
        chai.expect(out).not.to.be.null;
        chai.expect(out.size).to.equal(100);
        out.forEach((item) => console.log(item));

        [err, out] = gen.getSet(100, { gender: 'f' });
        chai.expect(err).to.be.null;
        chai.expect(out).not.to.be.null;
        chai.expect(out.size).to.equal(100);
        out.forEach((item) => console.log(item));
    });

});