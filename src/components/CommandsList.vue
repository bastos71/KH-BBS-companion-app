<script setup lang="ts">
import { useBBSStore } from '@/stores/bbs'

const bbsStore = useBBSStore()

const commands = bbsStore.commands
</script>

<template>
  <table class="table">
    <thead>
      <tr>
        <th>ID</th>
        <th>Name</th>
        <th>Character</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="command in commands" :key="command">
        <td>{{ command.apiId }}</td>
        <td>{{ command.name }}</td>
        <td>{{ command.charactersIds.join(', ') }}</td>
      </tr>
    </tbody>
  </table>
</template>
