describe("Test Navigation", () => {
    it("should visit the home page with all the projects", () => {
        cy.visit("/")
        cy.contains("Archaeology")
        cy.contains("English studies")
    })

    it("should navigate to first project", () => {
        cy.visit("/projects")
        cy.get(".card").first().click()
        cy.contains("Institut für Archäologische Wissenschaften")
    })

    it("should navigate to second project", () => {
        cy.visit("/projects")
        cy.get(".card").first().next().click()
        cy.contains("Englisches Seminar")
    })
})
