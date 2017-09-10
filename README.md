![Header](http://ztask.mkulinski.pl/github-kulek1.jpg)
# Ztask

> Development version of single-page application where you can manage tasks with your coworkers. 
It's been written in Vue.js 2.0

### Live demo
Check out the demo here: [Link](http://www.ztask.mkulinski.pl)

## Tech Stack

* OAuth Authorization 
* Laravel API
* Vuex
* VueRouter

## Features in the near feature

* Registration module
* Creating groups
* Sorting tasks
* Responsive view

## Build Setup

Laravel Server is necessary to run this project so I'll update repository soon

``` bash
# install dependencies
npm install

# rename .env.example to .env 
fill in with your credentials from MySQL

# run all required migrations
php artisan migrate --seed

# run Laravel server at localhost:8000
php artisan serve

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

```

## License 
Free for personal use <br />
Commercial use forbidden

