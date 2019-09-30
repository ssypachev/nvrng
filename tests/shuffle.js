const   chai    = require('chai'),
      { NVRNG } = require('../index.js');
	  
describe('Should test Fisher-Yates shuffle algorithm implementation', () => {
	
	it ('should not spoil the array', () => {
		let a = [1, 2, 3, 4];
		let b = JSON.parse(JSON.stringify(a));

		NVRNG.shuffle(a);

		chai.expect(a.length).to.equal(b.length);
		chai.expect(a).to.include.members(b);
	});
	
	it ('should test that shuffle... does shuffle', () => {
		let a = [];
		for (let i = 0; i < 1000; i++) {
			a.push(i);
		}
		let b = JSON.stringify(a);

		NVRNG.shuffle(a);

		chai.expect(JSON.stringify(a)).not.equal(b);
	});
	
});