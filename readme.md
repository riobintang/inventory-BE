# Inventory BE
---

## Installation

You need to install node v16.14.2 https://nodejs.org/en/blog/release/v16.14.2/ or latest https://nodejs.org/en/download/ \
You need to install all package with command:

```text
npm install
```

Create database, table, and seeding with command: 
```text
npx prisma migrate dev
``` 

Before start, create a .env file with contents like .env.example \
Start API with command:

```text
npm run start-dev
```


## Postman API Documentation
[API Documentation](https://documenter.getpostman.com/view/32900468/2sAYJ6Cf9b)

## Table of Contents
- [Auth](#auth)
  - [Login](#login)
  - [Profile](#get-profile)
  - [Change Password](#change-password)
- [User](#user)
  - [Add User](#add-user)
  - [Get All User](#get-all-user)
  - [Get User By ID](#get-user-by-id)
  - [Set Active Auditor](#set-active-auditor)
  - [Reset Password Auditor](#reset-password-auditor)
  - [Delete Auditor](#delete-auditor)
- [Type](#type)
  - [Get All Types](#get-all-types)
  - [Get Type By ID](#get-type-by-id)
  - [Add Type](#add-type)
  - [Edit Type](#edit-type)
  - [Delete Type](#delete-type)
- [Inventory](#inventory)
  - [Get All Inventories](#get-all-inventories)
  - [Get Inventory By ID](#get-inventory-by-id)
  - [Add Inventory](#add-inventory)
  - [Edit Inventory](#edit-inventory)
  - [Delete Inventory](#delete-inventory)


This project has two user roles: Admin and Auditor. The Admin has full access, while the Auditor has read-only access to the inventory.
If an Auditor attempts to access admin resources, the response will be:
```json
{
    "status": "fail",
    "message": "You are not allowed to access"
}
```

## Auth

### Login
User login using this API
Endpoint
```text
POST /auth/login
```
Body

```
{
    "username": string (minimum 5 characters),
    "password": string (minimum 8 characters)
}
```
Response Success

```
{
  "status": string,
  "message": string,
  "data":{
      "token": string,
}
```
Response Fail

```
{
  "status": string,
  "message": string,
}
```

### Get Profile
User gets their own profile
Endpoint
```text
POST /auth/me
```
Body

```
{

}
```

Response Success

```
{
  "status": string,
  "message": string,
  "data":{
      "user": {
          "createdAt": Date,
          "username": string,
          "name": string,
          "isActive": boolean,
  }
}
```

### Change Password
User can change their password with this API
Endpoint
```text
POST /auth/change-password
```
Body

```
{

}
```

Response Success

```
{
  "status": string,
  "message": string,
  "data":{
      "user": {
          "createdAt": Date,
          "username": string,
          "name": string,
          "isActive": boolean,
  }
}
```
Body

```
{
    "oldPassword": string (minimum 8 characters),
    "newPassword": string (minimum 8 characters),
    "rePassword": string (minimum 8 characters)
}
```
Response Success

```
{
  "status": string,
  "message": string,
}
```
Response Fail

```
{
  "status": string,
  "message": string,
}
```

## User
### Add User
For add Auditor that password can be generated automatically
Can only be accessed by Admin
Endpoint
```text
POST /users/add
```
Body

```
{
  "name": string (minimum 4),
  "username": string (minimum 5 and unique)
}
```

Response Success

```
{
  "status": string,
  "message": string,
  "data":{
      "user": {
          "username": string,
          "name": string,
          "password": password,
  }
}
```
Response Fail

```
{
  "status": string,
  "message": string,
}
```

### Get All User
Get All User with filtering by user or username and isactive. 
Can only be accessed by Admin
Endpoint
```text
GET /users/all?searchuser=[string]&&isactive=[boolean]
```
Body

```
{
}
```

Response Success

```
{
  "status": string,
  "message": string,
  "data":{
      "user": [
          {
          "id": string
          "username": string,
          "name": string,
          "isActive": boolean,
          }
  ]
}
```

### Get User By Id
Can only be accessed by Admin
Endpoint
```text
GET /users/:id => /users/[string]
```
Body

```
{
}
```

Response Success

```
{
  "status": string,
  "message": string,
  "data":{
      "user": {
          "createdAt": Date
          "username": string,
          "name": string,
          "isActive": boolean,     
  }
}
```
Response Fail

```
{
  "status": string,
  "message": string,
}
```

### Set Active Auditor
This API sets the auditor's active status.
Set to false to prevent the auditor from logging in,
and set to true to allow the auditor to log in.
Can only be accessed by Admin
Endpoint
```text
PUt /users/:id => /users/[string]
```
Body

```
{
  "isActive": boolean
}
```

Response Success

```
{
  "status": string,
  "message": string
}
```
Response Fail

```
{
  "status": string,
  "message": string,
}
```
### Reset Password Auditor
This API for reset password auditor, admin get the new password that automatically generate by system.
Can only be accessed by Admin
Endpoint
```text
POST /users/resetpassword/:id => /users/resetpassword/[string]
```
Body

```
{
}
```

Response Success

```
{
  "status": string,
  "message": string,
  "data":{
      "user": {
          "password": string,
  }
}
```
Response Fail

```
{
  "status": string,
  "message": string,
}
```

### Delete Auditor
This API for Delete Auditor
Can only be accessed by Admin
Endpoint
```text
DELETE /users/:id => /users/[string]
```
Body

```
{
}
```

Response Success

```
{
  "status": string,
  "message": string,
}
```
Response Fail

```
{
  "status": string,
  "message": string,
}
```

## Type
### Get All Types
This API for get all Types. This will return array on data type
Endpoint
```text
GET /types/
```
Body

```
{
}
```

Response Success

```
{
  "status": string,
  "message": string,
  "data":{
      "type": [
          {
          "id": number,
          "name": string,
          "description": string,
          },
      ]
}
```

### Get Type By Id
This API for get type by specific id
Endpoint
```text
GET /types/:id => /users/[number]
```
Body

```
{
}
```

Response Success

```
{
  "status": string,
  "message": string,
  "data":{
      "user": {
          "id": number,
          "createdAt": Date,
          "updatedAt": Date,
          "name": string,
          "description": string,     
  }
}
```
Response Fail

```
{
  "status": string,
  "message": string,
}
```

### Add Type
For adding new type
Can only be accessed by Admin
Endpoint
```text
POST /types/add
```
Body

```
{
  "name": string,
  "description": string,
}
```

Response Success

```
{
  "status": string,
  "message": string,
}
```
Response Fail

```
{
  "status": string,
  "message": string,
}
```

### Edit Type
This API for edit Type
Can only be accessed by Admin
Endpoint
```text
PUT /types/:id => /types/[number]
```
Body

```
{
  "name": string,
  "description": string,
}
```

Response Success

```
{
  "status": string,
  "message": string,
}
```
Response Fail

```
{
  "status": string,
  "message": string,
}
```

### Delete Type
This API for delete type by id
Can only be accessed by Admin
Endpoint
```text
DELETE /types/:id => /users/[number]
```
Body

```
{
}
```

Response Success

```
{
  "status": string,
  "message": string,
}
```
Response Fail

```
{
  "status": string,
  "message": string,
}
```

## Inventory
### Get All Inventories
Get all Inventories. Return array on data inventory 
Endpoint
```text
GET /inventories/
```
Body

```
{
}
```

Response Success

```
{
  "status": string,
  "message": string,
  "data":{
      "inventory": [
          {
          "code": string
          "name": string,
          "description": string,
          "quantity": number,
          "type": {
              "name": string,
              "description": string
            }    
          },
      ]
}
```

### Get Inventory By Id
Get inventory by specific id
Endpoint
```text
GET /inventory/:id => /users/[number]
```
Body

```
{
}
```

Response Success

```
{
  "status": string,
  "message": string,
  "data":{
      "inventory": {
          "code": string
          "name": string,
          "description": string,
          "quantity": number,
          "type": {
              "name": string,
              "description": string
            }    
  }
}
```
Response Fail

```
{
  "status": string,
  "message": string,
}
```

### Add Inventory 
This API for adding new inventory
Can only be accessed by Admin
Endpoint
```text
POST /inventory/add
```
Body

```
{
  "code": string and unique,
  "name": string,
  "description": string,
  "quantity": number and not negative,
  "typeId": number
}
```

Response Success

```
{
  "status": string,
  "message": string,
}
```
Response Fail

```
{
  "status": string,
  "message": string,
}
```

### Edit Inventory 
This API for edit inventory by id
Can only be accessed by Admin
Endpoint
```text
PUT /inventory/:id => /inventory/[number]
```
Body

```
{
  "code": string and unique,
  "name": string,
  "description": string,
  "quantity": number and not negative,
  "typeId": number
}
```

Response Success

```
{
  "status": string,
  "message": string,
}
```
Response Fail

```
{
  "status": string,
  "message": string,
}
```
### Delete Inventory 
This API for delete inventory by specific id
Can only be accessed by Admin
Endpoint
```text
DELETE /inventory/:id => /inventory/[number]
```
Body

```
{
}
```

Response Success

```
{
  "status": string,
  "message": string,
}
```
Response Fail

```
{
  "status": string,
  "message": string,
}
```



























