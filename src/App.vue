<template>
  <div id="app">
    <b-navbar>
        <template slot="brand">
            <b-navbar-item tag="router-link" :to="{ path: '/' }">
                Web TOTP
            </b-navbar-item>
        </template>
    </b-navbar>
    <router-view/>
  </div>
</template>

<style lang="scss">

</style>
