const   chai    = require('chai'),
      { NVRNG } = require('../index.js');
	  
const filename  = __dirname + '/../examples/simplest.json';
const filename4 = __dirname + '/../examples/simplest4.json';
const fileWithGenders = __dirname + '/../examples/gender.json';

describe('Should test getOne', () => {
	
	it ('Should fail on bad format', () => {
		let gen = new NVRNG();
		let uerr = gen.upload(filename4);
		chai.expect(uerr).to.be.null;
		
		let [err, out] = gen.getOne({ format: 'some' });
		chai.expect(err).not.to.be.null;
		chai.expect(out).to.be.null;
		console.log(err);
	});
	
	it ('Should fail on unlimit', () => {
		let gen = new NVRNG({ limit: -1 });
		let uerr = gen.upload(filename4);
		chai.expect(uerr).to.be.null;
		
		let [err, out] = gen.getOne();
		chai.expect(err).to.be.null;
		chai.expect(out).not.to.equal("");
	});
	
	it ('Should test delimiter', () => {
		let gen = new NVRNG();
		let uerr = gen.upload(filename4);
		chai.expect(uerr).to.be.null;
		
		let [err, out] = gen.getOne({ delimiter: '&' });
		
		chai.expect(out.split('&').length).to.equal(4);
	});
	
	it ('Should test on 4-space file', () => {
		let gen = new NVRNG();
		let uerr = gen.upload(filename4);
		chai.expect(uerr).to.be.null;
		
		let [err, out] = gen.getOne();
		chai.expect(out.split(' ').length).to.equal(4);
	});
	
	it ('Should fail on bad exclude format', () => {
		let gen = new NVRNG();
		let uerr = gen.upload(filename);
		
		let [err, out] = gen.getOne({ exclude: "some" });
		chai.expect(err).not.to.be.null;
		chai.expect(out).to.be.null;
	});
	
	it ('Should test on simplest test, size 3, with exclude', () => {
		let gen = new NVRNG();
		let uerr = gen.upload(filename);
		chai.expect(uerr).to.be.null;
		
		let exclude = ["one", "two", "three"];
		let [err, out] = gen.getOne({ exclude });
		chai.expect(err).to.be.null;
		chai.expect(out).to.be.a('string');
		chai.expect([out]).not.to.include.members(exclude);
	});
	
	it ('Should test on simplest test, size 3, with empty exclude', () => {
		let gen = new NVRNG();
		let uerr = gen.upload(filename);
		chai.expect(uerr).to.be.null;
		
		let exclude = [];
		let [err, out] = gen.getOne({ exclude });
		chai.expect(err).to.be.null;
		chai.expect(out).to.be.a('string');
	});
	
	it ('Should fail on simplest test, size 1, unsupported gender', () => {
		let gen = new NVRNG();
		let uerr = gen.upload(filename);
		chai.expect(uerr).to.be.null;
		
		let [err, out] = gen.getOne({ gender: 'f' });
		chai.expect(err).not.to.be.null;
		chai.expect(out).to.be.null;
	});
	
	it ('Should test on simplest test, size 3, all genders check', () => {
		let gen = new NVRNG();
		let uerr = gen.upload(fileWithGenders);
		chai.expect(uerr).to.be.null;
		
		let err, out;

		[err, out] = gen.getOne({ gender: "n" });
		chai.expect(err).to.be.null;
		chai.expect(out).to.be.an('string');
		
		[err, out] = gen.getOne({ gender: "f" });
		chai.expect(err).to.be.null;
		chai.expect(out).to.be.an('string');
		
		[err, out] = gen.getOne({ gender: "m" });
		chai.expect(err).to.be.null;
		chai.expect(out).to.be.an('string');
	});
	
});
























