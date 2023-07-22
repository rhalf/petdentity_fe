<template>
  <Card color="primary" class="mt-4 pa-4 rounded-0" variant="outlined">
    <v-row>
      <v-col cols="2" align="center">
        <Avatar v-model="pet.photoUrl" :size="100" type="PET" />
      </v-col>
      <v-col justify="center">
        <Label header> {{ pet.name }}</Label>
        <Label text class="text-grey"> {{ pet.birthDate }}</Label>
        <Label text class="text-grey">
          {{ toStringAge(getAge(pet.birthDate)) }}</Label
        >
      </v-col>
    </v-row>
  </Card>
</template>

<script setup>
import { get } from "@/api/pet";

import Avatar from "@/components/common/Avatar.vue";
import Card from "@/components/common/Card.vue";
import Label from "@/components/common/Label.vue";

import { computed, ref, toRefs, watch } from "vue";
import { useModel, getAge, toStringAge } from "@/utils/vue";

const emit = defineEmits(["update:modelValue"]);
const props = defineProps({ modelValue: String });
const propsRef = toRefs(props);

const id = computed(useModel(propsRef, emit, "modelValue"));

const pet = ref({});

watch(
  id,
  async (current) => {
    pet.value = await get(current);
  },
  { immediate: true, deep: true }
);
</script>
