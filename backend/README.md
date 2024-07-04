# Development

Create Migration Schema by file(s) OR cli
```
npx sequelize-cli model:generate --name User    --attributes userName:string
npx sequelize-cli model:generate --name Book    --attributes bookName:string
npx sequelize-cli model:generate --name History --attributes testId:string
```

# Installation
```
npx sequelize-cli init
npx sequelize-cli db:mirgrate
```
