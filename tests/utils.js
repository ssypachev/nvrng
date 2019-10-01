const   chai    = require('chai'),
      { NVRNG, OutputFormat } = require('../index.js');
	  
describe('Should test utils and enums', () => {
	
	it ('Should test arr or set to set', () => {
		let ideal = ["one", "two", "three"];
		let s1 = new Set(ideal);
		let a1 = JSON.parse(JSON.stringify(ideal));
		
		let err, o1, o2, o3;
		[err, o1] = NVRNG.arrOrSetToSet(s1);
		chai.expect(err).to.be.null;
		chai.expect(o1).to.be.instanceof(Set);
		chai.expect(o1.size).to.equal(3);

		[err, o2] = NVRNG.arrOrSetToSet(a1);
		chai.expect(err).to.be.null;
		chai.expect(o2).to.be.instanceof(Set);
		chai.expect(o2.size).to.equal(3);
		
		[err, o3] = NVRNG.arrOrSetToSet("some");
		chai.expect(err).not.to.be.null;
		chai.expect(o3).to.be.null;
	});
	
	it ('Should test adders', () => {
		let [a1, a2] = NVRNG.getAdders();
		chai.expect(a1).to.be.a('function');
		chai.expect(a2).to.be.a('function');
		
		let s1 = new Set();
		let s2 = new Set();
		let e = new Set();
		e.add('one');
		
		a1(s1, "one");
		a1(s1, "two");
		a1(s1, "one");
		
		chai.expect(s1.size).to.equal(2);
		
		a2(s2, "one", e);
		a2(s2, "two", e);
		a2(s2, "two", e);
		
		chai.expect(s2.size).to.equal(1);
	});
	
	it ('Should test convert options', () => {
		
		chai.expect(OutputFormat).to.have.property('Set');
		chai.expect(OutputFormat).to.have.property('Array');
		chai.expect(OutputFormat).to.have.property('Object');
		
		let set = new Set();
		set.add("one");
		set.add("two");
		set.add("three");
		
		let oSet = NVRNG.convertSet(set, OutputFormat.Set);
		
		chai.expect(set).to.equal(oSet);
		
		let oSet2 = NVRNG.convertSet(set);
		
		chai.expect(set).to.equal(oSet2);
		
		let oArr = NVRNG.convertSet(set, OutputFormat.Array);
		
		chai.expect(oArr).to.be.an('array');
		chai.expect(oArr.length).to.equal(3);
		chai.expect(oArr).to.include.members(['one', 'two', 'three']);
		
		let oObj = NVRNG.convertSet(set, OutputFormat.Object);
		
		chai.expect(oObj).to.be.an('object');
		chai.expect(oObj).to.deep.equal({'one': true, 'two': true, 'three': true});
		
		let err = false;
		try {
			NVRNG.convertSet(set, 'some');
		} catch (e) {
			err = true;
		}
		chai.expect(err).to.be.true;
		
	});
	
});