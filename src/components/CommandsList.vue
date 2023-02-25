<script setup lang="ts">
  import Airtable from "airtable";
  import { reactive } from 'vue'

  const base = new Airtable({apiKey: import.meta.env.VITE_AIRTABLE_API_TOKEN})
      .base(import.meta.env.VITE_AIRTABLE_COMMANDS_ID);

  interface Command  {
    id: string
    name: string
    characters: Character[]
  }

  interface Character {
    name: string
  }

  let commands: Command[] = reactive([]);

  base('Commands').select({
    maxRecords: 10,
    view: "Grid view"
  }).eachPage(function page(records, fetchNextPage) {
    records.forEach(function(record) {
      commands.push({
        id: record.id,
        name: record.get('name') as string,
        characters: (record.get('characters') as Array<string>).reduce((acc: Character[], characterName: string) => {
          acc.push({ name: characterName });
          return acc;
        }, [])
      });
    });
    fetchNextPage();
  }, function done(err) {
    if (err) { console.error(err); return; }
  });
</script>

<template>
  <table>
    <thead>
      <tr>
        <th>ID</th>
        <th>Name</th>
        <th>Character</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="command in commands" :key="command">
        <td>{{ command.id }}</td>
        <td>{{ command.name }}</td>
        <td>{{ command.characters.map(c => c.name).join(', ') }}</td>
      </tr>
    </tbody>
  </table>

</template>