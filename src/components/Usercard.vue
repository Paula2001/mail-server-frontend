<script setup>
import {
  ref,
  computed,
  watch,
  useTemplateRef,   // NEW in 3.5 — preferred over template ref variables
  useId,            // NEW in 3.5 — SSR-safe unique IDs
  onMounted,
} from 'vue'

const {
  name,
  email,
  role = 'viewer',         // default value supported
  avatar = null,
} = defineProps({
  name:   { type: String, required: true },
  email:  { type: String, required: true },
  role:   { type: String, default: 'viewer' },
  avatar: { type: String, default: null },
})

const isFollowing = defineModel('following', { default: false })
const text = defineModel('text', {default: false})
text.value = "xx"

const labelId = useId()   // e.g. "v-1a2b"

const cardEl  = useTemplateRef('card')
const inputEl = useTemplateRef('searchInput')

const focused = ref(false)

const initials = computed(() =>
  name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
)

const roleColor = computed(() => ({
  admin:  '#e74c3c',
  editor: '#f39c12',
  viewer: '#2ecc71',
}[role] ?? '#95a5a6'))

watch(isFollowing, (val) => {
  console.log(`[once] Follow state changed to: ${val}`)
}, { once: true })

watch(text, (val) => {
  console.log('Search text:', val)
}, { immediate: true })

onMounted(() => {
  console.log('Card mounted, offsetWidth:', cardEl.value?.offsetWidth)
})

// ─── Expose (limit what parent can access via template ref) ───────────────────
defineExpose({
  focus: () => inputEl.value?.focus(),
  cardEl,
})
</script>

<template>
  <article ref="card" class="user-card" :aria-labelledby="labelId">

    <!-- Avatar -->
    <div class="avatar">
      <img v-if="avatar" :src="avatar" :alt="name" />
      <span v-else class="initials">{{ initials }}</span>
      <span class="role-dot" :style="{ background: roleColor }" :title="role" />
    </div>

    <!-- Info -->
    <div class="info">
      <h2 :id="labelId" class="name">{{ name }}</h2>
      <p class="email">{{ email }}</p>
      <span class="role-badge" :style="{ color: roleColor }">{{ role }}</span>
    </div>

    <!-- Follow toggle (uses defineModel v-model) -->
    <button
      class="follow-btn"
      :class="{ active: isFollowing }"
      @click="isFollowing = !isFollowing"
    >
      {{ isFollowing ? '✓ Following' : '+ Follow' }}
    </button>

    <!-- Search (useTemplateRef example) -->
    <div class="search" :class="{ focused }">
      <input
        ref="searchInput"
        v-model="text"
        type="search"
        placeholder="Search…"
        @focus="focused = true"
        @blur="focused = false"
      />
    </div>

  </article>
</template>

<style scoped>
  .user-card {
    display: grid;
    grid-template-columns: 64px 1fr auto;
    grid-template-rows: auto auto;
    gap: 12px 16px;
    padding: 20px;
    border-radius: 16px;
    background: #fff;
    box-shadow: 0 2px 12px rgba(0,0,0,.08);
    max-width: 400px;
    font-family: 'Segoe UI', system-ui, sans-serif;
  }

  /* Avatar */
  .avatar {
    grid-row: span 2;
    position: relative;
    width: 64px;
    height: 64px;
  }
  .avatar img,
  .initials {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    object-fit: cover;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #dfe6e9;
    font-weight: 700;
    font-size: 1.3rem;
    color: #636e72;
  }
  .role-dot {
    position: absolute;
    bottom: 2px; right: 2px;
    width: 12px; height: 12px;
    border-radius: 50%;
    border: 2px solid #fff;
  }

  /* Info */
  .info { align-self: center; }
  .name  { margin: 0; font-size: 1rem; font-weight: 700; color: #2d3436; }
  .email { margin: 2px 0; font-size: .8rem; color: #636e72; }
  .role-badge { font-size: .75rem; font-weight: 600; text-transform: capitalize; }

  /* Follow button */
  .follow-btn {
    align-self: center;
    padding: 6px 14px;
    border-radius: 20px;
    border: 2px solid #0984e3;
    background: transparent;
    color: #0984e3;
    font-size: .8rem;
    font-weight: 600;
    cursor: pointer;
    transition: all .2s;
  }
  .follow-btn.active {
    background: #0984e3;
    color: #fff;
  }

  /* Search */
  .search {
    grid-column: 2 / -1;
    border: 1.5px solid #dfe6e9;
    border-radius: 8px;
    overflow: hidden;
    transition: border-color .2s;
  }
  .search.focused { border-color: #0984e3; }
  .search input {
    width: 100%;
    padding: 8px 12px;
    border: none;
    outline: none;
    font-size: .85rem;
    box-sizing: border-box;
  }
</style>