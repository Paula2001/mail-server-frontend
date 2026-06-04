<!-- src/views/DomainView.vue -->
<script setup lang="ts">
import { ref } from 'vue'
import Table from "@/components/Table.vue"
const domain = ref('')
</script>

<template>
<v-container
  fluid
  class="d-flex flex-column mt-25 p-10 gap-2"
  style="min-height: 100vh;"
>
  <Table :content="[{name: 'asd'}]" :cols="['Id', 'Domain Name']" />
</v-container>

</template>