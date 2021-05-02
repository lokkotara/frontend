<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="scss">
/* Réglages généraux */
@import "~@sweetalert2/theme-borderless/borderless.scss";
@import url("https://fonts.googleapis.com/css2?family=Karla:wght@400;500;700;800&family=Raleway:ital,wght@0,300;0,400;1,400&display=swap");
:root {
  --Primary-Color: #091f43;
  --Primary-Color-Alt: #192947;
  --Primary-Color-Ter: #394552;
  --Secondary-Color: #ffd7d7;
  --Secondary-Color-Alt: #d6646c;
  --Dark-Color: #2d2c2c;
  --Light-Color: rgb(255, 241, 244);
  --Gradient-Color: linear-gradient(
    35deg,
    var(--Primary-Color) 20%,
    var(--Primary-Color-Alt) 95%
  );
  --Gradient-Color-Alt: linear-gradient(
    315deg,
    var(--Primary-Color) 0%,
    var(--Primary-Color-ter) 74%
  );
  font-size: 10px;
}

body {
  font-family: "Raleway", sans-serif;
  background-color: white;
  color: var(--Dark-Color);
  height: 100%;
}

*,
*::before,
*::after {
  box-sizing: inherit;
}

html,
body,
p,
ul,
ol,
li,
figure,
h1,
h2,
h3,
h4,
h5,
h6 {
  margin: 0;
  padding: 0;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  font-family: sans-serif;
}

html {
  box-sizing: border-box;
  height: 100%;
}

a {
  text-decoration: none;
  color: inherit;
}

ul,
ol {
  list-style: none;
}

button,
input {
  margin: 0;
}

p,
li,
span,
input,
label {
  font-size: 1.7rem;
}

p {
  padding: 2rem 0;
}

h1 {
  font-size: 3.5rem;
  font-family: "Karla", sans-serif;
  font-weight: 900;
  padding: 5rem 0 2rem;
}

h2 {
  font-size: 2.5rem;
  font-weight: bold;
}

h3 {
  font-size: 1.8rem;
  font-weight: bold;
}

li {
  display: inline;
}

main {
  padding-bottom: 5rem;
}
.swal2-popup {
  font-size: 1.7rem !important;
}
</style>
