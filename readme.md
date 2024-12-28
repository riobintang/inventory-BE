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
  - [Profile](#profile)
  - [Change Password](#changepassword)
- [User](#user)
  - [Add User](#adduser)
  - [Get All User](#getalluser)
  - [Get User By ID](#getuserbyid)
  - [Set Active Auditor](#setactiveaudit)
  - [Reset Password Auditor](#resetpaswordaudit)
  - [Delete Auditor](#deleteaudit)
- [Type](#type)
  - [Get All Types](#getalltypes)
  - [Get Type By ID](#gettypebyid)
  - [Add Type](#addtype)
  - [Edit Type](#edittype)
  - [Delete Type](#deletetype)
- [Inventory](#inventory)
  - [Get All Inventories](#getallinventories)
  - [Get Inventory By ID](#getinventorybyid)
  - [Add Inventory](#addinventory)
  - [Edit Inventory](#editinventory)
  - [Delete Inventory](#deleteinventory)
