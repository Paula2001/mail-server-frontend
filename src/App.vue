<script setup lang="ts">
import { ref } from 'vue'

const domain = ref('')
</script>

<template>
  <v-app>
    <v-main class="d-flex align-center justify-center" style="min-height: 50vh;">
      <v-card width="700" class="p-8 text-center">
        <h2 class="text-h4 mb-2">Create your own domain</h2>
        <p class="text-medium-emphasis mb-6">
          or insert your domain
        </p>

        <v-text-field
          v-model="domain"
          label="Domain"
          variant="outlined"
          hide-details
        />

        <v-btn color="primary" size="large" class="mt-4">
          Continue
        </v-btn>
      </v-card>
    </v-main>
  </v-app>
</template>
