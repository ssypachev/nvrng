const   chai    = require('chai'),
        fs      = require('fs'),
      { NVRNG } = require('../index.js');

const filename     = __dirname + '/../examples/compact.txt';

describe('Should test setup with external data source', () => {

    it ('Should upload json from text file', async () => {

        let [err, data] = await new Promise((resolve) => {
            fs.readFile(filename, (err, data) => {
                resolve([err, data]);
            });
        });
        chai.expect(err).to.be.null;
        let wasErr = true;
        try {
            data = JSON.parse(data);
            wasErr = false;
        } catch (err) {
        }

        chai.expect(wasErr).to.be.false;

        let gen = new NVRNG();
        err = gen.setup(data);
        chai.expect(err).to.be.null;

        let set;
        [err, set] = gen.getSet(3);
        chai.expect(err).to.be.null;
        chai.expect(set).to.be.instanceof(Set);
        chai.expect(set.size).to.equal(3);
    });

    it ('Should fail on bad data', () => {
        let gen = new NVRNG();
        let err = gen.setup("some");
        chai.expect(err).not.to.be.null;
    });

});