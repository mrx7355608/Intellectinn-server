#  Intellect-Inn API
### Introduction
Welcome to Itellect-Inn API. This api serves as a backend for my hobby project that replicates some functionalities of the medium blogging platform. This api manages users, articles, comments, authentication & authorization.

### Features
1. User authentication and authorization
2. Google authentication
3. CRUD operations for articles and comments
4. Follow/Unfollow functionality
5. Like/Dislike article
6. Tag articles

## Installation
To run this api, follow these steps:

1. Clone repository
```
git clone https://github.com/mrx7355608/Intellectinn-sever.git
```


2. Navigate to project directory
```
cd Intellect-Inn
```

3. Install dependencies by running these commands
```
# with yarn
yarn

# with npm
npm i
```

4. Setup environment variables. Create a .env file in the root directory with these fields
```
DB_URL="<your_mongodb_url>"
PORT=8000
SESSIONS_SECRET="<secret-key>"
NODE_ENV="development"

# this is optional if you just want to try the api
# it is used to prevent cors issues in frontend (see src/app.js)
CLIENT_URL="<your_frontend_url>"
```

## Endpoints
> Will update soon 😗



## Testing API
I am using jest testing framework. You can test api by running the following command
```
yarn test
```

