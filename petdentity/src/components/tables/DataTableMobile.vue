<template>
  <v-data-table height="330">
    <template v-slot:item.actions="{ item, index }">
      <ButtonIcon
        v-if="withView"
        @click="emit('view', item.selectable, index)"
        icon="mdi-eye"
        variant="flat"
        class="text-primary"
      />

      <ButtonIcon
        v-if="withUpdate"
        @click="emit('update', item.selectable, index)"
        icon="mdi-pencil"
        variant="flat"
        class="text-primary"
      />

      <ButtonIcon
        v-if="withRemove && !disabled"
        @click="emit('remove', item.selectable, index)"
        icon="mdi-trash-can"
        variant="flat"
        class="text-red"
      />
    </template>

    <!-- <template v-slot:item.name="{ item, index }">
      <Label text> {{ item.name }}</Label>
    </template> -->

    <!-- <template v-slot:bottom="{ item, index }">
      <v-row dense class="mt-2">
        <v-col cols="6" md="auto">
          <Button @click="emit('prev')" block>{{ "< PREV " }} </Button>
        </v-col>
        <v-col cols="6" md="auto">
          <Button @click="emit('next')" block>{{ "Next >" }}</Button>
        </v-col>
        <v-col cols="12" md=""></v-col>
        <v-col md="auto" class="d-flex justify-end" v-if="withAdd && !disabled">
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

    <template v-slot:item.povg="{ item, index }">
      <v-row dense>
        <v-col>
          <v-icon v-if="item.selectable.pet" color="primary">mdi-paw</v-icon>
          <v-icon v-else color="error">mdi-close</v-icon>
        </v-col>
        <v-col>
          <v-icon v-if="item.selectable.owner" color="primary"
            >mdi-account</v-icon
          >
          <v-icon v-else color="error">mdi-close</v-icon>
        </v-col>
        <v-col>
          <v-icon v-if="item.selectable.veterinarian" color="primary"
            >mdi-stethoscope</v-icon
          >
          <v-icon v-else color="error">mdi-close</v-icon>
        </v-col>
        <v-col>
          <v-icon v-if="item.selectable.government" color="primary"
            >mdi-shield-star</v-icon
          >
          <v-icon v-else color="error">mdi-close</v-icon>
        </v-col>
      </v-row>
    </template>

    <template v-slot:item.address="{ item, index }">
      <v-row class="pa-1">
        <v-col>
          <Label text class="mt-2">
            {{ item.selectable.address.exact }}
            {{ item.selectable.address.division }}
          </Label>
          <Label caption class="text-grey">
            {{ item.selectable.address.barangay }},
            {{ item.selectable.address.city }},
            {{ item.selectable.address.province }},
            {{ item.selectable.address.region }},
            {{ item.selectable.address.country }},
            {{ item.selectable.address.zipcode }}
          </Label>
        </v-col>
      </v-row>
    </template> -->

    <!-- <template v-slot:item.colors="{ item, index }">
      <Colors :colors="item.selectable.colors" />
    </template> -->

    <template v-slot:item.age="{ item, index }">
      <Label text class="mt-2">
        {{ toStringAge(getAge(item.selectable.birthDate)) }}
      </Label>
    </template>
  </v-data-table>
</template>

<script setup>
import { VDataTable } from "vuetify/labs/VDataTable";

import Chip from "@/components/common/Chip";
import Label from "@/components/common/Label";
import ButtonIcon from "@/components/common/ButtonIcon";
import Button from "@/components/common/Button";

import { getAge, toStringAge } from "@/utils/vue";

const emit = defineEmits(["view", "update", "remove", "add", "prev", "next"]);
const props = defineProps({
  withView: Boolean,
  withUpdate: Boolean,
  withRemove: Boolean,
  disabled: Boolean,
  withAdd: Boolean,
});
</script>
