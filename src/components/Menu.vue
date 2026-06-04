<template>
  <v-app-bar>
    <template #prepend>
      <v-menu>
        <template #activator="{ props }">
          <v-app-bar-nav-icon v-bind="props" />
        </template>

        <v-list class="h-full">
          <slot name="menu" />
        </v-list>
      </v-menu>
    </template>

    <v-app-bar-title>
      <slot name="title">Application Bar</slot>
    </v-app-bar-title>

    <template #append>
      <slot name="actions" />
    </template>
  </v-app-bar>
</template>