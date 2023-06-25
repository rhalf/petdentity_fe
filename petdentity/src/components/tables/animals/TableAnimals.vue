<template>
  <v-data-table :headers="headers" :loading="isLoading">
    <template v-slot:item.actions="{ item, index }">
      <ButtonIcon
        @click="emit('on-view', item.selected)"
        icon="mdi-eye"
        variant="flat"
        class="text-white"
      />

      <ButtonIcon
        @click="emit('on-edit', item.selected)"
        icon="mdi-pencil"
        variant="flat"
        class="text-white"
      />

      <ButtonIcon
        @click="emit('on-remove', item.selected)"
        icon="mdi-trash-can"
        variant="flat"
        class="text-red"
      />
    </template>
  </v-data-table>
</template>

<script setup>
import { VDataTable } from "vuetify/labs/VDataTable";
import { headers } from "./data";

import Label from "@/components/common/Label";
import ButtonIcon from "@/components/common/ButtonIcon";
import { ref } from "vue";

const emit = defineEmits(["on-view", "on-edit", "on-remove"]);

const isLoading = ref(false);
</script>
