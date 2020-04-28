import { defineSupportCode } from 'cucumber';
import { browser, $, element, ElementArrayFinder, by } from 'protractor';
let chai = require('chai').use(require('chai-as-promised'));
let expect = chai.expect;
import request = require("request-promise");
import { async } from 'q';

var base_url = "http://localhost:3000/";
var nome = 'nome: "pedro"';
var email = 'email: "phcl@cin.ufpe.br"';
var response = 'text: "Email enviado"';

defineSupportCode(function ({ Given, When, Then }) {

    Given(/^que existe uma turma ess2018$/, async() => {
        await request.get(base_url + "email/teste")
        .then(body => 
            expect(body.includes('"ess2018"')).to.equal(true));
    })

    Given(/^nessa turma foi cadastrado um novo um aluno pedro com email phcl@cin.ufpe.br$/, async () => {
        await request.get(base_url + "email/teste")
        .then(body => 
            expect(body.includes('"pedro"'))
            .to.equal(true));
        await request.get(base_url + "email/teste")
        .then(body => 
            expect(body.includes('"phcl@cin.ufpe.br"')).to.equal(true));
    })

    Given(/^nessa turma existe um aluno pedro com email phcl@cin.ufpe.br$/, async () => {
        await request.get(base_url + "email/teste")
        .then(body => 
            expect(body.includes('"pedro"'))
            .to.equal(true));
        await request.get(base_url + "email/teste")
        .then(body => 
            expect(body.includes('"phcl@cin.ufpe.br"')).to.equal(true));
    })

    Given(/^a média final do aluno pedro for inferior a 7$/, async () => {
        
        await request.get(base_url + "email/teste")
        .then(body => 
            expect(body.includes('6')).to.equal(true));
    })

    Then(/^será enviado um e-mail a pedro em phcl@cin.ufpe.br com a mensagem de que ele foi cadastrado numa nova turma$/, async () => {
        await request.get(base_url + "email/phcl@cin.ufpe.br/turma")
        .then(body => 
            expect(body.includes('"Email enviado"')).to.equal(true));
    })

    Then(/^será enviado um e-mail a pedro em phcl@cin.ufpe.br com a mensagem de que ele possui uma nova meta cadastrada$/, async () => {
        await request.get(base_url + "email/phcl@cin.ufpe.br/meta")
        .then(body => 
            expect(body.includes('"Email enviado"')).to.equal(true));
    })

    Then(/^será enviado um e-mail a pedro em phcl@cin.ufpe.br com a mensagem de que ele possui uma nova média disponível$/, async () => {
        await request.get(base_url + "email/phcl@cin.ufpe.br/media")
        .then(body => 
            expect(body.includes('"Email enviado"')).to.equal(true));
    })

    Then(/^será enviado um e-mail a pedro em phcl@cin.ufpe.br com a mensagem de que ele ficou na final$/, async () => {
        await request.get(base_url + "email/phcl@cin.ufpe.br/final")
        .then(body => 
            expect(body.includes('"Email enviado"')).to.equal(true));
    })

    When(/^a nova turma for criada$/, async() => {
        return true;
    })

    When(/^uma nova meta for cadastrada para o aluno pedro$/, async() => {
        return true;
    })

    When(/^uma média for calculada para o aluno pedro$/, async() => {
        return true;
    })

    When(/^a média final estiver disponível$/, async() => {
        return true;
    })




});
