const   chai    = require('chai'),
      { NVRNG } = require('../index.js');
	  
const filename  = __dirname + '/../examples/simplest.json';
const filename4 = __dirname + '/../examples/simplest4.json';
const fileWithGenders = __dirname + '/../examples/gender.json';

describe('Should test getSet', () => {
	
	it ('Should test delimiter', () => {
		let gen = new NVRNG();
		let uerr = gen.upload(filename4);
		chai.expect(uerr).to.be.null;
		
		let [err, out] = gen.getSet(7, { delimiter: '&' });
		out.forEach((item) => {
			chai.expect(item.split('&').length).to.equal(4);
		});
	});
	
	it ('Should test on 4-space file', () => {
		let gen = new NVRNG();
		let uerr = gen.upload(filename4);
		chai.expect(uerr).to.be.null;
		
		let [err, out] = gen.getSet(7);
		out.forEach((item) => {
			chai.expect(item.split(' ').length).to.equal(4);
		});
	});
	
	it ('Should test on simplest test, size 3, with include', () => {
		let gen = new NVRNG();
		let uerr = gen.upload(filename);
		chai.expect(uerr).to.be.null;
		
		let include = ["one", "two", "three"];
		let [err, out] = gen.getSet(3, { include });
		chai.expect(err).to.be.null;
		chai.expect(out).to.be.an.instanceof(Set);
		chai.expect(out.size).to.equal(6);
		chai.expect([...out]).to.include.members(include);
	});
	
	it ('Should fail on bad include format', () => {
		let gen = new NVRNG();
		let uerr = gen.upload(filename);
		
		let [err, out] = gen.getSet(3, { include: "some" });
		chai.expect(err).not.to.be.null;
		chai.expect(out).to.be.null;
	});
	
	it ('Should fail on bad exclude format', () => {
		let gen = new NVRNG();
		let uerr = gen.upload(filename);
		
		let [err, out] = gen.getSet(3, { exclude: "some" });
		chai.expect(err).not.to.be.null;
		chai.expect(out).to.be.null;
	});
	
	it ('Should test on simplest test, size 3, with exclude', () => {
		let gen = new NVRNG();
		let uerr = gen.upload(filename);
		chai.expect(uerr).to.be.null;
		
		let exclude = ["one", "two", "three"];
		let [err, out] = gen.getSet(3, { exclude });
		chai.expect(err).to.be.null;
		chai.expect(out).to.be.an.instanceof(Set);
		chai.expect(out.size).to.equal(3);
		chai.expect([...out]).not.to.include.members(exclude);
	});
	
	it ('Should test on simplest test, size 1, no options', () => {
		let gen = new NVRNG();
		let uerr = gen.upload(filename);
		chai.expect(uerr).to.be.null;
		
		let [err, out] = gen.getSet(1);
		chai.expect(err).to.be.null;
		chai.expect(out).to.be.an.instanceof(Set);
		chai.expect(out.size).to.equal(1);
	});
	
	it ('Should fail on simplest test, size 1, unsupported gender', () => {
		let gen = new NVRNG();
		let uerr = gen.upload(filename);
		chai.expect(uerr).to.be.null;
		
		let [err, out] = gen.getSet(1, { gender: 'f' });
		chai.expect(err).not.to.be.null;
		chai.expect(out).to.be.null;
	});
	
	it ('Should fail on simplest test, size 1, unsupported output', () => {
		let gen = new NVRNG();
		let uerr = gen.upload(filename);
		chai.expect(uerr).to.be.null;
		
		let [err, out] = gen.getSet(1, { output: 'some' });
		chai.expect(err).not.to.be.null;
		chai.expect(out).not.to.be.null;
		chai.expect(out).to.be.an.instanceof(Set);
		chai.expect(out.size).to.equal(1);
	});
	
	it ('Should test on simplest test, size 3, no options', () => {
		let gen = new NVRNG();
		let uerr = gen.upload(filename);
		chai.expect(uerr).to.be.null;
		
		let [err, out] = gen.getSet(3);
		chai.expect(err).to.be.null;
		chai.expect(out).to.be.an.instanceof(Set);
		chai.expect(out.size).to.equal(3);
	});
	
	it ('Should test on simplest test, size 3, all genders check', () => {
		let gen = new NVRNG();
		let uerr = gen.upload(fileWithGenders);
		chai.expect(uerr).to.be.null;
		
		let err, out;

		[err, out] = gen.getSet(3, { gender: "n" });
		chai.expect(err).to.be.null;
		chai.expect(out).to.be.an.instanceof(Set);
		chai.expect(out.size).to.equal(3);
		
		[err, out] = gen.getSet(3, { gender: "f" });
		chai.expect(err).to.be.null;
		chai.expect(out).to.be.an.instanceof(Set);
		chai.expect(out.size).to.equal(3);
		
		[err, out] = gen.getSet(3, { gender: "m" });
		chai.expect(err).to.be.null;
		chai.expect(out).to.be.an.instanceof(Set);
		chai.expect(out.size).to.equal(3);
	});
	
	it ('Should test on simplest test, size 3, convert', () => {
		let gen = new NVRNG();
		let uerr = gen.upload(filename);
		chai.expect(uerr).to.be.null;
		
		let err, out;
		[err, out] = gen.getSet(3, { output: "set" });
		chai.expect(err).to.be.null;
		chai.expect(out).to.be.an.instanceof(Set);
		chai.expect(out.size).to.equal(3);
		
		[err, out] = gen.getSet(3, { output: "array" });
		chai.expect(err).to.be.null;
		chai.expect(out).to.be.an('array');
		chai.expect(out.length).to.equal(3);

		[err, out] = gen.getSet(3, { output: "object" });
		chai.expect(err).to.be.null;
		chai.expect(out).to.be.an('object');
		chai.expect(Object.keys(out).length).to.equal(3);
	});
	
});





















