const Models = require('../models');
// console.log(Models)


async function main() {
    await Models.User.sync();
    // await Models.Book.sync({force: true});
    // await Models.History.sync({force: true});
}

main()
