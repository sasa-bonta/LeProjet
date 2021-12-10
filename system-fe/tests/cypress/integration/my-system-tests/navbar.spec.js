describe('example to-do app', () => {
    const searchText = 'samsung a 50'

    beforeEach(() => {
        cy.visit('http://localhost:8080/')
    })

    it('redirected from / to /home', () => {
        cy.url().should('include', '/home')
    })

    it('navbar has 6 route buttons to categories', () => {
        cy.get('.v-btn--router')
            .should('have.length', 6)
    })

    it('the [Home] button is active', () => {
        cy.contains('Home')
            .should('have.class', 'v-btn--active')
    })

    it('it changes path to /products when searching for products and has search url param', () => {
        cy.get('#input-23')
            .type(`${searchText}{enter}`)
            .should('have.value', searchText)
        cy.url()
            .should('include', '/products')
            .should('include', `?search=${encodeURIComponent(searchText)}`)
    })

    it('deletes the value from search input if the path was changed', () => {
        cy.get('#input-23')
            .type(`${searchText}{enter}`)
        cy.contains('Home').click()
        cy.url()
            .should('include', '')
    })

    it('opens setting when pressing the settings icon', () => {
        cy.get('.v-menu__content > .v-list')
            .should('not.exist')
        cy.get('button.crossRotate.v-icon--link')
        cy.get('.container > .v-icon.crossRotate.v-icon--link.material-icons')
            .click()
        cy.get('.v-menu__content > .v-list')
            .should('be.visible')
    })
})