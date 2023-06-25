<template>
  <v-container>
    <Sheet class="pa-8">
      <v-row dense>
        <v-col>
          <Label title class="text-primary">Animals</Label>
        </v-col>
      </v-row>

      <v-row dense class="mt-5">
        <v-spacer />
        <v-col cols="auto">
          <Button @click="dialogAnimalAdd = true">
            <v-icon>mdi-plus</v-icon>
            Add
          </Button>
          <DialogAnimalAdd v-model="dialogAnimalAdd" />
        </v-col>
      </v-row>

      <v-row dense class="mt-5">
        <v-col>
          <TableAnimals :items="animals" />
        </v-col>
      </v-row>
    </Sheet>
  </v-container>
</template>

<script setup>
import Sheet from "@/components/common/Sheet.vue";
import Label from "@/components/common/Label.vue";
import Button from "@/components/common/Button.vue";

import TableAnimals from "@/components/tables/animals/TableAnimals.vue";

import DialogAnimalAdd from "@/components/dialog/animal/DialogAnimalAdd.vue";

import { useSnackbarStore } from "@/store/snackbar";
const { show } = useSnackbarStore();

import { search } from "@/api/animal";

import { ref, onMounted } from "vue";

const dialogAnimalAdd = ref(false);

const animals = ref();

onMounted(async () => {
  try {
    animals.value = await search("", "asc", 5, 0);
    console.log(animals.value);
  } catch ({ message }) {
    show("error", message);
  }
});
</script>
