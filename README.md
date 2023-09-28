# Todo Nuxt App

## Setup

Mysql Database Setup

```bash
# Create Table
CREATE TABLE `todos` ( `id` INT NOT NULL AUTO_INCREMENT , `title` VARCHAR(50) NOT NULL , `content` TEXT NOT NULL , `status` TINYINT NOT NULL DEFAULT '0' , `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP , `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP , PRIMARY KEY (`id`)) ENGINE = InnoDB;

# Connection
# file : todo-nuxt-app3/server/mysqldb/index.ts
# Modify connection as per your mysql credentials 
const pool = createPool({
  host: "localhost",
  user: "root",
  database: "todos_db",
  password: "root",
});
```

Node Version Requirement

```bash
Node >= 16.20
```

Make sure to install the dependencies:

```bash
# npm
npm install 
# if any error installing package
npm install --legacy-peer-deps
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev
```

## Testing

```bash
npm run test
```

## Production

Build the application for production:

```bash
# npm
npm run build

```

Locally preview production build:

```bash
# npm
npm run preview

```

### Lint

```sh
npm run lint
```

