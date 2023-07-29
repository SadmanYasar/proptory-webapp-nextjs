// @ts-check
///<reference path="../global.d.ts" />

Cypress.Commands.add("getBySel", (selector, ...args) => {
    return cy.get(`[data-cy=${selector}]`, ...args);
});

Cypress.Commands.add("getBySelLike", (selector, ...args) => {
    return cy.get(`[data-cy*=${selector}]`, ...args);
});

// Cypress.Commands.add('login', ({ username, password }) => {
//     cy.request('POST', 'http://localhost:3000/api/auth/login', {
//         username, password
//     }).then(({ body }) => {
//         localStorage.setItem('loggedBlogAppUser', JSON.stringify(body))
//         cy.visit('http://localhost:3000')
//     })
// });

// Cypress.Commands.add('newBlog', ({ title, author, url }) => {
//     cy.request({
//         url: 'http://localhost:3003/api/blogs',
//         method: 'POST',
//         body: { title, author, url },
//         headers: {
//             'Authorization': `Bearer ${JSON.parse(localStorage.getItem('loggedBlogAppUser')).token}`
//         }
//     })

//     cy.visit('http://localhost:3000')
// });
export { };