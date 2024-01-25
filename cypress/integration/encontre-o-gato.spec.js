describe('Desafio de encontrar o gato', function () {

    beforeEach(() => {
        cy.visit('./src/index.html')
    })

    it('encontra o gato', function () {
        cy.get('span[id=cat]').invoke('show').should('be.visible')
        cy.get('#title').invoke('text', 'CAT TAT')
        
    })

})