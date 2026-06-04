<template>
    <h1>Domains</h1>
    <v-table class="w-full" striped="even">
        <thead>
        <tr>
            <th v-for="(item, index) in props.cols" :key="index" class="text-left">
            {{item}}
            </th>
            <th> view </th>
        </tr>
        </thead>

        <tbody>
        <tr
            v-for="(item, index) in props.content"
            :key="index"
        >
            <td> {{ index }} </td>
            <td> {{ item.name }}</td>
            <td> <v-icon>mdi-eye</v-icon> </td>
        </tr>
        </tbody>
    </v-table>
</template>

<script setup lang="ts">
    const props = defineProps<{
        content: {
            name: string
        }[],
        cols: string[]
    }>()

</script>