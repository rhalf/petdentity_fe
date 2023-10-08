<template>
  <v-hover>
    <template v-slot:default="{ isHovering, props }">
      <Card
        v-bind="props"
        :color="'primary'"
        :variant="isHovering ? 'flat' : 'tonal'"
        min-width="100%"
        @click="viewHandler(pet)"
      >
        <Image cover :src="pet.photoUrl" :aspectRatio="16 / 9" width="" />

        <v-row dense class="pa-2">
          <v-col cols="12" class="d-flex align-center justify-center">
            <Label header> {{ pet.name }}</Label>
          </v-col>
          <v-col cols="12" class="d-flex align-center justify-center">
            <Label caption> {{ pet.id }}</Label>
          </v-col>

          <!-- <v-col cols="5" md="auto" class="d-flex align-center justify-start">
            <Label text>
              {{ pet.birthDate }}
            </Label>
          </v-col>
          <v-col cols="5" md="auto" class="d-flex align-center justify-start">
            <Label text> {{ toStringAge(getAge(pet.birthDate)) }}</Label>
          </v-col> -->
          <!-- <v-col
            cols="12"
            md=""
            class="d-flex align-center justify-center mdAndUp"
          >
            <v-icon icon="mdi-eye" v-if="pet.privacy === 'PUBLIC'" />
            <v-icon icon="mdi-eye-off" v-else />
          </v-col> -->
        </v-row>
      </Card>
    </template>
  </v-hover>
</template>

<script setup>
import { get } from "@/api/pet";

import Avatar from "@/components/common/Avatar.vue";
import Image from "@/components/common/Image.vue";
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
