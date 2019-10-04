const   chai    = require('chai'),
      { NVRNG } = require('../index.js');

const filename_en  = __dirname + '/../vocabularies/en_colored_animals.json';
const filename_ru  = __dirname + '/../vocabularies/ru_colored_animals.json';

describe('Should test ready-to-use vocabularies', () => {

    it ('Should test en_colored_animals.json', () => {
        let gen = new NVRNG();
        let uerr = gen.upload(filename_en);
        chai.expect(uerr).to.be.null;

        let [err, out] = gen.getSet(30);
        chai.expect(err).to.be.null;
        chai.expect(out).not.to.be.null;
        chai.expect(out.size).to.equal(30);
        //out.forEach((item) => console.log(item));
    });

    it ('Should test ru_colored_animals.json', () => {
        let gen = new NVRNG();
        let uerr = gen.upload(filename_ru);
        chai.expect(uerr).to.be.null;

        let [err, out] = gen.getSet(30);
        chai.expect(err).to.be.null;
        chai.expect(out).not.to.be.null;
        chai.expect(out.size).to.equal(30);
        //out.forEach((item) => console.log(item));
    });

});