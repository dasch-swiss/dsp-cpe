describe("Test Navigation", () => {
    it("should visit the home page with all the projects", () => {
        cy.visit("/")
        cy.contains("Project 1: MLS")
        cy.contains("Project 2: Beol")
    })

    it("should navigate to a project", () => {
        cy.visit("/projects")
        cy.get(".project-buttons").find("cpe-button").first().click()
        cy.contains("This is the first project")
    })
})
