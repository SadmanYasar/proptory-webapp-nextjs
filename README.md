<h1 align="center">
  Proptory Web App 🏠
</h1>

<div align="center">
<br />
</div>

<details open="open">
<summary>Table of Contents</summary>

- [About](#about)
  - [Built With](#built-with)
- [Getting Started](#getting-started)
  - [Manual Setup](#manual-setup)
- [Userflow](#userflow)
- [Roadmap](#roadmap)
- [Support](#support)
- [License](#license)

</details>

---

## About

<table>
<tr>
<td>
Proptory Web App
</td>
</tr>
</table>

### Built With

- [Next.JS](https://nextjs.org/)
- [Typescript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [MongoDB](https://www.mongodb.com/try/download/community)

## Getting Started

Production: [Click to view](https://proptory.com/)

### Manual Setup
Make sure you have the latest [Node.js](https://nodejs.org/en/) installed
1. Clone this repository by running the following in a terminal
```sh
git clone https://github.com/furtoryapp/furtory.git
```
2. Change directory
```
cd proptory-webapp
```
3. Use npm to install dependencies
```
npm install
```
4. Make sure mongodb is running:
```
#Linux
sudo systemctl restart mongod

#OR
mongod
```
Refer here for more information: [Here for Windows](https://stackoverflow.com/questions/20796714/how-do-i-start-mongo-db-from-windows) and [Here for Ubuntu](https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-ubuntu/#run-mongodb-community-edition)

5. Create a .env.local file in the root directory and paste the following:
```
MONGO_URI=mongodb://my_user:my_pwd@localhost:27017/proptory
JWT_SECRET=YOURSECRET
JWT_SECRET_ADMIN=ADMINSECRET
```
6. Create a .env file in the root directory and paste the following:
```
# This is for creating links to send through Whatsapp
NEXT_PUBLIC_URI=https://proptory.com/listings
```
7. Start the project using npm or yarn
```
npm start
```

## Userflow
![proptory user flow](https://user-images.githubusercontent.com/67522140/221553644-eba581df-6b25-4934-9cf3-06efff1dc199.png)

## Database UML Diagram
![UML](https://user-images.githubusercontent.com/67522140/221554183-7b1f3708-a5ab-48f5-bf89-ba6738f26010.png)

## Roadmap

See the [open issues]() for a list of proposed features (and known issues).

- [Feature Requests]() (Add your votes using the 👍 reaction)
- [Newest Bugs]()

## Support

Reach out to the maintainer at one of the following places:

- [GitHub discussions]()
- The email which is located [in GitHub profile]()

## License

See [COPYING](COPYING) for more information.
