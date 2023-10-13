<template>
  <v-hover>
    <template v-slot:default="{ isHovering, props }">
      <Card
        v-bind="props"
        :color="'primary'"
        :variant="isHovering ? 'flat' : 'tonal'"
        min-width="100%"
        @click="viewHandler(government)"
      >
        <Image
          cover
          :src="government.photoUrl"
          :aspectRatio="16 / 9"
          width=""
        />

        <div class="ma-2">
          <v-row dense>
            <v-col cols="12">
              <Label header medium> {{ government.name }}</Label>
              <v-divider class="my-2" />
              <Label caption> {{ government.description }}</Label>
              <Label caption>
                Region {{ government.address?.region }},
                {{ government.address?.province }},
                {{ government.address?.city }}
              </Label>
            </v-col>
          </v-row>
        </div>
      </Card>
    </template>
  </v-hover>
</template>

<script setup>
import { get } from "@/api/government";

import Avatar from "@/components/common/Avatar.vue";
import Image from "@/components/common/Image.vue";
import Card from "@/components/common/Card.vue";
import Label from "@/components/common/Label.vue";
import Address from "@/components/views/address/Address.vue";

import { useRouter } from "vue-router";
const router = useRouter();

import { computed, ref, toRefs, watch } from "vue";
import { useModel } from "@/utils/vue";

const emit = defineEmits(["update:modelValue"]);
const props = defineProps({ modelValue: Object });
const propsRef = toRefs(props);

const government = computed(useModel(propsRef, emit, "modelValue"));

const viewHandler = ({ id }) => {
  // router.push({
  //   name: "SearchPet",
  //   params: {
  //     id: id,
  //   },
  // });
};

watch();
// id,
// async (current) => {
//   government.value = await get(current);
// },
// { immediate: true, deep: true }
</script>
