<template>
  <v-data-table>
    <template v-slot:item.actions="{ item, index }">
      <ButtonIcon
        v-if="withView"
        @click="emit('view', item.selectable)"
        icon="mdi-eye"
        variant="flat"
        class="text-primary"
      />

      <ButtonIcon
        v-if="withUpdate"
        @click="emit('update', item.selectable)"
        icon="mdi-pencil"
        variant="flat"
        class="text-primary"
      />

      <ButtonIcon
        v-if="withRemove"
        @click="emit('remove', item.selectable)"
        icon="mdi-trash-can"
        variant="flat"
        class="text-red"
      />
    </template>

    <template v-slot:bottom="{ item, index }">
      <v-row dense class="mt-2">
        <v-col cols="6" md="auto">
          <Button @click="emit('prev')" block>{{ "< PREV " }} </Button>
        </v-col>
        <v-col cols="6" md="auto">
          <Button @click="emit('next')" block>{{ "Next >" }}</Button>
        </v-col>
        <v-col cols="12" md=""></v-col>
        <v-col cols="12" md="auto" class="d-flex justify-end" v-if="withAdd">
          <Button @click="emit('add')" block>+ ADD</Button>
        </v-col>
      </v-row>
    </template>

    <template v-slot:item.roles="{ item, index }">
      <Chip
        class="primary"
        v-for="(role, key) in item.selectable.roles"
        :key="key"
      >
        <Label caption>{{ role }}</Label>
      </Chip>
    </template>
  </v-data-table>
</template>

<script setup>
import { VDataTable } from "vuetify/labs/VDataTable";

import Chip from "@/components/common/Chip";
import Label from "@/components/common/Label";
import ButtonIcon from "@/components/common/ButtonIcon";
import Button from "@/components/common/Button";

const emit = defineEmits(["view", "update", "remove", "add", "prev", "next"]);
const props = defineProps({
  withView: Boolean,
  withUpdate: Boolean,
  withRemove: Boolean,
  withAdd: Boolean,
});
</script>
