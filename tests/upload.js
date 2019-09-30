const   chai    = require('chai'),
      { NVRNG } = require('../index.js');
	  
const filename = __dirname + '/../examples/simplest.json';
const badkeys  = __dirname + '/../examples/err_bad_keys.json';
	  
describe('Should test upload method', () => {
	
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
	
});











