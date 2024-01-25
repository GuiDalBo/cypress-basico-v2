/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function () {
    const THREE_SECONDS_IN_MS = 3000

    beforeEach(() => {
        cy.visit('./src/index.html')
    })

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

    Cypress._.times(5, () => {
        it('preenche os campos obrigatórios e envia o formulário', function () {
            cy.get('input[id=firstName]').type('Teste Nome')
            cy.get('input[id=lastName]').type('Teste Sobrenome')
            cy.get('input[id=email]').type('email@email.com')
            cy.get('textarea[id=open-text-area]').type('Teste como podemos ajudar')

            cy.get('button[type=submit]').click()

        })
    })

    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function () {
        cy.clock()
        cy.get('input[id=firstName]').type('Teste Nome')
        cy.get('input[id=lastName]').type('Teste Sobrenome')
        cy.get('input[id=email]').type('email.email.com')
        cy.get('textarea[id=open-text-area]').type('Teste como podemos ajudar')
        cy.get('button[type=submit]').click()
        
        cy.get('span[class=error]').should('be.visible')
        cy.tick(THREE_SECONDS_IN_MS)
        cy.get('span[class=error]').should('not.be.visible')

    })

    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function () {
        cy.get('input[id=phone]').should('have.text', '')
        cy.get('input[id=phone]').type('xablau')
        cy.get('input[id=phone]').should('have.text', '')

    })

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function () {
        cy.clock()
        cy.get('input[id=firstName]').type('Teste Nome')
        cy.get('input[id=lastName]').type('Teste Sobrenome')
        cy.get('input[id=email]').type('email@email.com')
        cy.get('input[id=phone-checkbox').check().should('be.checked')
        cy.get('textarea[id=open-text-area]').type('Teste como podemos ajudar')
        cy.get('button[type=submit]').click()
        cy.get('span[class=error]').should('be.visible')
        cy.tick(THREE_SECONDS_IN_MS)
        cy.get('span[class=error]').should('not.be.visible')

    })

    it('preenche e limpa os campos nome, sobrenome, email e telefone', function () {
        cy.get('input[id=firstName]').type('Teste Nome').should('have.value', 'Teste Nome').clear().should('have.value', '')
        cy.get('input[id=lastName]').type('Teste Sobrenome').should('have.value', 'Teste Sobrenome').clear().should('have.value', '')
        cy.get('input[id=email]').type('email@email.com').should('have.value', 'email@email.com').clear().should('have.value', '')
        cy.get('input[id=phone]').type('12345678').should('have.value', '12345678').clear().should('have.value', '')

    })

    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function () {
        cy.clock()
        cy.get('button[type=submit]').click()
        cy.get('span[class=error').should('be.visible')
        cy.tick(THREE_SECONDS_IN_MS)
        cy.get('span[class=error').should('not.be.visible')

    })

    it('envia o formuário com sucesso usando um comando customizado', function () {
        cy.clock()
        cy.fillMandatoryFieldsAndSubmit()

        cy.get('span[class=success]').should('be.visible')
        cy.tick(THREE_SECONDS_IN_MS)
        cy.get('span[class=success]').should('not.be.visible')
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
        cy.get('select[id=product]').select('YouTube').should('have.value', 'youtube')
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

     it('exibe e esconde as mensagens de sucesso e erro usando o .invoke', function () {
        cy.get('.success')
        .should('not.be.visible')
        .invoke('show')
        .should('be.visible')
        .and('contain', 'Mensagem enviada com sucesso')
        .invoke('hide')
        .should('not.be.visible')
        
        cy.get('.error')
        .should('not.be.visible')
        .invoke('show')
        .should('be.visible')
        .and('contain', 'Valide os campos obrigatórios!')
        .invoke('hide')
        .should('not.be.visible')
     })

     it('simula o comando CTRL+V para colar um texto longo com campo de textArea', function () {
       const longText = Cypress._.repeat('0123456789', 20)

       cy.get('textarea[id=open-text-area]').invoke('val', longText).should('have.value', longText)
     })

     it('faz uma requisição HTTP', function () {
        cy.request({
            method: 'GET',
            url: 'https://cac-tat.s3.eu-central-1.amazonaws.com/index.html'
        }).then((response => {
            expect(response.status).to.equal(200)
            expect(response.statusText).to.equal('OK')
            expect(response.body).to.contain('CAC TAT')
        }))

        //Solução professor
        // cy.request('https://cac-tat.s3.eu-central-1.amazonaws.com/index.html')
        // .should(function (response) {
        //     const {status, statusText, body} = response
        //     expect(status).to.equal(200)
        //     expect(statusText).to.equal('OK')
        //     expect(body).to.include('CAC TAT')
        // })
    })

})

