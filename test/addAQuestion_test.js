import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/app';
import db from '../src/db/db';
import logChecker from './logChecker';

const bearer = `Bearer ${logChecker.token}`;
const should = chai.should();
const expect = chai.expect();
const api =  chai.request(`http://localhost:5000/api/v1/`);
chai.use(chaiHttp);


const url = 'questions';
const data = {
questions: 'What is the Test questions?'
} ;


describe('Endpoint 3: Add A Questions', () => {

  
  it('Should Have Access', (done) => {
   api.post(url)
      .send(data)
      .set('authorization', bearer)
      .end((err, res) => {
        res.should.have.status(201);
      done();
    })
  });

  it('Should Check Type of Response Received', (done) => {
   api.post(url)
      .send(data)
      .end(function(err, res){
        res.body.should.be.a('object');
      done();
      });
  });

  it('Should Check Properties of Response Received Upon Access', (done) => {
   api.post(url)
      .send(data)
      .end((err, res) => {
        res.body.question.should.have.property('id').eql(5);
        res.body.question.should.have.property('time');
        res.body.question.should.have.property('question');
        res.body.question.should.have.property('answers');
        res.body.question.answers.should.be.a('array');
      done();
      });
  });


});


