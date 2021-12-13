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
        cy.get('#input-23')
            .should('have.value', '')
    })

    it('opens setting when pressing the settings icon', () => {
        cy.get('.v-menu__content > .v-list')
            .should('not.exist')
        cy.get('button#openSettingsButton')
            .click()
        cy.get('.v-menu__content > .v-list')
            .should('be.visible')
    })

    context('changing path when router link buttons are pressed',()=>{
        it('changes path to /home', ()=>{
            cy.contains('Home').click()
            cy.url()
                .should('include', '/home')
        })
        it('changes path to /products', ()=>{
            cy.contains('Products').click()
            cy.url()
                .should('include', '/products')
        })
        it('changes path to /favorites', ()=>{
            cy.contains('Favorites').click()
            cy.url()
                .should('include', '/favorites')
        })
        it('changes path to /categories', ()=>{
            cy.contains('Categories').click()
            cy.url()
                .should('include', '/categories')
        })
        it('changes path to /shops', ()=>{
            cy.contains('Shops').click()
            cy.url()
                .should('include', '/shops')
        })
        it('changes path to /contacts', ()=>{
            cy.contains('Contacts').click()
            cy.url()
                .should('include', '/contacts')
        })
    } )
})