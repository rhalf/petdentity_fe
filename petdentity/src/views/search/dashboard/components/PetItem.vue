<template>
  <v-hover>
    <template v-slot:default="{ isHovering, props }">
      <Card
        v-bind="props"
        :color="'primary'"
        class="px-6 py-4"
        :variant="isHovering ? 'flat' : 'tonal'"
        min-width="100%"
        @click="viewHandler(pet)"
      >
        <v-row>
          <v-col cols="auto" class="d-flex align-center">
            <Avatar v-model="pet.photoUrl" :size="50" type="PET" />
          </v-col>
          <v-col class="d-flex align-center">
            <Label text> {{ pet.id }}</Label>
          </v-col>
          <v-col class="d-flex align-center">
            <Label text> {{ pet.name }}</Label>
          </v-col>

          <v-col class="d-flex align-center">
            <Label text>
              {{ pet.birthDate }}
            </Label>
          </v-col>
          <v-col class="d-flex align-center">
            <Label text> {{ toStringAge(getAge(pet.birthDate)) }}</Label>
          </v-col>
          <v-col class="d-flex align-center justify-end">
            <v-icon icon="mdi-eye" v-if="pet.privacy === 'PUBLIC'" />
            <v-icon icon="mdi-eye-off" v-else />
          </v-col>
        </v-row>
      </Card>
    </template>
  </v-hover>
</template>

<script setup>
import { get } from "@/api/pet";

import Avatar from "@/components/common/Avatar.vue";
import Card from "@/components/common/Card.vue";
import Label from "@/components/common/Label.vue";

import { useRouter } from "vue-router";
const router = useRouter();

import { computed, ref, toRefs, watch } from "vue";
import { useModel, getAge, toStringAge } from "@/utils/vue";

const emit = defineEmits(["update:modelValue"]);
const props = defineProps({ modelValue: String });
const propsRef = toRefs(props);

const id = computed(useModel(propsRef, emit, "modelValue"));

const pet = ref({});

const viewHandler = ({ id }) => {
  router.push({
    name: "SearchPet",
    params: {
      id: id,
    },
  });
};

watch(
  id,
  async (current) => {
    pet.value = await get(current);
  },
  { immediate: true, deep: true }
);
</script>
