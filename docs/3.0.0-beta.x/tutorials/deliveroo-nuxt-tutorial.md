# Deliveroo clone with Nuxt.js, GraphQL, Strapi and Stripe

_By [Pierre Burgy](https://github.com/pierreburgy), revised by [Maxime Castres](https://github.com/Mcastres) on August 19, 2019_

Get ready to develop a **[Deliveroo ](https://deliveroo.fr/en/) clone. You will use the following amazing technologies: [Nuxt.js](https://nuxtjs.org) ([Vue.js](https://vuejs.org)), [GraphQL](https://graphql.org), [Stripe](http://stripe.com/) and [Strapi](https://strapi.io/)**! From **New User Sign** to **New Order**, you are going to allow **Front-end Users** to discover **Restaurants**, **Dishes** and select a meal which makes them happy!

![Tutorial illustration](./deliveroo-nuxt/nuxt-article.png)

This demo, of the final result, below should make you hungry:

![final result](./deliveroo-nuxt/final-result.gif)

**Note:** The **source code** is **available on GitHub:** [https://github.com/strapi/strapi-examples/tree/master/nuxt-strapi-deliveroo-clone-tutorial](https://github.com/strapi/strapi-examples/tree/master/nuxt-strapi-deliveroo-clone-tutorial)\*

## Introduction

### Nuxt.js

[Nuxt.js](https://nuxtjs.org) is an amazing framework for creating **apps with Vue.js**. Designed to build production ready applications, it provides a solid project structure built with Webpack and Babel.

[Vue.js](https://vuejs.org) is one of the most famous **front-end frameworks**, with more than 100K stars (🙈) on GitHub. Created in 2014 by [Evan You](https://twitter.com/youyuxi), Vue.js has quickly become a leading Javascript framework in part due to three main advantages: an extremely simple yet **powerful API**, a **small library size**, and **great performance**.

### GraphQL

**REST** is the convention powering 99% of the live APIs. Succeeding **SOAP**, it quickly became the de-facto convention due to its simplicity.

In 2015, Facebook published [GraphQL](https://graphql.org): a **powerful query language to request APIs**. Since its publication, it kept growing and has been adopted by giants, such as [GitHub](https://github.com/),[Twitter](https://twitter.com/) and [Yelp](https://www.yelp.com/).

### Strapi

[Strapi](https://strapi.io) is the the **open source Headless CMS Front-End Developers love**. It saves weeks of API development time and is the headless CMS of choice for those developers needing to customize their CMS with an open-source and modern stack alternative to paid hosted proprietary services.

With its extensible plugin system, Strapi provides a large set of built-in features: Admin Panel, Authentication & Permissions management, Content Management, API Generator, etc. **Strapi is 100% open-source** and **MIT licensed** ( [GitHub repo](https://github.com/strapi/strapi)), which means:

- **Strapi is completely free**.
- You can **host it on your own servers**, so you own the data.
- It is entirely **customizable and extensible** because of it's plugin system.

### Stripe

Stripe is an **online payement processor** which makes a developers' life much easier when dealing with payments. In this tutorial, you will use it to (test mode) process orders.

Looking forward to cook this app? Let's **get started**!

## Setup

In this tutorial, you are given two sets of commands. Those using [Yarn](https://yarnpkg.com/en/) and those using [npm](https://www.npmjs.com/). We recommend using **Yarn**, but the alternative **npm** commands also work well.

**NOTE:** You will **not** do complicated _Cookie and Session handling_ in this tutorial. Therefore, you may get errors related to **cookies**. Please _clear your browser cookies_, if you are unsure.

**NOTE:** Various links throughout this tutorial assume you have either (or both) the Strapi project or Nuxt.js app running.

## Install Nuxt.js

First of all, you are going to setup the Nuxt.js project.

- To do so, from your terminal, install the **Vue CLI**:

```bash
yarn global add @vue/cli

# OR

npm install -g @vue/cli
```

- Create and enter a directory named `deliveroo-clone-tutorial`:

`Path: ./Projects/`

```bash
mkdir deliveroo-clone-tutorial && cd deliveroo-clone-tutorial
```

You will next create a new Nuxt.js project. You will call this project, `frontend`:

`Path: ./deliveroo-clone-tutorial/`

```bash
yarn create nuxt-app frontend

# OR

npx create-nuxt-app frontend

# OR

npm init nuxt-app frontend
```

The above command generates a series of questions. The only two questions you |**must** answer are: but you only need to answer the following two questions:

- Choose between **npm** and **yarn** as your package manager (**we recommend yarn**)
- Select **Bootstrap Vue** as your UI framework

Otherwise, just hit `enter` and continue.

You will see something like this:

```bash
➜  deliveroo-clone-tutorial yarn create nuxt-app frontend
yarn create v1.17.3
[1/4] 🔍  Resolving packages...
[2/4] 🚚  Fetching packages...
[3/4] 🔗  Linking dependencies...
[4/4] 🔨  Building fresh packages...
success Installed "create-nuxt-app@2.9.2" with binaries:
      - create-nuxt-app

create-nuxt-app v2.9.2
✨  Generating Nuxt.js project in frontend
? Project name deliverooClone
? Project description Creating a Deliveroo Clone using Strapi and Nuxt.js.
? Author name Your Name
? Choose the package manager Yarn
? Choose UI framework Bootstrap Vue
? Choose custom server framework None (Recommended)
? Choose Nuxt.js modules (Press <space> to select, <a> to toggle all, <i> to invert selection)
? Choose linting tools (Press <space> to select, <a> to toggle all, <i> to invert selection)
? Choose test framework None
? Choose rendering mode Universal (SSR)
Warning: name can no longer contain capital letters

🎉  Successfully created project deliverooClone

  To get started:

	cd frontend
	yarn dev

  To build & start for production:

	cd frontend
	yarn build
	yarn start

✨  Done in 82.99s.
```

- In order to launch your **Nuxt.js** application, run either:

```bash
cd frontend && yarn dev`

# OR

cd frontend && npm run dev
```

Here you are! Open [http://localhost:3000](http://localhost:3000) to discover your brand new app.

### Creating the Header component

- Open the **Nuxt.js** app in your code editor. `Path: ./Projects/deliveroo-clone-tutorial/frontend/`

- Create your first component called, `Header.vue`:
  - Create a new file called `Header.vue` in the `./components` folder
  - copy the following code into the new file and save it.

`Path: ./deliveroo-clone-tutorial/frontend/components/Header.vue`

```js
<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container">
      <router-link tag="a" class="navbar-brand" to="/" exact>
        Deliveroo clone
      </router-link>
    </div>
  </nav>
</template>
```

In the next step, you will **copy/paste** the following code to use the new **Header.vue** component, import the new component and delete the unnecessary CSS styles.

- Copy/paste the following code to replace the `default.vue` file.

`Path: ./deliveroo-clone-tutorial/frontend/layouts/default.vue`

```js
<template>
  <div>
    <Header/>
    <nuxt/>
  </div>
</template>

<script>
import Header from '~/components/Header.vue'
export default {
  components: {
    Header
  }
}
</script>
```

- Clean-up the **index.vue** (Home page) content and remove the unneeded CSS styles:

`Path: ./deliveroo-clone-tutorial/frontend/pages/index.vue`

```js
<template>
  <section class="container">
    <div>
      <p>Home</p>
    </div>
  </section>
</template>
```

- Restart the frontend to see your changes at [http://localhost:3000](http://localhost:3000). You can use either of these commands to restart your **Nuxt.js** app:

`Path: ./deliveroo-clone-tutorial/frontend/`

```bash
yarn dev

# OR

npm run dev
```

![Home page](./deliveroo-nuxt/part-one-end-nuxt-running.png)

### Strapi Installation

Having a frontend is good, but your app needs a backend to manage front-end **Users**, **Restaurants**, **Dishes** and **Orders**. To make the magic happen, you will create a Strapi project to manage your content.

## Install Strapi

**Requirements:** Please make sure to use [Node 10](https://nodejs.org/en/download) (or higher).

Strapi can be used with different databases. **You will use the `--quickstart` option which will automatically install Strapi with a SQLite database.** This is recommended for prototyping and developing with Strapi. (_Unless using MongoDB_).

**OPTIONAL:** If you would like to use [MongoDB](https://docs.mongodb.com/manual/installation/), Postgres or MySQL or MariaSB, make sure they are installed and running locally. Then execute the either of the following commands with the `--quickstart` flag.

- Open another command line tab and navigate to the `./deliveroo-clone-tutorial` folder
- Next, install Strapi and generate a project called `backend`:

`Path: ./deliveroo-clone-tutorial/`

```bash
yarn create strapi-app backend --quickstart

# OR

npx create-strapi-app backend --quickstart
```

Wait a few seconds until your project is up and running. Your web browser should automatically open. If not, visit [http://localhost:1337/admin/](http://localhost:1337/admin/) for the next step.

**Note:** This is how to start Strapi frontend in case you stopped the running process:

```bash
yarn develop

# OR

npm run develop

```

### Create your first Administrator

- Add your first administrator from the [registration page](http://localhost:1337/admin/plugins/users-permissions/auth/register).

![Strapi register](./deliveroo-nuxt/register-adminstrator.gif)

Good job, you have successfully setup both the **Nuxt.js** app and the Strapi project! 🎉

🏠 In the next section, you will learn how to display the list of **Restaurants**:

![Restaurant Lists](./deliveroo-nuxt/part-two-restaurant-lists.png)

## Create Restaurants

First of all, you need to display the list of restaurants in your web app. This list is going to be managed through your Strapi API. So, you will start by configuring it.

### Define the Content Type

A **Content Type**, also called a `model`, is a type of **data**. A Strapi API includes, by default, the `user` Content Type (for front-end Users). Right now, you need **Restaurants**, so your new Content Type is going to be, as you already guessed, named `restaurant`. (**Content Types are always singular**.)

Below are the required steps:

- Navigate to the Content Type Builder [Content Type Builder](http://localhost:1337/admin/plugins/content-type-builder) or in the left-hand menu under **PLUGINS**, **Content Type Builder**:
- Click on the `+ Add Content Type` button
- Set `restaurant` as name and press `save`
- Create the followings fields:
  - Add a **String** field, call it `name`
  - Add a **Text** field, call it`description` and in the **Advanced Settings** tab, select `Display as a WYSIWYG`)
  - add a **Media** field, call it `image`
- Click on the `Save` button for the **field types**, and then again click the `Save` button to save the new **Restaurant Content Type**.

![Content Type Builder](./deliveroo-nuxt/content-type-builder-restaurant.gif)

At this point, your frontend should have automatically restart and a new link `Restaurants` appears in the left menu (under **CONTENT TYPES**).

### Add some entries

Well done! You created your first Content Type. The next step is to add some restaurants to your database. To do so, click on **Restaurants** in the left menu [http://localhost:1337/admin/plugins/content-manager/restaurant](http://localhost:1337/admin/plugins/content-manager/restaurant).

You are now in a user-interface which lets you see and edit entries for your `Restaurant` Content Type.

Go ahead and create a **Restaurant**:

- Click on `Add New Restaurant`
- Give it a `Name`, a `Description` and drop in an `Image`
- Save it
  - Repeat these to create as many restaurants as you would like to see in your app

![Restaurant Content Type](./deliveroo-nuxt/content-manager-restaurant.gif)

### Allow access

Having the items in database is great. Being able to request them from the Strapi API is even better.
When you were creating your `restaurant` Content Type, Strapi created, behind the scenes, a set of files located in `api/restaurant`. These files include the logic to expose a fully customizable CRUD API. The `find` route is available at [http://localhost:1337/restaurants](http://localhost:1337/restaurants).

- Try to visit the above URL and you will be surprised to be blocked by a _403 forbidden error_. This is actually totally normal: **New Strapi APIs are secured by design**.

Don't worry, making this route accessible is actually super intuitive:

- Navigate to the `Roles & Permissions` section of the admin dashboard [http://localhost:1337/admin/plugins/users-permissions](http://localhost:1337/admin/plugins/users-permissions).
- Click on the `Public` role.
- Check the `find` and `findone` checkboxes of the `Restaurant` section.
- Save.

**Important:** do the same thing for the `authenticated` role:

- Navigate to the `Roles & Permissions` section of the admin plugin [http://localhost:1337/admin/plugins/users-permissions](http://localhost:1337/admin/plugins/users-permissions).
- Click on the `Authenticated` role.
- Check the `find` and `findone` checkboxes of the `Restaurant` section.
- Save.

Now go back to [http://localhost:1337/restaurants](http://localhost:1337/restaurants): at this point, you should be able to see your list of restaurants.

![Users Permissions](./deliveroo-nuxt/users-permissions-restaurants.gif)

## Enabling GraphQL

By default, the APIs generated with Strapi use REST conventions. What if I told you that you could transform them into GraphQL within 10 seconds?

Well, let me prove that to you.

A GraphQL plugin is available for Strapi. Navigate to your **Strapi** project located in the `./backend`
directory and stop your running project.

- Install the **GraphQL** plugin with the following command:

`Path: ./deliveroo-clone-tutorial/backend/`

```bash
cd backend

yarn strapi install graphql

# OR

npm run strapi install graphql
```

And that's it, you are done with the installation.

![GraphQL installation](./deliveroo-nuxt/graphql-installation.png)

- Restart Strapi

`Path: ./deliveroo-clone-tutorial/backend/`

```bash
yarn develop

# OR

npm run develop

```

- Go to [http://localhost:1337/graphql](http://localhost:1337/graphql) and try the following query:

```json
{
  restaurants {
    id # Or _id if you are using MongoDB
    name
  }
}
```

![Strapi GraphQL](./deliveroo-nuxt/graphql.gif)

You should see the **Restaurants**, if you did, you are ready to go onto the next step.

### Display restaurants

It looks you are going to the right direction. What if you would display these restaurants in your Nuxt.js app?

![Restaurants list](./deliveroo-nuxt/restaurants-display.gif)

- Switch to the tab in your command line for the `./frontend` code. You may have to stop the process.

`Path: ./deliveroo-clone-tutorial/frontend/`

```bash
cd ./deliveroo-clone-tutorial/frontend
```

To quicken your front-end development, you are going to install the [Strapi JavaScript SDK](https://github.com/strapi/strapi-sdk-javascript):

```bash
yarn add strapi-sdk-javascript

# OR

npm install strapi-sdk-javascript
```

Now, you are going to create a [store](https://nuxtjs.org/guide/vuex-store) to keep your restaurants list organized.

This store has a simple state which contains the list of restaurants. You add two mutations: one to add restaurants to the list and another to empty the list. To easily get the list of restaurants from any component, you also add a getter. You already have a `store` directory so you'll need to create the following file:

- Create a file called `restaurants.js` and copy/paste the following code:

`Path: ./deliveroo-clone-tutorial/frontend/store/restaurants.js`

```js
export const state = () => ({
  list: [],
});

export const mutations = {
  add(state, restaurant) {
    state.list.push(restaurant);
  },
  emptyList(state) {
    state.list = [];
  },
};

export const getters = {
  list: state => {
    return state.list;
  },
};
```

Now that your store is ready, you can start working on the view. Since you want to display the restaurants on the homepage, you need to update the `pages/index.vue`.

- Copy/paste the following code to replace the existing content in the `./index.vue`:

`Path: ./deliveroo-clone-tutorial/frontend/pages/index.vue`

```js
<template>
  <section class="container">
    <div class="row">
      <div class="col-md-12">
        <div class="form-group mt-3">
          <input v-model="query" type="text" class="form-control" placeholder="Search...">
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12">
        <ul class="card-columns list-unstyled">
          <li v-for="restaurant in filteredList" :key="restaurant.id" class="card">
            <img :src="restaurant.image.url" class="card-img-top">
            <div class="card-body">
              <h5 class="card-title">{{ restaurant.name }}</h5>
              <p class="card-text">{{ restaurant.description || 'No description provided' }}.</p>
              <router-link :to="{ name: 'restaurants-id', params: { id: restaurant.id }}" tag="a" class="btn btn-primary">
                See dishes
              </router-link>
            </div>
          </li>
          <p v-if="!filteredList.length">No results :(</p>
        </ul>
      </div>
    </div>
  </section>
</template>

<script>
import Strapi from 'strapi-sdk-javascript/build/main'
const apiUrl = process.env.API_URL || 'http://localhost:1337'
const strapi = new Strapi(apiUrl)

export default {
  data() {
    return {
      query: ''
    }
  },
  computed: {
    filteredList() {
      return this.restaurants.filter(restaurant => {
        return restaurant.name.toLowerCase().includes(this.query.toLowerCase())
      })
    },
    restaurants() {
      return this.$store.getters['restaurants/list']
    }
  },
  async fetch({ store }) {
    store.commit('restaurants/emptyList')
    const response = await strapi.request('post', '/graphql', {
      data: {
        query: `query {
            restaurants {
              id
              name
              description
              image {
                url
              }
            }
          }
          `
      }
    })
    // We check if we are hosting images on an external service, if yes then use that otherwise it's local
    response.data.restaurants.forEach(restaurant => {
      const imageUrl = restaurant.image.url;
      restaurant.image.url = imageUrl.startsWith("https")
        ? imageUrl
        : `${apiUrl}${restaurant.image.url}`;
      store.commit("restaurants/add", {
        id: restaurant.id,
        ...restaurant
      });
    });
  }
}
</script>
```

**Some explanation, please? 🤔**

Two main sections are visible here: the **template** and the **script**. These are typical in Vue.js applications.

The template section defines the structure of the page. As you can see, some attributes are very specific to Vue.js:

1.  `v-for`: repeat the current tag as many times as the array length (`restaurants` in your case).
2.  `v-if`: display the tag only if the condition is valid.
3.  `v-model`: bind a variable according to the value of the input. Useful here to create a simple search system to filter restaurants according to their name.
4.  `vue-router`: create a link to another page.

In the `script` section, you imported your required components and node modules. The `fetch` function, which is verify specific to Nuxt.js, is called when the page is loading: the content is not displayed until this function is resolved.

Well done!

![Dishes List](./deliveroo-nuxt/part-three-dishes-lists.png)

## Create Dishes

Congratulations, you successfully displayed the list of `Restaurants`! This was the first major step. The next step is to create dishes that go with the `Restaurants`. Your Strapi project needs to be running.

- **Note:** If Strapi is not running, you can restart it witheither of the following commands: `yarn develop` or `npm run develop`

### Define Content Type - Dishes

Every restaurant sells _Dishes_, which also must be stored in the database. So, you now need to create a new Content Type named `dish`.

- Navigate to the Content Type Builder [Content Type Builder](http://localhost:1337/admin/plugins/content-type-builder) or in the left-hand menu under **PLUGINS**, **Content Type Builder**:
- Click on the `+ Add Content Type` button
- Set `dish` as name and press `save`
- Create the followings fields:
  - Add a **String** field, call it `name`
  - Add a **Text** field, call it`description` and in the **Advanced Settings** tab, select `Display as a WYSIWYG`)
  - add a **Media** field, call it `image`
  - add a **Number** field, call it `price`, and then select **Number format** from dropdown, and make it `decimal(ex. 2.22)`.
  - add a **Relation** field: Your purpose here is to tell Strapi that every `dish` can be related to a `restaurant`. To do so, create a **one-to-many** relation, as below:
    - In the right menu dropdown, change from `Permission` to `Restaurant`
    - Click on the `many to one` icon (_Restaurant has many Dishes_). See image below.
- Click on the `Save` button for the **field types**, and then again click the `Save` button to save the new **Restaurant Content Type**.

![Strapi relation](https://blog.strapi.io/content/images/2018/07/Screen-Shot-2018-07-02-at-17.27.19.png)

You `dish` Content Type should look like this:

![Dishes fields](./deliveroo-nuxt/dish-content-type.png)

Don't forget to allow access in the _Roles & Permissions_ section:

- (**Public**) Navigate to the `Roles & Permissions` section of the admin plugin [http://localhost:1337/admin/plugins/users-permissions](http://localhost:1337/admin/plugins/users-permissions)

  - Click on the `Public` role
  - Check the `find` and `findone` checkboxes of the `Dish` section
  - Save

- (**Authenticated**) Navigate to the `Roles & Permissions` section of the admin plugin [http://localhost:1337/admin/plugins/users-permissions](http://localhost:1337/admin/plugins/users-permissions)
  - Click on the `Authenticated` role
  - Check the `find` and `findone` checkboxes of the `Dish` section
  - Save

### Add some Dishes entries

- Click on `Dishes` in the left navbar
- Click on the `Add new Dish` button and add some dishes. Make sure they all have an image and are linked to a restaurant

### Display dishes

Go back to the `./frontend` code. The steps are pretty similar to the restaurants list.

- Create a file called `./store/dishes.js` and copy/paste the following code:

`Path: ./deliveroo-clone-tutorial/frontend/store/dishes.js`

```js
export const state = () => ({
  list: [],
});

export const mutations = {
  add(state, dish) {
    state.list.push(dish);
  },
  emptyList(state) {
    state.list = [];
  },
};

export const getters = {
  list: state => {
    return state.list;
  },
};
```

- Create a `restaurants` folder in `./pages` folder
- Create a file called `_id.vue` and copy/paste the following code:

`./pages/restaurants/_id.vue`

```js
<template>
  <section class="container">
    <div>
      <h1 class="mt-2">Dishes</h1>
      <div class="row">
        <div class="col-md-8">
          <div class="card-columns">
            <div v-for="dish in dishes" :key="dish.id" class="card">
              <img :src="dish.image.url" class="card-img-top" alt="Card image cap">
              <div class="card-body">
                <h5 class="card-title">{{ dish.name }}</h5>
                <p class="card-text">{{ dish.description || 'No description provided.' }}</p>
                <p class="card-text">${{ dish.price }}</p>
                <button class="btn btn-primary">Add to cart</button>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">Cart</h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import Strapi from 'strapi-sdk-javascript/build/main'
const apiUrl = process.env.API_URL || 'http://localhost:1337'
const strapi = new Strapi(apiUrl)

export default {
  computed: {
    id() {
      return this.$route.params.id
    },
    dishes() {
      return this.$store.getters['dishes/list']
    }
  },
  async fetch({ store, params }) {
    store.commit('dishes/emptyList')
    const response = await strapi.request('post', '/graphql', {
      data: {
        query: `query {
            restaurant(id: "${params.id}") {
              id
              name
              dishes {
                id
                name
                description
                price
                image {
                  url
                }
              }
            }
          }
          `
      }
    })

    response.data.restaurant.dishes.forEach(dish => {
      dish.image.url = `${apiUrl}${dish.image.url}`
      store.commit('dishes/add', {
        id: dish.id,
        ...dish
      })
    })
  }
}
</script>
```

- Restart your Nuxt.js application, using `npm run dev`.

The dishes page should be accessible from [http://localhost:3000/restaurants/1](http://localhost:3000/restaurants/1) where `1` is the id of the restaurant. Nuxt.js creates urls according to the name of the files located in `pages`.

![Dishes list](./deliveroo-nuxt/dishes-display.gif)

Nothing particular here: exactly like for the restaurants, you defined a template and then added the logic in the script section.

![Dishes List](./deliveroo-nuxt/part-four-authentication.png)

## Authentication

At this point, you may have expected to get ready to order. But before that, you need to give the user the possibility to register and login to your app. No worries, Strapi comes to the rescue with its Users & Permissions plugin already installed in your project.

### Auth store

You have to install `js-cookie`:

- Go into your `./frontend` folder
- Install `js-cookie` with the following command:

`Path: ./deliveroo-clone-tutorial/frontend/`

```bash

yarn add js-cookie

# OR

npm i js-cookie
```

- Create a file called `auth.js` in the `store` folder and copy/paste the following code:

`store/auth.js`

```js
import Cookies from 'js-cookie';

export const state = () => {};

export const mutations = {
  setUser(state, user) {
    state.user = user;
    Cookies.set('user', user);
  },
};
```

**Why cookies? 🍪**

Nothing related to this food tutorial...

Most of the time, progressive web apps store a JSON Web Token (JWT) in the local storage. That works pretty well, and this is what the Strapi JavaScript SDK does by default (it also stores it as a cookie).

The fact is that you would like to display the `Username` in the header (coming later in this tutorial). So you need to store the `Username` somewhere.

You could have stored it in the local storage, but since Nuxt.js supports _server-side rendering_, which does not have access to the local storage, you need to store it in the browser cookies.

### Register

- Create a new file named `signup.vue` in the `./pages` directory, and copy/past the following content:

`Path: ./deliveroo-clone-tutorial/frontend/pages/signup.vue`

```js
<template>
  <section class="container">
    <div class="col-md-6 offset-md-3 mt-3">
      <form autocomplete="off" @submit.stop.prevent="handleSubmit">
        <div class="form-group">
          <label for="username">Username</label>
          <b-form-input
            id="username"
            v-model="username"
            type="text"
            placeholder="Enter your username"
            required/>
        </div>
        <div class="form-group">
          <label for="email">Email</label>
          <b-form-input
            id="email"
            v-model="email"
            type="email"
            placeholder="Enter your email"
            required/>
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <b-form-input
            id="password"
            v-model="password"
            label="password"
            type="password"
            class="form-control"
            placeholder="Enter your password"
            required/>
        </div>
        <button :disabled="loading" type="submit" class="btn btn-primary btn-block mt-3">Submit</button>
        <p class="text-center mt-3">
          Already have an account?
          <router-link :to="{ name: 'signin'}" tag="a">
            Login
          </router-link>
        </p>
      </form>
    </div>
  </section>
</template>

<script>
import Strapi from 'strapi-sdk-javascript/build/main'
const apiUrl = process.env.API_URL || 'http://localhost:1337'
const strapi = new Strapi(apiUrl)
import { mapMutations } from 'vuex'

export default {
  data() {
    return {
      email: '',
      password: '',
      username: '',
      loading: false
    }
  },
  methods: {
    async handleSubmit() {
      try {
        this.loading = true
        const response = await strapi.register(
          this.username,
          this.email,
          this.password
        )
        this.loading = false
        this.setUser(response.user)
        this.$router.push('/')
      } catch (err) {
        this.loading = false
        alert(err.message || 'An error occurred.')
      }
    },
    ...mapMutations({
      setUser: 'auth/setUser'
    })
  }
}
</script>

```

In this page, you insert a form which has three inputs: **username**, **email** and **address**. You also defined a method named `handleSubmit` which uses the Strapi SDK to register the front-end `User` before redirecting them back to the home page.

- Restart the frontend, use `npm run dev`
- Create a new front-end `User` from this new page: [http://localhost:3000/signup](http://localhost:3000/signup).
- Navigate to the **Users** menu item from the left-hand menu in the Strapi Dashboard to see your new front-end `User.`

### Logout

The user must be able to **Logout**, ideally from a button in the header.

- Add a `logout` mutation and a `username` setter in the `auth` store. Copy/paste the following code to replace the code in `./store/auth.js`:

`Path: ./deliveroo-clone-tutorial/frontend/store/auth.js`

```js
import Cookies from 'js-cookie';

export const state = () => {};

export const mutations = {
  setUser(state, user) {
    state.user = user;
    Cookies.set('user', user);
  },
  logout(state) {
    state.user = null;
    Cookies.set('user', null);
  },
};

export const getters = {
  username: state => {
    return state.user && state.user.username;
  },
};
```

- Modify the `Header.vue`. Copy/paste the following code to replace the code in `./components/Header.vue`:

`Path: ./deliveroo-clone-tutorial/frontend/components/Header.vue`

```js
<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container">
      <router-link tag="a" class="navbar-brand" to="/" exact>Deliveroo clone</router-link>
      <div class="collapse navbar-collapse justify-content-end">
        <ul class="navbar-nav">
          <li v-if="username">
            <a href="#" class="nav-link">
              Hello {{ username }}
            </a>
          </li>
          <li v-if="username">
            <a href="#" class="nav-link" @click="logout">
              Logout
            </a>
          </li>
          <li v-if="!username">
            <router-link v-if="!username" tag="a" class="nav-link" to="/signin" exact>
              Signin
            </router-link>
          </li>
          <li v-if="!username">
            <router-link v-if="!username" tag="a" class="nav-link" to="/signup" exact>
              Signup
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  computed: {
    username() {
      return this.$store.getters['auth/username']
    }
  },
  methods: {
    ...mapMutations({
      logout: 'auth/logout'
    })
  }
}
</script>
```

Try to reload the page and you will see that no changes have been made: You still see the `signin` and `signup` links although you registered a user a few minutes ago. This happens because you did not use the `auth/setUser` mutation on the load page. Since Nuxt.js is rendered server side, you need to do a little trick using the `nuxtServerInit` action which is invoked when the Nuxt.js server starts:

- Install `cookieparser`:

`Path: ./deliveroo-clone-tutorial/frontend`

```bash
yarn add cookieparser

# OR

npm install cookieparser
```

- Create an `index.js` file in the `store` folder and copy/paste the following code:

`Path: ./deliveroo-clone-tutorial/frontend/store/index.js`

```js
import cookieparser from 'cookieparser';

export const actions = {
  nuxtServerInit({ commit }, { req }) {
    let user = null;
    if (req && req.headers && req.headers.cookie) {
      const parsed = cookieparser.parse(req.headers.cookie);
      user = (parsed.user && JSON.parse(parsed.user)) || null;
    }

    commit('auth/setUser', user);
  },
};
```

### Login

- Create a `signin.vue` in the `pages` folder and copy/paste the following code

`Path: ./deliveroo-clone-tutorial/frontend/pages/signin.vue`

```js
<template>
  <section class="container">
    <div class="col-md-6 offset-md-3 mt-3">
      <form autocomplete="off" @submit.stop.prevent="handleSubmit">
        <div class="form-group">
          <label for="email">Email</label>
          <b-form-input
            id="email"
            v-model="email"
            type="email"
            autofocus="true"
            placeholder="Enter your email"
            required/>
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <b-form-input
            id="password"
            v-model="password"
            label="password"
            type="password"
            class="form-control"
            autofocus="true"
            placeholder="Enter your password"
            required/>
        </div>
        <button :disabled="loading" type="submit" class="btn btn-primary btn-block mt-3">Submit</button>
        <p class="text-center mt-3">
          No account yet
          <router-link :to="{ name: 'signup'}" tag="a">
            Register
          </router-link>
        </p>
      </form>
    </div>
  </section>
</template>

<script>
import Strapi from 'strapi-sdk-javascript/build/main'
const apiUrl = process.env.API_URL || 'http://localhost:1337'
const strapi = new Strapi(apiUrl)
import { mapMutations } from 'vuex'

export default {
  data() {
    return {
      email: '',
      password: '',
      loading: false
    }
  },
  methods: {
    async handleSubmit() {
      try {
        this.loading = true
        const response = await strapi.login(this.email, this.password)
        this.loading = false
        this.setUser(response.user)
        this.$router.go(-1)
      } catch (err) {
        this.loading = false
        alert(err.message || 'An error occurred.')
      }
    },
    ...mapMutations({
      setUser: 'auth/setUser'
    })
  }
}
</script>
```

- Restart your Nuxt.js app with `npm run dev`.
- Login into your app with the _front-end_ `User` you created earlier. [http://localhost:3000/signin](http://localhost:3000/signin).

**Note:** You will be redirected back to the last page you visited when you sign in.

![Authentication](./deliveroo-nuxt/authentication-login.gif)

That's it for the authentication!

![Authentication](./deliveroo-nuxt/part-five-shopping-cart.png)

## Shopping cart

All of these dishes look so tasty! What if you could add some of them to a shopping cart?

- Create a new file named `cart.js` and copy/paste the following code:

`Path: ./deliveroo-clone-tutorial/frontend/store/cart.js`

```js
import Cookies from 'js-cookie';

export const state = () => ({
  items: [],
});

export const mutations = {
  setItems(state, items) {
    state.items = items;
  },
  add(state, item) {
    const record = state.items.find(i => i.id === item.id);

    if (!record) {
      state.items.push({
        quantity: 1,
        ...item,
      });
    } else {
      record.quantity++;
    }
    Cookies.set('cart', state.items);
  },
  remove(state, item) {
    const record = state.items.find(i => i.id === item.id);

    if (record.quantity > 1) {
      record.quantity--;
    } else {
      const index = state.items.findIndex(i => i.id === item.id);
      state.items.splice(index, 1);
    }
    Cookies.set('cart', state.items);
  },
  emptyList(state) {
    state.items = [];
    Cookies.set('cart', state.items);
  },
};

export const getters = {
  items: state => {
    return state.items;
  },
  price: state => {
    return state.items.reduce(
      (accumulator, item) => accumulator + item.price * item.quantity,
      0
    );
  },
  numberOfItems: state => {
    return state.items.reduce(
      (accumulator, item) => accumulator + item.quantity,
      0
    );
  },
};
```

To make sure the items stay in the cart even after page reload, you will use cookies. So you need to update the `nuxtInitServer` function:

- Update the `index.js` file. Copy/paste the following code to replace the existing code in `index.js`:

`Path: ./deliveroo-clone-tutorial/frontend/store/index.js`

```js
import cookieparser from 'cookieparser';

export const actions = {
  nuxtServerInit({ commit }, { req }) {
    let user = null;
    let cart = [];
    if (req && req.headers && req.headers.cookie) {
      const parsed = cookieparser.parse(req.headers.cookie);
      user = (parsed.user && JSON.parse(parsed.user)) || null;
      cart = (parsed.cart && JSON.parse(parsed.cart)) || [];
    }

    commit('auth/setUser', user);
    commit('cart/setItems', cart);
  },
};
```

- Update the `_id.vue` file. Copy/paste the following code to replace the existing code in `_id.vue`:

`Path: ./deliveroo-clone-tutorial/frontend/pages/restaurants/_id.vue`

```js
<template>
  <section class="container">
    <div>
      <h1 class="mt-2">Dishes</h1>
      <div class="row">
        <div class="col-md-8">
          <div class="cart-columns">
            <div v-for="dish in dishes" :key="dish.id" class="card">
              <img :src="dish.image.url" class="card-img-top">
              <div class="card-body">
                <h5 class="card-title">{{ dish.name }}</h5>
                <p class="card-text">{{ dish.description || 'No description provided.' }}</p>
                <p class="card-text">${{ dish.price }}</p>
                <button class="btn btn-primary" @click="addToCart(dish)">Add to cart</button>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">Cart</h5>
              <p class="card-text">{{ numberOfItems }} items selected:</p>
              <ul>
                <li v-for="dish in selectedDishes" :key="dish.id" class="card-text mb-2">
                  Name: {{ dish.name }} (${{ dish.price }}) ({{ dish.quantity }})
                  <button class="btn btn-sm btn-success" @click="addToCart(dish)">+</button>
                  <button class="btn btn-sm btn-warning ml-2" @click="removeFromCart(dish)">-</button>
                </li>
              </ul>
              <h5 class="card-text">
                Total: ${{ price }}
              </h5>
              <p v-if="!selectedDishes.length">Please select some items.</p>
              <button :disabled="!selectedDishes.length" class="btn btn-primary">Order</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import Strapi from 'strapi-sdk-javascript/build/main'
const apiUrl = process.env.API_URL || 'http://localhost:1337'
const strapi = new Strapi(apiUrl)
import { mapMutations } from 'vuex'

export default {
  data() {
    return {
      complete: false
    }
  },
  computed: {
    id() {
      return this.$route.params.id
    },
    dishes() {
      return this.$store.getters['dishes/list']
    },
    selectedDishes() {
      return this.$store.getters['cart/items']
    },
    price() {
      return this.$store.getters['cart/price']
    },
    numberOfItems() {
      return this.$store.getters['cart/numberOfItems']
    }
  },
  async fetch({ store, params }) {
    store.commit('dishes/emptyList')
    const response = await strapi.request('post', '/graphql', {
      data: {
        query: `query {
            restaurant(id: "${params.id}") {
              id
              name
              dishes {
                id
                name
                description
                price
                image {
                  url
                }
              }
            }
          }
          `
      }
    })
    response.data.restaurant.dishes.forEach(dish => {
      dish.image.url = `${apiUrl}${dish.image.url}`
      store.commit('dishes/add', {
        id: dish.id,
        ...dish
      })
    })
  },
  methods: {
    ...mapMutations({
      addToCart: 'cart/add',
      removeFromCart: 'cart/remove',
      emptyCart: 'cart/emptyList'
    })
  }
}
</script>
```

Good job! You can now add dishes to your cart, check it out!

![Shopping cart](./deliveroo-nuxt/shopping-cart.gif)

You are now ready to continue to the next section.

![Order and Checkout](./deliveroo-nuxt/part-six-checkout.png)

## Order and Checkout

You must be start being starving by now... I am sure you want to be able to order!

### Define Content Type

A `Restaurant` needs to store an `order` to your database. Therefore, you will need to create a new **Content Type** called `order`:

- Navigate to the Content Type Builder [Content Type Builder](http://localhost:1337/admin/plugins/content-type-builder) or in the left-hand menu under **PLUGINS**, **Content Type Builder**:
- Click on the `+ Add Content Type` button
- Set `order` as **name** and press `save`
- Create the followings fields:
  - Add a **String** field, call it `address`
  - Add a **String** field, call it `postalCode`
  - Add a **String** field, call it `city`
  - Add a **JSON** field, call it `dishes`
  - Add a **Number** field, call it `amount`, and select `decimal (ex. 2.22)` from the **Number Format** dropdown.
  - add a **Relation** field: Your purpose here is to tell Strapi that every front-end `User` can be related to an `order`. To do so, create a **many to one** relation, as below:
    - In the right menu dropdown, change from `Dish` to `User`
    - Click on the `many to one` icon (_User has many Orders_). See image below.
- Click on the `Save` button for the **field types**, and then again click the `Save` button to save the new **Restaurant Content Type**.

![Order Relation Type](./deliveroo-nuxt/order-relations.png)

![Order Content Type](./deliveroo-nuxt/order-content-type.png)

### Allow access

To create new orders from the `frontend`, you are going to access the `create` endpoint of the `order` API.

- To allow access, navigate to the **Roles & Permissions** section [http://localhost:1337/admin/plugins/users-permissions](http://localhost:1337/admin/plugins/users-permissions), select the `authenticated` role, find the `Order` Content Type, and check the `create` checkbox
- the clock the `Save` button.

### Stripe setup

In this section you will need Stripe API keys.

- Create a Stripe account and navigate to [https://dashboard.stripe.com/test/apikeys](https://dashboard.stripe.com/test/apikeys). You can find the page under `Developers -> API Keys` in the Stripe dashboard.

There are two keys that you need from this page:

- Note and save the `Publishable key`
- Note and save the `Secret key`

These should be `test` tokens. In a real production application, you would **not** hard code these values as you are about to do below.

### Add logic

If you have already used Stripe, you may know that the credit card information does not go through your backend server. Instead, the information is directly sent to the Stripe API (ideally using their SDK). Then, your `frontend` (Nuxt.js App) receives a token. The `id` of the token must be sent to your `backend` (Strapi) which will create the Stripe charge.

- Install the `stripe` package in the `backend` by running.

`Path: ./deliveroo-clone-tutorial/backend/`

```bash

yarn add stripe

# OR

npm install stripe
```

In order to integrate the Stripe logic, you need to update the `create` (new charge) endpoint in your Strapi API.

- Open your code editor and update `./backend/api/order/controllers/Order.js` and replace its content with the below code. **NOTE:** Your need to copy/paste your **Secret Key** from Stripe on Line 3.

`Path: ./deliveroo-clone-tutorial/backend/api/order/controllers/Order.js`

```js
'use strict';
const stripe = require('stripe')('sk_test_YOUR KEY HERE');

module.exports = {
  create: async ctx => {
    const {
      address,
      amount,
      dishes,
      postalCode,
      token,
      city,
    } = ctx.request.body;

    // Charge the customer
    try {
      await stripe.charges.create({
        // Transform cents to dollars.
        amount: amount * 100,
        currency: 'usd',
        description: `Order ${new Date()} by ${ctx.state.user.id}`,
        source: token,
      });

      // Register the order in the database
      try {
        const order = await strapi.services.order.create({
          user: ctx.state.user.id,
          address,
          amount,
          dishes,
          postalCode,
          city,
        });

        return order;
      } catch (err) {
        // Silent
      }
    } catch (err) {
      // Silent
    }
  },
};
```

**Note:** In a real-world example, the amount should be checked on the backend side and the list of dishes related to the command should be stored in a more specific Content Type called `orderDetail`.

- Restart the Strapi frontend with `yarn develop` or `npm run devlelop`.

Now you will switch the the `frontend` and install the `vue-stripe-elements-plus` package to enable the logic on the `frontend`.

- Install the `vue-stripe-elements-plus` package in `frontend` folder to make it work:

`Path: ./deliveroo-clone-tutorial/frontend/`

```bash
yarn add vue-stripe-elements-plus

# OR

npm i vue-stripe-elements-plus
```

**Stripe Object**

You will add the complete `object` below:

```
    script: [
      { src: 'https://js.stripe.com/v3' }
    ],
```

- Add the Stripe script in the Nuxt.js config.

`Path: ./deliveroo-clone-tutorial/frontend/nuxt.config.js`

```js
module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    //...
    ,  // Make sure to add this comma after the "link:" object
    script: [
      { src: 'https://js.stripe.com/v3' }
    ]
  },

  // ...
}
```

### Checkout page

In `./pages/restaurants/_id.vue`, you will add the click handler `@click="goToCheckout"` to the Order button and then add the `goToCheckout` method

This is the method below has to be added in the `_id.vue` file

```
goToCheckout() {
  // Redirect to signin page if not logged in.
  const isConnected = this.$store.getters['auth/username']
  if (!isConnected) {
    this.$router.push('/signin')
    return
  }
  this.$router.push('/checkout')
},

```

- Open the `./pages/restaurants/_id.vue` file and now copy/paste the following code to replace the existing code in the file. (Doing this will add the above method.) You will get this result:

`Path: ./deliveroo-clone-tutorial/frontend/pages/restaurants/_id.vue`

```js
<template>
  <section class="container">
    <div>
      <h1 class="mt-2">Dishes</h1>
      <div class="row">
        <div class="col-md-8">
          <div class="cart-columns">
            <div v-for="dish in dishes" :key="dish.id" class="card">
              <img :src="dish.image.url" class="card-img-top">
              <div class="card-body">
                <h5 class="card-title">{{ dish.name }}</h5>
                <p class="card-text">{{ dish.description || 'No description provided.' }}</p>
                <p class="card-text">${{ dish.price }}</p>
                <button class="btn btn-primary" @click="addToCart(dish)">Add to cart</button>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">Card</h5>
              <p class="card-text">{{ numberOfItems }} items selected:</p>
              <ul>
                <li v-for="dish in selectedDishes" :key="dish.id" class="card-text mb-2">
                  Name: {{ dish.name }} (${{ dish.price }}) ({{ dish.quantity }})
                  <button class="btn btn-sm btn-success" @click="addToCart(dish)">+</button>
                  <button class="btn btn-sm btn-warning ml-2" @click="removeFromCart(dish)">-</button>
                </li>
              </ul>
              <h5 class="card-text">
                Total: ${{ price }}
              </h5>
              <p v-if="!selectedDishes.length">Please select some items.</p>
              <button :disabled="!selectedDishes.length" @click="goToCheckout" class="btn btn-primary">Order</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import Strapi from 'strapi-sdk-javascript/build/main'
const apiUrl = process.env.API_URL || 'http://localhost:1337'
const strapi = new Strapi(apiUrl)
import { mapMutations } from 'vuex'

export default {
  data() {
    return {
      complete: false
    }
  },
  computed: {
    id() {
      return this.$route.params.id
    },
    dishes() {
      return this.$store.getters['dishes/list']
    },
    selectedDishes() {
      return this.$store.getters['cart/items']
    },
    price() {
      return this.$store.getters['cart/price']
    },
    numberOfItems() {
      return this.$store.getters['cart/numberOfItems']
    }
  },
  async fetch({ store, params }) {
    store.commit('dishes/emptyList')
    const response = await strapi.request('post', '/graphql', {
      data: {
        query: `query {
            restaurant(id: "${params.id}") {
              id
              name
              dishes {
                id
                name
                description
                price
                image {
                  url
                }
              }
            }
          }
          `
      }
    })
    response.data.restaurant.dishes.forEach(dish => {
      dish.image.url = `${apiUrl}${dish.image.url}`
      store.commit('dishes/add', {
        id: dish.id,
        ...dish
      })
    })
  },
  methods: {
    ...mapMutations({
      addToCart: 'cart/add',
      removeFromCart: 'cart/remove',
      emptyCart: 'cart/emptyList'
    }),
    goToCheckout() {
      // Redirect to signin page if not logged in.
      const isConnected = this.$store.getters['auth/username']
      if (!isConnected) {
        this.$router.push('/signin')
        return
      }
      this.$router.push('/checkout')
    },
  }
}
</script>

```

- Create a new `./pages/checkout.vue` file and copy/paste the following code. You will need to input your **pk_test** Publishable Stripe key on line 62:

`Path: ./deliveroo-clone-tutorial/frontend/pages/checkout.vue`

```js
<template>
  <section class="container">
    <div>
      <h1 class="mt-2">Checkout</h1>
      <div class="row">
        <div class="col-md-6 offset-md-3 mt-3">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">Cart</h5>
              <p class="card-text">{{ numberOfItems }} items selected:</p>
              <ul>
                <li v-for="dish in selectedDishes" :key="dish.id" class="card-text mb-2">
                  Name: {{ dish.name }} (${{ dish.price }}) ({{ dish.quantity }})
                  <button class="btn btn-sm btn-success" @click="addToCart(dish)">+</button>
                  <button class="btn btn-sm btn-warning ml-2" @click="removeFromCart(dish)">-</button>
                </li>
              </ul>
              <h5 class="card-text">
                Total: ${{ price }}
              </h5>
              <p v-if="!selectedDishes.length">Please select some items.</p>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-6 offset-md-3 mt-3">
          <form autocomplete="off" @submit.stop.prevent="handleSubmit">
            <div class="form-group">
              <label for="address">Address</label>
              <b-form-input
                id="address"
                v-model="address"
                type="text"
                placeholder="Enter your address"
                required/>
            </div>
            <div class="form-group">
              <label for="postalCode">Postal Code</label>
              <b-form-input
                id="postalCode"
                v-model="postalCode"
                type="text"
                placeholder="Enter your postal code"
                required/>
            </div>
            <div class="form-group">
              <label for="city">City</label>
              <b-form-input
                id="city"
                v-model="city"
                type="text"
                placeholder="Enter your city"
                required/>
            </div>
            <div class="form-group">
              <label for="card">Cart</label>
              <card
                class="form-control"
                stripe="pk_test_YOUR PUBLISHABLE KEY"
              />
            </div>
            <button :disabled="loading" type="submit" class="btn btn-primary btn-block mt-3">Submit</button>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { Card, createToken } from 'vue-stripe-elements-plus'
import { mapMutations } from 'vuex'
import Strapi from 'strapi-sdk-javascript/build/main'
const apiUrl = process.env.API_URL || 'http://localhost:1337'
const strapi = new Strapi(apiUrl)

export default {
  components: {
    Card
  },
  data() {
    return {
      address: '',
      postalCode: '',
      city: '',
      loading: false
    }
  },
  computed: {
    id() {
      return this.$route.params.id
    },
    dishes() {
      return this.$store.getters['dishes/list']
    },
    selectedDishes() {
      return this.$store.getters['cart/items']
    },
    price() {
      return this.$store.getters['cart/price']
    },
    numberOfItems() {
      return this.$store.getters['cart/numberOfItems']
    }
  },
  methods: {
    async handleSubmit() {
      this.loading = true
      let token
      try {
        const response = await createToken()
        token = response.token.id
      } catch (err) {
        alert('An error occurred.')
        this.loading = false
        return
      }

      try {
        await strapi.createEntry('orders', {
          amount: this.$store.getters['cart/price'],
          dishes: this.$store.getters['cart/items'],
          address: this.address,
          postalCode: this.postalCode,
          city: this.city,
          token
        })
        alert('Your order have been successfully submitted.')
        this.emptyCart()
        this.$router.push('/')
      } catch (err) {
        this.loading = false
        alert('An error occurred.')
      }
    },
    ...mapMutations({
      addToCart: 'cart/add',
      removeFromCart: 'cart/remove',
      emptyCart: 'cart/emptyList'
    })
  }
}
</script>
```

**Explanation 🕵️**

In this page, you display a form to get the front-end `User's` address and debit card information. You use the [Stripe Elements](https://stripe.com/elements) system. When the form is submitted, you get a token from Stripe. Then, you create the order in your Strapi API.

You are now able to let front-end `Users` submit their `orders`.

This page from **Stripe**, provides the [Stripe Testing Credit Card Info](https://stripe.com/docs/testing)

Try it out!

- You can test out the order processing by filling the cart up with an `order` item.
- Enter the address and credit card information **for testing purposes**
  - Credit Card #: `4242 4242 4242 4242`
  - Date: `04/24`
  - 3 Digit Code: `242`
  - Zip Code: `42424`
- You can log back into your [Stripe Account](https://dashboard.stripe.com/login), and navigate to **Payments** in the left-hand menu to see your accepted test payments.
- You can navigate in the **Strapi Dashboard** to the **Orders** menu item to see the successful orders and related information.

Bon appétit! 🇫🇷

![Order](./deliveroo-nuxt/stripe-order.gif)

You are now ready to continue to the final part of this tutorial, deployment.

![Deployment](./deliveroo-nuxt/part-seven-deployment.png)

This last part will deploy both the Strapi `backend` and the Nuxt.js `front-end`. Your Strapi project will be deployed to [Heroku](https://www.heroku.com/). Your Nuxt.js app will be deployed to [Netlify](https://www.netlify.com/).

## Deploy Backend on Heroku

Please complete the following steps to deploy your Strapi `backend` to Heroku.

### Heroku Install Requirements

You must have [Git installed and set-up locally](https://git-scm.com/book/en/v2/Getting-Started-First-Time-Git-Setup).
You must have a [free Heroku account](https://signup.heroku.com/) before doing these steps.

- If you already have the Heroku CLI installed locally on your computer. Skip to [Login to Heroku](#login-to-heroku-from-your-cli).

### Heroku CLI Installation

Download and install the `Heroku CLI` for your operating system:

:::: tabs cache-lifetime="10" :options="{ useUrlFragment: false }"

::: tab "macOS"

- [Download the installer](https://cli-assets.heroku.com/heroku.pkg)

Also available via Homebrew:

```bash
brew tap heroku/brew && brew install heroku
```

:::

::: tab "Ubuntu"

- Run the following from your terminal:

```bash
sudo snap install --classic heroku
```

:::

::: tab "Windows"

- Download the appropriate installer for your Windows installation:

[64-bit installer](https://cli-assets.heroku.com/heroku-x64.exe)
[32-bit installer](https://cli-assets.heroku.com/heroku-x86.exe)
:::

::::

### Login to Heroku from your CLI

- Next, you need to login to Heroku from your computer.

```bash
heroku login
```

Follow the instructions and return to your command line.

### Update `.gitignore`

- Add the following line at end of `.gitignore`:

`Path: ./backend/.gitignore`

```
package-lock.json
```

Even if it is usually recommended to version this file, it may create issues on Heroku.

### Init a Git repository and commit your project

- Init the Git repository and commit your project.

`Path: ./backend/`

```bash
git init
git add .
git commit -m "Initial Commit"
```

### Create a Heroku project

- Create a new Heroku project.

`Path: ./backend/`

```bash
heroku create
```

(You can use `heroku create custom-project-name`, to have Heroku create a `custom-project-name.heroku.com` URL. Otherwise, Heroku will automatically generate a random project name (and URL) for you.)

Your local development environment is now set-up and configured to work with Heroku. You have a new Strapi project and a new Heroku app ready to be configured to work with a database and with each other.

### Heroku Database set-up

Below you will find database options when working with Heroku. These instructions below will install your project using a **PostgreSQL** database. If you did not use `--quickstart` when you created your Strapi project, but used a **MongoDB** database, please follow these [MongoDB Database Installation](../guides/deployment.html#heroku-mongodb) instructions.

#### Heroku Postgres

Follow these steps to deploy your Strapi app to Heroku using **PostgreSQL**:

- Install the [Heroku Postgres addon](https://elements.heroku.com/addons/heroku-postgresql) for using Postgres

To make things even easier, Heroku provides a powerful addon system. In this section, you are going to use the Heroku Postgres addon, which provides a free "Hobby Dev" plan. If you plan to deploy your app in production, it is highly recommended switching to a paid plan.

`Path: ./backend/`

```bash
heroku addons:create heroku-postgresql:hobby-dev
```

- Retrieve database credentials

The add-on automatically exposes the database credentials into a single environment variable accessible by your app. To retrieve it, type:

`Path: ./backend/`

```bash
heroku config
```

This should print something like this: `DATABASE_URL: postgres://ebitxebvixeeqd:dc59b16dedb3a1eef84d4999sb4baf@ec2-50-37-231-192.compute-2.amazonaws.com: 5432/d516fp1u21ph7b`.

(This url is read like so: \*postgres:// **USERNAME** : **PASSWORD** @ **HOST** : **PORT** : **DATABASE_NAME\***)

- Set environment variables

Strapi expects a variable for each database connection configuration (host, username, etc.). So, from the url above, you have to set several environment variables in the Heroku config:

```bash
heroku config:set DATABASE_USERNAME=ebitxebvixeeqd
heroku config:set DATABASE_PASSWORD=dc59b16dedb3a1eef84d4999a0be041bd419c474cd4a0973efc7c9339afb4baf
heroku config:set DATABASE_HOST=ec2-50-37-231-192.compute-2.amazonaws.com
heroku config:set DATABASE_PORT=5432
heroku config:set DATABASE_NAME=d516fp1u21ph7b
```

**Note:** Please replace these above values with your actual values.

- Update your database config file

Replace the contents of `database.json` with the following:

`Path: ./config/environments/production/database.json`.

```json
{
  "defaultConnection": "default",
  "connections": {
    "default": {
      "connector": "strapi-hook-bookshelf",
      "settings": {
        "client": "postgres",
        "host": "${process.env.DATABASE_HOST}",
        "port": "${process.env.DATABASE_PORT}",
        "database": "${process.env.DATABASE_NAME}",
        "username": "${process.env.DATABASE_USERNAME}",
        "password": "${process.env.DATABASE_PASSWORD}",
        "ssl": true
      },
      "options": {}
    }
  }
}
```

- Install the `pg` node module

Unless you originally installed Strapi with PostgreSQL, you need to install the [pg](https://www.npmjs.com/package/pg) node module.

`Path: ./backend/`

```bash
npm install pg --save
```

- Commit your changes

`Path: ./backend/`

```bash
git add .
git commit -m "Update database config"
```

- Deploy

`Path: ./backend/`

```bash
git push heroku master
```

The deployment may take a few minutes. At the end, logs will display the url of your project (e.g. `https://mighty-taiga-80884.herokuapp.com`). You can also open your project using the command line:

`Path: ./backend/`

```bash
heroku open
```

If you see the **Strapi Welcome** page, you have correctly set-up, configured and deployed your Strapi project on Heroku. You will now need to set-up your new `Administrator` user as the production database is brand-new (and empty).

After you create a new **Administrator** user and login. You will notice that your Content Types are all there. You should see **Dishes**, **Orders**, **Restaurants** and **Users** in the menu. You have a new empty database so there is no data. Also, Strapi saves a few settings in the database and so you will need to restore those settings.

You only have to restore these settings the first time you deploy to production, unless you modify additional settings in Development. You would just need to modify the additional settings in that case in Production.

- Restore the **WYSIWYG** Editor in your Content Types.
  - Click on the `Content Manager`
  - Click on the `Dish` Content Type
  - Click the Edit View (Settings) tab
  - Under **LAYOUT - Displayed Fields**, click and highlight the `description` field
  - Scroll down and toggle `on` for **Display as WYSIWYG**
  - Click the `Save` button and `Confirm`
- Navigate back to the `Content Manager` and repeat the stgeps above for `Restaurant`

Now you will need to restore the API Permissions for each of your content types:

- Navigate to **Roles and Permissions** from the left-hand menu

  - Click on **Authenticated**
  - Scroll down and find **Order**, **Dish** and **Restaurant**. Check the following boxes:
    - **Order:** `create`
    - **Dish:** `find`, `findone`
    - **Restaurant:** `find`, `findone`
  - Then click `Save` to return to **Roles and Permissions**.

  - Next, click on **Public**
  - Scroll down and find **Order**, **Dish** and **Restaurant**. Check the following boxes:
    - **Restaurant:** `find`, `findone`
    - **Dish:** `find`, `findone`
    - **Order:** `create`
    - Then click `Save` to return to **Roles and Permissions**.

### Configure and Install Cloudinary for images

Heroku does not persist local storage. Which means that uploaded files to the Heroku Servers are saved in cache and expire approximately 30 minutes after the last use of the app. You are going to want to keep your images persistent. Therefore, these instuctions below will install and configure [Cloudinary](https://cloudinary.com/) to host your images using their generous free plan.

- First, create a [free Cloudinary Account](https://cloudinary.com/signup)
- Install the `strapi-provider-upload-cloudinary` plugin into your Strapi `backend`

`Path: ./backend`

```bash
yarn add strapi-provider-upload-cloudinary

# OR

npm run strapi install strapi-provider-upload-cloudinary

```

- Commit and push your changes to Heroku

`Path: ./backend`

```bash
git add .
git commit -m "Installed Cloudinary Plugin"
git push heroku master

```

The Heroku server will now take a few minutes to restart.

- [Login to Cloudinary](https://cloudinary.com/console). You will note the following:

  - **Cloud name**
  - **API Key**
  - **API Secret**

  You will need these to configure the plugin in your Strapi Dashboard.

- From you Strapi Dashboard, click on `Plugins` and then for `FILES UPLOAD`, click the `cog` icon.
  - Under the **Production** tab, select **Cloudinary** under the **Providers** dropdown.
  - Enter your `Cloud Name` from Cloudinary
  - Enter your `API Key` from Cloudinary
  - Enter your `API Secret` from Cloudinary
  - Click `Save` to register the Settings

### Add your **Restaurants** and **Dishes** to your production database

- Add as many **Restaurants** as you would like to see.
- Add as Many **Dishes** as you would like to see.

You are now ready to deploy your Nuxt.js `frontend` to Netlify.

## Deploy Frontend on Netlify

Init a git project and commit your files:

`Path: ./backend`

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/<you>/<your-project>.git
git push -u origin master
```

Then:

- Signup to [Netlify](https://www.netlify.com).
- Create a new site from Git.
- Select your repository.
- Add the build command: `npm run generate`.
- Add the publish directory: `dist`.
- Add the Strapi API URL as environment variable: `API_URL` with the value of the Heroku project url (see image below). **NOTE:** Do **NOT** have a trailing **/** slash at the end of the Heroku `url`.

![Netlify setup](./deliveroo-nuxt/netlify-config.png)

## Conclusion

Huge congrats, you successfully achieved this tutorial. I hope you enjoyed it!

<iframe src="https://giphy.com/embed/tyxovVLbfZdok" width="480" height="301" frameBorder="0" class="giphy-embed" allowFullScreen style="margin:1.75em auto;"></iframe>

The source code is available on GitHub: [https://github.com/strapi/strapi-examples/tree/master/nuxt-strapi-deliveroo-clone-tutorial](https://github.com/strapi/strapi-examples/tree/master/nuxt-strapi-deliveroo-clone-tutorial).

_Still hungry?_

Feel free to add additional features, adapt this projects to your own needs and give your feedback in the comments section.

_Share your meal!_

You enjoyed this tutorial? Share it around you!
