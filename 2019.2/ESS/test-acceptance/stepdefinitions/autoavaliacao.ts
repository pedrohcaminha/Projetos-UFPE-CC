import { defineSupportCode } from 'cucumber';
import { browser, $, element, ElementArrayFinder, by } from 'protractor';
let chai = require('chai').use(require('chai-as-promised'));
let expect = chai.expect;

const base_url = "http://localhost:4200/autoavaliacao/";

async function criarMatricula(elem, cpf, nome) {
    await $(elem).element(by.name("namebox")).clear();
    await $(elem).element(by.name("namebox")).sendKeys(<string> nome);
    await $(elem).element(by.name("cpfbox")).clear();
    await $(elem).element(by.name("cpfbox")).sendKeys(<string> cpf);
    await $(elem).element(by.buttonText('Criar')).click();
}

defineSupportCode(function ({ Given, When, Then }) {

    //Login
    Given(/^estou na pagina de Login$/, async () => {
        await browser.get(base_url + "login");
    });

    Given(/^existe uma matricula com cpf "(\d*)"$/, async (cpf) => {
        await criarMatricula("#criar-autoavaliacao-teste", cpf, "Sicrano");
    });

    Given(/^nao existe uma matricula com cpf "(\d*)"$/, async (cpf) => {
        await element(by.name("cpf-login")).clear();
        await element(by.name("cpf-login")).sendKeys(<string>cpf);
        await $("#sign-in").click();
        var elems: ElementArrayFinder = element.all(by.name('msg-login-mal-sucedido'));
        await elems.then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(1));
    });

    When(/^tento fazer login com cpf "(\d*)"$/, async (cpf) => {
        await element(by.name("cpf-login")).clear();
        await element(by.name("cpf-login")).sendKeys(<string>cpf);
        await $("#sign-in").click();
    });

    Then(/^entro na pagina de registro de autoavaliacoes$/, async () => {
        var elems: ElementArrayFinder = element.all(by.id('page-autoavaliacao'));
        await elems.then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(1));
    });

    Then(/^recebo uma mensagem de login mal sucedido$/, async () => {
        var elems: ElementArrayFinder = element.all(by.name('msg-login-mal-sucedido'));
        await elems.then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(1));
    });


    //Registro de autoavaliacoes

    
    Given(/^estou na pagina de registro de autoavaliacoes$/, async () => {
        await browser.get(base_url + "page");
    });

    Given(/^logado como "([^\"]*)" de cpf "(\d*)"$/, async (nome, cpf) => {
        await criarMatricula("#criar-page-teste", cpf, nome);
        await browser.get(base_url+'login');
        await element(by.name("cpf-login")).clear();
        await element(by.name("cpf-login")).sendKeys(<string>cpf);
        await $("#sign-in").click();
    });

    Given(/^preencho a meta "([^\"]*)" com "([^\"]*)"$/, async (meta, conceito) => {
        await $("#teste-"+meta).clear();
        await $("#teste-"+meta).sendKeys(<string> conceito);
    });

    When(/^tento registrar as autoavaliacoes$/, async () => {
        await $("#registrar-button").click();
    });

    Then(/^recebo uma mensagem de preenchimento mal sucedido$/, async () => {
        var elems: ElementArrayFinder = element.all(by.name('msg-campo-nulo'));
        await elems.then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(1));
    });

    Then(/^volto para pagina de registro de autoavaliacoes$/, async () => {
       await browser.get(base_url+"page");
    });

    Then(/^volto para pagina Login$/, async () => {
        await browser.get(base_url+"login");
     });







})