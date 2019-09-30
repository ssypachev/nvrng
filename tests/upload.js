const   chai    = require('chai'),
      { NVRNG } = require('../index.js');
	  
const filename = __dirname + '/../examples/simplest.json';
	  
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
	
});