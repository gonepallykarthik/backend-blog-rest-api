# Blog Backend REST API

Backend REST API Assignment

## Tech Stack

**Server:** Node, Express.

**Database:** Im using cloud Database (Mongodb atlas).

**Mongoose:** ORM.

**Multer:** For file uploads!.

**Jsonwebtokens:** For authentication (User Login).

**resend:** For Emails.

**Bcrypt:** For Passwords hashing.

## Run Locally

Clone the project

```bash
  git clone https://github.com/gonepallykarthik/backend-blog-api.git
```

Go to the project directory

```bash
  cd my-project
```

### Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run start
```

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`DATABASE_URL` `DATABASE_NAME`
`RESEND_API_SECRET`
`TOKEN_SECRET`

## API Reference

#### Get User Profile

```http
  GET /api.vizmo/v1/users/me

  make sure that you are providing auth token (Bearer) in Authorization Tab
```

#### Create new User or signup new user

```http
  POST /api.vizmo/v1/users

  request body should be JSON
```

#### User Login

```http
  POST /api.vizmo/v1/user/login

  make sure that you are providing auth token (Bearer) in Authorization Tab
```

#### User Logout

```http
  POST /api.vizmo/v1/user/logout
```

#### Update User details

```http
  PATCH /api.vizmo/v1/users/me

  make sure that you are providing auth token (Bearer) in Authorization Tab
  and also Updated Feilds in JSON
```

#### Delete User

```http
  DELETE /api.vizmo/v1/users/me

  make sure that you are providing auth token (Bearer) in Authorization Tab
```

## For Blogs

#### Get All Blogs

```http
  GET /api.vizmo/v1/blogs

  make sure that you are providing auth token (Bearer) in Authorization Tab
```

#### Get All Blogs Filter By Title

```http
  GET /api.vizmo/v1/tasks?title=<your response>

  make sure that you are providing auth token (Bearer) in Authorization Tab
```

#### Craete a new Blog

```http
  POST "/api.vizmo/v1/blog"

  make sure that you are providing auth token (Bearer) in Authorization Tab

```

#### Get Blog by ID

```http
  GET /api.vizmo/v1/blog/:id
```

| Parameter | Type       | Description   |
| :-------- | :--------- | :------------ |
| `id`      | `ObjectID` | **Required**. |

#### Update Blog by ID

```http
  PATCH /api.vizmo/v1/blog/:id
```

| Parameter | Type       | Description   |
| :-------- | :--------- | :------------ |
| `id`      | `ObjectID` | **Required**. |

#### Delete Blog by ID

```http
  DELETE /api.vizmo/v1/blog/:id
```

| Parameter | Type       | Description   |
| :-------- | :--------- | :------------ |
| `id`      | `ObjectID` | **Required**. |
