/// <reference types="Cypress" />


beforeEach(() => {
    cy.visit('./src/index.html')
})

describe('Central de Atendimento ao Cliente TAT', function () {

    it('verifica o título da aplicação', function () {

        cy.title().should('eq', 'Central de Atendimento ao Cliente TAT')
    })

    it('preenche os campos obrigatórios e envia o formulário', function () {
        cy.get('input[id=firstName]').type('Teste Nome')
        cy.get('input[id=lastName]').type('Teste Sobrenome')
        cy.get('input[id=email]').type('email@email.com')
        cy.get('textarea[id=open-text-area]').type('Teste como podemos ajudar')

        cy.get('button[type=submit]').click()

    })

    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function () {
        cy.get('input[id=firstName]').type('Teste Nome')
        cy.get('input[id=lastName]').type('Teste Sobrenome')
        cy.get('input[id=email]').type('email.email.com')
        cy.get('textarea[id=open-text-area]').type('Teste como podemos ajudar')
        cy.get('button[type=submit]').click()

        cy.get('span[class=error]').should('be.visible')

    })

    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function () {
        cy.get('input[id=phone]').should('have.text', '')
        cy.get('input[id=phone]').type('xablau')
        cy.get('input[id=phone]').should('have.text', '')

    })

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function () {
        cy.get('input[id=firstName]').type('Teste Nome')
        cy.get('input[id=lastName]').type('Teste Sobrenome')
        cy.get('input[id=email]').type('email@email.com')
        cy.get('input[id=phone-checkbox').check().should('be.checked')
        cy.get('textarea[id=open-text-area]').type('Teste como podemos ajudar')
        cy.get('button[type=submit]').click()
        cy.get('span[class=error]').should('be.visible')

    })

    it('preenche e limpa os campos nome, sobrenome, email e telefone', function () {
        cy.get('input[id=firstName]').type('Teste Nome').should('have.value', 'Teste Nome').clear().should('have.value', '')
        cy.get('input[id=lastName]').type('Teste Sobrenome').should('have.value', 'Teste Sobrenome').clear().should('have.value', '')
        cy.get('input[id=email]').type('email@email.com').should('have.value', 'email@email.com').clear().should('have.value', '')
        cy.get('input[id=phone]').type('12345678').should('have.value', '12345678').clear().should('have.value', '')

    })

    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function () {
        cy.get('button[type=submit]').click()
        cy.get('span[class=error').should('be.visible')

    })

    it('envia o formuário com sucesso usando um comando customizado', function () {
        cy.fillMandatoryFieldsAndSubmit()

        cy.get('span[class=success]').should('be.visible')
    })

    it('envia o formuário com sucesso usando contains', function () {
        cy.contains('Nome').type('Teste Nome')
        cy.contains('Sobrenome').type('Teste Sobrenome')
        cy.contains('E-mail').type('email@email.com')
        cy.contains('Telefone').type('12345678')
        cy.get('textarea[id=open-text-area]').type('Teste como podemos ajudar')
        cy.contains('Enviar').click()
    })

    it('seleciona um produto (YouTube) por seu texto', function () {
        cy.get('select[id=product]').select('YouTube').should('have.value', '')
    })

    it('seleciona um produto (Mentoria) por seu valor (value)', function () {
        cy.get('select[id=product]').select(3).should('have.value', 'mentoria')
    })

    it('seleciona um produto (Blog) por seu índice', function () {
        cy.get('select[id=product]').select(1).should('have.value', 'blog')
    })

    // it.('seleciona um produto (Aleatório) por seu índice', function () {
    //         cy.get('select option')
    //         .its('length', { log: false }).then(n => {
    //           cy.get('select[id=product]').select(Cypress._.random(n-1))
    //     })
    // })

    it('marca o tipo de atendimento "Feedback"', function () {
        cy.get('input[type=radio][value=feedback]').check().should('have.value', 'feedback')
    })

    it('marca cada tipo de atendimento', function () {
        //Minha solução
        // cy.get('input[type=radio][value=ajuda]').check().should('have.value', 'ajuda').should('be.checked')
        // cy.get('input[type=radio][value=elogio]').check().should('have.value', 'elogio').should('be.checked')
        // cy.get('input[type=radio][value=feedback]').check().should('have.value', 'feedback').should('be.checked')
        //Solução Professor
        cy.get('input[type=radio]').should('have.length', 3).each(function($radio){
            cy.wrap($radio).check()
            cy.wrap($radio).should('be.checked')
        })

    })

    it('marca ambos checkboxes, depois desmarca o último', function () {
        cy.get('input[type=checkbox]')
        .check()
        .should('be.checked')
        .last()
        .uncheck()
        .should('not.be.checked')
        // cy.get('input[id=phone-checkbox]').last().uncheck().should('not.be.checked')
    })

    it('seleciona um arquivo da pasta fixtures', function () {
        cy.get('input[type=file]')
            .selectFile('cypress/fixtures/example.json')
                 .should(function($input){
                    expect($input[0].files[0].name).to.equal('example.json')
                 })
                    
    })

    it('seleciona um arquivo simulando um drag-and-drop', function () {
        cy.get('input[type=file]')
            .selectFile('cypress/fixtures/example.json', {action: 'drag-drop'})
                 .should(function($input){
                    expect($input[0].files[0].name).to.equal('example.json')
                 })
                    
    })

    it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function () {
        cy.fixture('example.json').as('sampleFile')
        cy.get('input[type=file]')
            .selectFile('@sampleFile')
                .should(function($input){
                    expect($input[0].files[0].name).to.equal('example.json')
             })
                    
    })

    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function () {
       cy.get('#privacy a').should('have.attr','target', '_blank')
                    
    })

    it('acessa a página da política de privacidade removendo o target e então clicando no link', function () {
        cy.get('#privacy a').invoke('removeAttr', 'target').click()
        cy.contains('Talking About Testing').should('be.visible')
                     
     })

})