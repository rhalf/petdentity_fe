<template>
  <v-container>
    <Sheet class="pa-8">
      <v-row dense>
        <v-col>
          <Label title class="text-primary">Animals</Label>
        </v-col>
      </v-row>

      <v-row dense class="mt-3">
        <v-col>
          <v-divider color="primary" :thickness="3" />
        </v-col>
      </v-row>

      <v-row dense>
        <v-col>
          <TableAnimals />
        </v-col>
      </v-row>
    </Sheet>
  </v-container>
</template>

<script setup>
import Sheet from "@/components/common/Sheet.vue";
import Label from "@/components/common/Label.vue";

import TableAnimals from "@/components/tables/animals/TableAnimals.vue";
</script>
