// import { prisma } from '@/db'
// import { parseArgs } from 'node:util'

// const options = {
//     environment: { type: 'string' },
// }

// async function main() {
//     const {
//         values: { environment },
//     } = parseArgs({ options })

//     switch (environment) {
//         case 'development':
//             /** data for your development */
//             break
//         case 'test':
//             /** data for your test environment */
//             break
//         default:
//             break
//     }
// }

// main()
//     .then(async () => {
//         await prisma.$disconnect()
//     })
//     .catch(async (e) => {
//         console.error(e)
//         await prisma.$disconnect()
//         process.exit(1)
//     })