# Deliveroo clone with Nuxt, GraphQL, Strapi and Stripe

Get ready to develop a **Deliveroo clone, using amazing technologies: [Nuxt](https://nuxtjs.org) ([Vuejs](https://vuejs.org)), [GraphQL](https://graphql.org), [Stripe](http://stripe.com/) and [Strapi](https://strapi.io/)**! From signup to order, you are going to let users discover restaurants, dishes and select their happy meal.

![Tutorial illustration](https://blog.strapi.io/content/images/2018/07/nuxt-article.png)

The **demo of the final result** should make you hungry:

![final result](https://blog.strapi.io/content/images/2018/07/full-2.gif)

*Note: the **source code** is **available on GitHub**: [https://github.com/strapi/strapi-examples/tree/master/nuxt-strapi-deliveroo-clone-tutorial](https://github.com/strapi/strapi-examples/tree/master/nuxt-strapi-deliveroo-clone-tutorial)*

## Introduction

### Nuxt

[Nuxt.js](https://nuxtjs.org) is an amazing framework for creating **apps with Vue.js**. Designed to build production ready applications, it provides a solid project structure built with Webpack and Babel.

[Vue.js](https://vuejs.org) is one of the most famous **front-end framework**, with more than 100K stars (🙈) on GitHub. Created in 2014 by [Evan You](https://twitter.com/youyuxi), it quickly became a reference thanks to three main advantages: extremely simple yet **powerful API**, **small library size**, and **great performances**.

### GraphQL
REST is the convention powering 99% of the live APIs. Succeeding to SOAP, it quickly became the de-facto convention because of its simplicity.

In 2015, Facebook published [GraphQL](https://graphql.org): a **powerful query language to request APIs**. Since its publication, it kept growing and have been adopted by giants, such as GitHub, Twitter and Yelp.

### Strapi

[Strapi](https://strapi.io) is the *The **open source Headless CMS Front-End Developers love***. It saves weeks of API development time.

With its extensible plugin system, it provides a large set of built-in features: Admin Panel, Authentication & Permissions management, Content Management, API Generator, etc. Unlike online CMS, **Strapi is 100% open-source** (take a look at the [GitHub repository](https://github.com/strapi/strapi)), which means:

**Strapi is completely free**.

You can **host it on your own servers**, so you own the data.

It is entirely **customisable and extensible**, thanks to the plugin system.

### Stripe

Stripe is an **online payement processor** which makes developers' life much easier when dealing with payments. In this tutorial, we will use it to proceed orders.

Looking forward forward to cook this app? Let's **get started**!

## Setup

## Install Nuxt

First of all, you are going to setup the Nuxt project. To do so, install Vue CLI:

```shell
npm install -g @vue/cli
# OR
yarn global add @vue/cli
```

Create a directory named `deliveroo-clone-tutorial`:

```shell
mkdir deliveroo-clone-tutorial
cd deliveroo-clone-tutorial
```

Then, in this new folder, generate a new Nuxt project called `client`:
```shell
npx create-nuxt-app client
# OR
npm init nuxt-app client
# OR
yarn create nuxt-app client

```

There are two important things to do here.
Choose between **npm** and **yarn** as your package manager (yarn is faster ;)) and select **Bootstrap Vue** as your UI framework to get a better design

```
? Project name: client
? Project description: Cooking a Deliveroo clone
? Author name: Me
? Choose the package manager: Yarn
? Choose UI framework: Bootstrap Vue
? Choose custom server framework: None (Recommended)
? Choose Nuxt.js modules (Press <space> to select, <a> to toggle all, <i> to invert selection)
? Choose linting tools (Press <space> to select, <a> to toggle all, <i> to invert selection)
? Choose test framework None
? Choose rendering mode Universal (SSR)
```
Press enter for every other questions and you'll get this result depending on your package manager:

npm:

```shell
To get started:

	cd client
	npm run dev

  To build & start for production:

	cd client
	npm run build
	npm run start
```

yarn:

```shell
To get started:

	cd client
	yarn dev

  To build & start for production:

	cd client
	yarn build
	yarn start
```

Run either:
  - `yarn dev`
  - `npm run dev`

to launch your server!


Here you are! Open [http://localhost:3000](http://localhost:3000) to discover your brand new app.

**Creating the Header component**

In the same time, we are going to create our first component that we will reuse across the project.

`components/Header.vue`

```js
<template>  
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container">
      <router-link tag="a" class="navbar-brand" to="/" exact>Deliveroo clone</router-link>
    </div>
  </nav>
</template>  
```

Use it in the default layout remove its style:

`layouts/default.vue`

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

  - Clean the homepage content and remove its style:

`pages/index.vue`

```js
<template>
  <section class="container">
    <div>
      <p>Home</p>
    </div>
  </section>
</template>
```

  - Restart the server to see your changes at [http://localhost:3000](http://localhost:3000).

![Home page](https://blog.strapi.io/content/images/2018/07/Screen-Shot-2018-07-02-at-15.19.04.png)

### Strapi

Having a frontend is good, but your app obviously needs a backend to manage users, restaurants, dishes and orders. To make the magic happen, let's create a Strapi API.

## Install Strapi

*Requirements: please make sure to use [Node 9](https://nodejs.org/en/download) (or more) and have either [MongoDB](https://docs.mongodb.com/manual/installation/), Postgres or MySQL installed and running on your machine.*


  Install Strapi and generate a project called `server`:

```shell
npm install strapi@beta -g
strapi new server --quickstart
# OR
yarn create strapi-app server
```

```
? Choose your installation type (Use arrow keys)
❯ Quickstart (recommended)
  Custom (manual settings)
```
Quickstart (SQLite by default)

Custom (SQLite, MySQL, MongoDB or Postgres), you choose


Wait a few seconds until your project is up and running. Your web browser should be automatically open. If not, visit [http://localhost:1337/admin/](http://localhost:1337/admin/) for the next step.

This is how to start Strapi server in case you stopped it
d
```shell
strapi develop
```


### Create your first User

  Add your first user from the [registration page](http://localhost:1337/admin/plugins/users-permissions/auth/register).

![Strapi register](https://blog.strapi.io/content/images/2018/07/register.gif)

Good job, you successfully setup both Nuxt and Strapi projects! 🎉

## Create Restaurants

First of all, we need to display the list of restaurants in our web app. Of course, this list is going to be managed through our API. So, we are going to start configuring it.

### Define Content Type

A Content Type, also called a `model`, is a type of data. A Strapi API includes, by default, the `user` Content Type. Right now, we need restaurants, so our new Content Type is going to be, as you already guessed, `restaurant` (Content Types are always singular).

Here are the required steps:

 - Navigate to the Content Type Builder [http://localhost:1337/admin/plugins/content-type-builder](http://localhost:1337/admin/plugins/content-type-builder).
 - Click on `Add Content Type`.
 - Set `restaurant` as name.
 - Click on `Add New Field` and create the followings fields:
   - `name` with type String.
   - `description` with type Text with Rich Text Editor (in the Advanced Settings section of the modal, select `Display as a WYSIWYG`).
   - `image` with type `Media`.
 - Click on Save.

![Content Type Builder](https://blog.strapi.io/content/images/2018/07/content-type-builder-restaurant-1.gif)

At this point, your server should have automatically restarted and a new link `Restaurant` appears in the left menu.

### Add some entries

Well done! You created your first Content Type. The next step is to add some restaurants in your database. To do so, click on "Restaurant" in the left menu [http://localhost:1337/admin/plugins/content-manager/restaurant](http://localhost:1337/admin/plugins/content-manager/restaurant).

You are now in the Content Manager plugin: an auto-generated user interface which let you see and edit entries.

Let's create a restaurant:

 - Click on `Add New Restaurant`.
 - Give it a name, a description and drop an image.
 - Save it.

Create as many restaurants as you would like to see in your apps.

![Content Manager](https://blog.strapi.io/content/images/2018/07/content-manager-restaurant.gif)

### Allow access

Having the items in database is great. Being able to request them from an API is even better. As you already know, Strapi's mission is to create API (I have got a super secret anecdote for you: its name is coming from Boot**strap** your **API** 😮).

When you were creating your `restaurant` Content Type, Strapi created, behind the scene, a few set of files located in `api/restaurant`. These files include the logic to expose a fully customisable CRUD API. The `find` route is available at [http://localhost:1337/restaurants](http://localhost:1337/restaurants). Try to visit this URL and will be surprised to be blocked by a 403 forbidden error. This is actually totally normal: Strapi APIs are secured by design.

Don't worry, making this route accessible is actually super intuitive:

 - Navigate to the `Roles & Permissions` section of the admin plugin [http://localhost:1337/admin/plugins/users-permissions](http://localhost:1337/admin/plugins/users-permissions).
 - Click on the `Public` role.
 - Tick the `find` and `findone` checkboxes of the `Restaurant` section.
 - Save.

*Important*: do the same thing for the `authenticated` role.

Now go back to [http://localhost:1337/restaurants](http://localhost:1337/restaurants): at this point, you should be able to see your list of restaurants.

![Users Permissions](https://blog.strapi.io/content/images/2018/07/users-permissions-restaurants-1.gif)

## Enabling GraphQL

By default, API generated with Strapi are best on REST conventions. What if I would tell you that you could transform them into GraphQL within 10 seconds?

Well, let me prove you that.

A GraphQL plugin, which will make all the work for you, is available for Strapi. Install it:

```shell
strapi install graphql
```

And that's it, you are done.

![GraphQL installation](https://blog.strapi.io/content/images/2018/07/Screen-Shot-2018-07-02-at-17.03.38.png)

Restart your server, go to [http://localhost:1337/graphql](http://localhost:1337/graphql) and try this query:

```graphql
{
  restaurants {
    id # Or _id if you are using MongoDB
    name
  }
}
```

![Strapi GraphQL](https://blog.strapi.io/content/images/2018/07/graphql.gif)

### Display restaurants

It looks you are going to the right direction. What if we would display these restaurants in our Nuxt app?

![Restaurants list](https://blog.strapi.io/content/images/2018/07/restaurants-1.gif)

Switch to your frontend code.

```shell
cd client
```

To quicken our front-end development, we are going to install the [Strapi JavaScript SDK](https://github.com/strapi/strapi-sdk-javascript):

```shell
npm install strapi-sdk-javascript
# OR
yarn add strapi-sdk-javascript
```

First, we are going to create a [store](https://nuxtjs.org/guide/vuex-store) to keep our restaurants list organized.

This store has a simple state which contains the list of restaurants. We add two mutations: one to add restaurants to the list and another to empty the list. To easily get the list of restaurants from any component, we also add a getter.

`store/restaurants.js`

```js
export const state = () => ({
  list: []
})

export const mutations = {
  add(state, restaurant) {
    state.list.push(restaurant)
  },
  emptyList(state) {
    state.list = []
  }
}

export const getters = {
  list: state => {
    return state.list
  }
}
```

Now that our store is ready, we can start working on the view. Since we want to display the restaurants on the homepage, we are going to update the `pages/index.vue`.

`pages/index.vue`

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
    response.data.restaurants.forEach(restaurant => {
      restaurant.image.url = `${apiUrl}${restaurant.image.url}`
      store.commit('restaurants/add', {
        id: restaurant.id,
        ...restaurant
      })
    })
  }
}
</script>
```

**Some explanations, please? 🤔**

Two main sections are visible here: the template and the script. These are typical in Vue.js applications.

The template section defines the structure of the page. As you can see, some attributes are very specific to Vue.js:

 - `v-for`: repeat the current tag as many times as the array length (`restaurants` in our case).
 - `v-if`: display the tag only if the condition is valid.
 - `v-model`: bind a variable according to the value of the input. Useful here to create a simple search system to filter restaurants according to their name.
 - `vue-router`: create a link to another page.

In the script section, we import our required components and node modules. The `fetch` function, which is verify specific to Nuxt, is called when the page is loading: the content is not displayed until this function is resolved.

Well done!

## Create Dishes

Congratulations, you successfully displayed the list of restaurants! This was the first major step.

### Define Content Type

Every restaurant sells dishes, which also must be stored in the database. So, we now need a new Content Type, obviously named `dish`. Since you already know how to create it, I am going to give only its attributes:

 - `name` with type `String`.
 - `description` with type `Text`.
 - `image` with type `Media`.
 - `price` with type `Number` (decimal).
 - `restaurant` with type `Relation`: this one is a bit more specific. Our purpose here is to tell to Strapi that every dish can be related to a restaurant. To do so, create a one-to-many relation, as below.

 Do not forget to tick both `find` and `findone` checkboxes of the `Dishes` section in the Roles and Permissions section

![Strapi relation](https://blog.strapi.io/content/images/2018/07/Screen-Shot-2018-07-02-at-17.27.19.png)

Here is the final result:

![Dishes fields](https://blog.strapi.io/content/images/2018/10/Screen-Shot-2018-10-19-at-15.21.41.png)

### Add some entries

Then, add some dishes from the Content Manager: [http://localhost:1337/admin/plugins/content-manager/dish](http://localhost:1337/admin/plugins/content-manager/dish). Make sure they all have an image and are linked to a restaurant.

### Display dishes

Go back to the frontend code. The steps are pretty similar to the restaurants list.

![Dishes list](https://blog.strapi.io/content/images/2018/07/dishes.gif)

First, create a new store:

`store/dishes.js`

```js
export const state = () => ({
  list: []
})

export const mutations = {
  add(state, dish) {
    state.list.push(dish)
  },
  emptyList(state) {
    state.list = []
  }
}

export const getters = {
  list: state => {
    return state.list
  }
}
```

The dishes page must be accessible from `http://localhost:3000/restaurants/1234.js` where `1234` is the id of the restaurant. Nuxt creates urls according to the name of the files located in `pages`. For that reason, you have to create a new file named `_id.vue` in `pages/restaurants`.

`pages/restaurants/_id.vue`

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
                <button class="btn btn-primary">Add to card</button>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">Card</h5>
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

Nothing particular here: exactly like for the restaurants, we define a template and add the logic in the script section.

## Authentication

At this point, you may have expected to get ready to order. But before that, we need to give the user the possibility to register and login to our app. No worries, Strapi comes to the rescue with its Users & Permissions plugin already installed in your project.

![Authentication](https://blog.strapi.io/content/images/2018/07/authentication.gif)

### Auth store

As you may imagine, we need a store dedicated to the authentication:

`store/auth.js`

```js
import Cookies from 'js-cookie'

export const state = () => {}

export const mutations = {
  setUser(state, user) {
    state.user = user
    Cookies.set('user', user)
  }
}
```

**Why cookies? 🍪**

Nothing related to this food tutorial...

Most of the time, progressive web apps store a JSON Web Token (JWT) in the local storage. That works pretty well, and this is what the Strapi JavaScript SDK does by default (it also stores it as a cookie).

The fact is that we would like to display the username in the header (coming later in this tutorial). So we need to store it somewhere.

We could have store it in the local storage, but since Nuxt supports server-side rendering, which has not access to the local storage, we need to store it in the cookies.

For that reason, you have to install `js-cookie`:

```shell
npm i js-cookie
# OR
yarn add js-cookie
```

### Register

Create a new file named `signup.vue` in the pages directory, with the following content:

`pages/signup.vue`

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

In this page, we insert a form which has three inputs: username, email and address. We also define a method named `handleSubmit` which uses the Strapi SDK to register the user before redirecting him to the home page.

Create a new user from this new page: [http://localhost:3000/signup](http://localhost:3000/signup).

### Logout

The user must be able to logout, ideally from a button in the header.

Add a `logout` mutation and a `username` setter in the `auth` store:

`store/auth.js`

```js
import Cookies from 'js-cookie'

export const state = () => {}

export const mutations = {
  setUser(state, user) {
    state.user = user
    Cookies.set('user', user)
  },
  logout(state) {
    state.user = null
    Cookies.set('user', null)
  }
}

export const getters = {
  username: state => {
    return state.user && state.user.username
  }
}
```

`components/Header.vue`

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

Try to reload the page and you will see that nothing change: you still see the `signin` and `signup` links although you registered a user a few minutes ago. That happens because we do not use the `auth/setUser` mutation on the load page. Since Nuxt is rendered server side, we need to do a little trick using the `nuxtServerInit` action which is invoked when the Nuxt server starts:

Install `cookieparser`:

```shell
npm install cookieparser
# OR
yarn add cookieparser
```

`store/index.js`

```js
import cookieparser from 'cookieparser'

export const actions = {
  nuxtServerInit({ commit }, { req }) {
    let user = null
    if (req && req.headers && req.headers.cookie) {
      const parsed = cookieparser.parse(req.headers.cookie)
      user = (parsed.user && JSON.parse(parsed.user)) || null
    }

    commit('auth/setUser', user)
  }
}
```

### Login

For the login view, we are going to do something really similar to the signup view:

`pages/signin.vue`

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

That's it for the authentication!

## Shopping cart

All of these dishes look so tasty! What if we could add some of them in a shopping cart?

![Shopping cart](https://blog.strapi.io/content/images/2018/07/shopping-card.gif)

First, we create a new store named `cart`:

`store/cart.js`

```js
import Cookies from 'js-cookie'

export const state = () => ({
  items: []
})

export const mutations = {
  setItems(state, items) {
    state.items = items
  },
  add(state, item) {
    const record = state.items.find(i => i.id === item.id)

    if (!record) {
      state.items.push({
        quantity: 1,
        ...item
      })
    } else {
      record.quantity++
    }
    Cookies.set('cart', state.items)
  },
  remove(state, item) {
    const record = state.items.find(i => i.id === item.id)

    if (record.quantity > 1) {
      record.quantity--
    } else {
      const index = state.items.findIndex(i => i.id === item.id)
      state.items.splice(index, 1)
    }
    Cookies.set('cart', state.items)
  },
  emptyList(state) {
    state.items = []
    Cookies.set('cart', state.items)
  }
}

export const getters = {
  items: state => {
    return state.items
  },
  price: state => {
    return state.items.reduce(
      (accumulator, item) => accumulator + item.price * item.quantity,
      0
    )
  },
  numberOfItems: state => {
    return state.items.reduce(
      (accumulator, item) => accumulator + item.quantity,
      0
    )
  }
}
```


To make sure the items stay in the cart across tabs and after page reload, we are also using the cookies. So we also need to update the `nuxtInitServer` function:

`store/index.js`

```js
import cookieparser from 'cookieparser'

export const actions = {
  nuxtServerInit({ commit }, { req }) {
    let user = null
    let cart = []
    if (req && req.headers && req.headers.cookie) {
      const parsed = cookieparser.parse(req.headers.cookie)
      user = (parsed.user && JSON.parse(parsed.user)) || null
      cart = (parsed.cart && JSON.parse(parsed.cart)) || []
    }

    commit('auth/setUser', user)
    commit('cart/setItems', cart)
  }
}
```

`pages/restaurants/_id.vue`

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

Good job!

## Order and Checkout

You must start being starving... I am sure you want to be able to order!

![Order](https://blog.strapi.io/content/images/2018/07/order-1.gif)

### Define Content Type

We need to store the orders in our database, so we are going to create a new Content Type in our API.

Same process as usual:

 - Navigate to the Content Type Builder [http://localhost:1337/admin/plugins/content-type-builder](http://localhost:1337/admin/plugins/content-type-builder).
 - Click on `Add Content Type`.
 - Set `order` as name.
 - Click on `Add New Field` and create the followings fields:
   - `address` with type `String`.
   - `postalCode` with type `String`.
   - `city` with type `String`.
   - `dishes` with type `JSON`.
   - `amount` with type `Number` (decimal).
   - `user` with type `Relation`: User has many orders
 - Click on Save.

![Order Content Type Builder](https://blog.strapi.io/content/images/2019/02/Screenshot-2019-02-19-at-18.16.08.png)

![Order Content Type Builder](https://blog.strapi.io/content/images/2019/02/Screenshot-2019-02-19-at-18.15.51.png)

### Allow access

To create new orders from the client, we are going to hit the `create` endpoint of the `order` API. To allow access, navigate to the Roles & Permissions section [http://localhost:1337/admin/plugins/users-permissions](http://localhost:1337/admin/plugins/users-permissions), select the `authenticated` role, tick the `order/create` checkbox and save.

### Stripe setup

In this section you will need Stripe API keys. To get them, create a Stripe account and navigate to [https://dashboard.stripe.com/account/apikeys](https://dashboard.stripe.com/account/apikeys)

### Add logic

If you already used Stripe, you probably know the credit card information do not go through your backend server. Instead of that, they are directly sent to the Stripe API (ideally using their SDK). Then, your frontend receives a token. The `id` of the must be sent to your backend which will create the Stripe charge.

In order to integrate the Stripe logic, we need to update the `create` charge endpoint in our Strapi API. To do so, edit `server/api/order/controllers/order.js` and replace its content with:

`server/api/order/controllers/order.js`

```js
const stripe = require('stripe')('sk_test_CbI52CqMj8Cv4bXf822VOGhu');
//...
create: async (ctx) => {
  const {
    address,
    amount,
    dishes,
    postalCode,
    token,
    city
  } = ctx.request.body;

  const charge = await stripe.charges.create({
    // Transform cents to dollars.
    amount: amount * 100,
    currency: 'usd',
    description: `Order ${new Date()} by ${ctx.state.user.id}`,
    source: token,
  });

  // Register the order in the database
  const order = await strapi.services.order.create({
    user: ctx.state.user.id,
    address,
    amount,
    dishes,
    postalCode,
    city
  });

  return order;
}
```


Install the `stripe` package:

```shell
npm install stripe
# OR
yarn add stripe
```

*Note: in a real-world example, the amount should be checked on the backend side and the list of dishes related to the command should be stored in a more specific Content Type called `orderDetail`.*

Do not forget to restart the Strapi server.

### Checkout page

In `pages/restaurants/_id.vue`, add the click handler to the Order button and add the `goToCheckout` method:

`pages/restaurants/_id.vue`

```js
<template>
<!-- ... -->
<button :disabled="!selectedDishes.length" class="btn btn-primary" @click="goToCheckout">Order</button>
<!-- ... -->
</template>

<script>
//...
goToCheckout() {
  // Redirect to signin page if not logged in.
  const isConnected = this.$store.getters['auth/username']
  if (!isConnected) {
    this.$router.push('/signin')
    return
  }
  this.$router.push('/checkout')
},
//...
</script>
```

Now we are going to create the Checkout page:

`pages/checkout.vue`

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
              <label for="card">Card</label>
              <card
                class="form-control"
                stripe="pk_test_4nobp9tCdjhXC4JPrmgqKnsk"
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

**Explanations 🕵️**

In this page, we display a form to get user's address and debit card informations. We use the [Stripe Elements](https://stripe.com/elements) system to go faster. When the form is submitted, we get a token from Stripe. Then, we create the order in our Strapi API.

Install the `vue-stripe-elements-plus` package to make it work:

```shell
npm i vue-stripe-elements-plus
# OR
yarn add vue-stripe-elements-plus
```

And add the Stripe script in the nuxt config:

`nuxt.config.js`

```js
module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    //...
    ,
    script: [
      { src: 'https://js.stripe.com/v3' }
    ]
  },

  // ...
}
```

You are now able to let users submit their order.

Bon appétit! 🇫🇷

## Deploy Backend on Heroku

Init a git project and commit your files:

```shell
cd server

rm package-lock.json # May involve errors if not removed
# OR
rm yarn.lock

git init
git add .
git commit -am "Initial commit"
```

Make sure the [Heroku CLI is installed](https://devcenter.heroku.com/articles/heroku-cli#download-and-install) on your computer and deploy:

```shell
heroku create
heroku addons:create mongolab:sandbox --as DATABASE
git push heroku master
```

![Heroku deploy](https://blog.strapi.io/content/images/2018/07/Screen-Shot-2018-07-02-at-19.05.02.png)

Visit the URL provided by Heroku and keep it for the next step.

**Note: you will have to redefine your permissions rules from the interface. This workflow will be [improved in the near future](https://github.com/strapi/strapi/issues/672).**

## Deploy Frontend on Netlify

Init a git project and commit your files:

```shell
cd client
git init
git add .
git commit -am "Initial commit"
git remote add origin https://github.com/<you>/<your-project>.git
git push -u origin master
```

Then:

 - Signup to [Netlify](https://www.netlify.com).
 - Create a new site.
 - Select your repository.
 - Add the build command: `npm run generate`.
 - Add the publish directory: `dist`.
 - Add the API URL as environment variable: `API_URL` with the value of the Heroku project url.

![Netlify setup](https://blog.strapi.io/content/images/2018/07/Screen-Shot-2018-07-01-at-19.48.24.png)

## Conclusion

Huge congrats, you successfully achieved this tutorial. I hope you enjoyed it!

<iframe src="https://giphy.com/embed/tyxovVLbfZdok" width="480" height="301" frameBorder="0" class="giphy-embed" allowFullScreen style="margin:1.75em auto;"></iframe>

The source code is available on GitHub: [https://github.com/strapi/strapi-examples/tree/master/nuxt-strapi-deliveroo-clone-tutorial](https://github.com/strapi/strapi-examples/tree/master/nuxt-strapi-deliveroo-clone-tutorial).


*Still hungry?*

Feel free to add additional features, adapt this projects to your own needs and give your feedback in the comments section.

*Share your meal!*

You enjoyed this tutorial? Share it around you!
