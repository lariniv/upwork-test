## Backend

1. Go to the backend direcory
```bash
cd upwork-test-backend
```

2. Install the dependencies
```bash
npm install
```

3. Configure the .env file
```env
DATABASE_URL="postgresql://<USER>:<PASSWORD>@<HOST>:<PORT>/db"
# <USER> - Name of your database user, e.g. janedoe
# <PASSWORD> - Password for your database user
# <HOST> - IP address/domain of your database server, e.g. localhost
# <PORT> - Port on which your database server is running, e.g. 5432
# <DATABASE> - Name of the database you want to use, e.g. mydb

GOOGLE_API_KEY='aaaaaaaaaaaaaaaaaaaaaaaaaaaa'

# API key from Google Console. https://developers.google.com/youtube/v3/getting-started

FRONTEND_URL='http://localhost:3000'

# Url for the frontend of the app

BACKEND_URL='http://localhost:8000'	

# Url for the backend of the app
```

4. Generate Prisma Client
```bash
npx prisma generate
```

5. Apply migration to prisma
```bash
npx prisma migrate dev --name init
```

6. Run the app
```bash
npm run start:dev
```

## Frontend
1. Go to the fronend directory
```bash
cd upwork-test-frontend
```

2. Install the dependencies
```bash
npm install
```

3. Configure the .env file
```env
VITE_BACKEND_URL=http://localhost:8000
# Url for the backend of the app
```

4. Run the app
```bash
npm run dev
```
