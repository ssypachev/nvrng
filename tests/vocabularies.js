const   chai    = require('chai'),
      { NVRNG } = require('../index.js');
	  
const filename  = __dirname + '/../vocabularies/en_colored_animals.json';

describe('Should test ready-to-use vocabularies', () => {
	
	it ('Should test en_colored_animals.json', () => {
		let gen = new NVRNG();
		let uerr = gen.upload(filename);
		chai.expect(uerr).to.be.null;
		
		let [err, out] = gen.getSet(30);
		chai.expect(err).to.be.null;
		chai.expect(out).not.to.be.null;
		chai.expect(out.size).to.equal(30);
		out.forEach((item) => console.log(item));
	});
	
});