<script setup lang="ts">
import { ref } from 'vue'
import AppBar from "@/components/Menu.vue"
const domain = ref('')
const drawer = ref(false)
</script>

<template>
  <v-app>
     <AppBar>
      <template #title>
        My Application
      </template>

      <template #menu>
        <v-list-item title="Home" />
        <v-list-item title="Profile" />
        <v-list-item title="Settings" />
        <v-list-item title="Logout" />
      </template>

      <template #actions>
        <v-btn icon="mdi-heart" />
        <v-btn icon="mdi-magnify" />
        <v-btn icon="mdi-dots-vertical" />
      </template>
    </AppBar>
    <v-spacer />
    <v-main class="m-10">
      <router-view />
    </v-main>
  </v-app>
</template>
