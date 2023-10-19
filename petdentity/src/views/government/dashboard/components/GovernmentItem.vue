<template>
  <v-hover>
    <template v-slot:default="{ isHovering, props }">
      <!-- :variant="isHovering ? 'outlined' : 'elevated'" -->
      <Card
        v-bind="props"
        color="primary"
        min-width="100%"
        @click="viewHandler(government)"
      >
        <Image cover :src="government.photoUrl" :aspectRatio="16 / 9">
          <v-card-title
            class="titleColor text-primary"
            v-text="government.name"
          />
        </Image>

        <v-card-actions class="bg-primary" color="">
          <div>{{ likes }}</div>
          <v-spacer />
          <ButtonIcon icon="mdi-login" @click="viewHandler(government)" />
          <ButtonIcon
            :color="likeStatus ? 'blue' : ''"
            icon="mdi-thumb-up"
            @click="likeStatus ? unlikeHandler() : likeHandler()"
          />
          <ButtonIcon
            :icon="show ? 'mdi-chevron-up' : 'mdi-chevron-down'"
            @click="show = !show"
          />
        </v-card-actions>

        <v-expand-transition>
          <div v-show="show">
            <v-divider></v-divider>

            <v-card-text>
              <Label header> {{ government.name }}</Label>
              <Label caption> {{ government.description }}</Label>

              <Label caption>
                Region {{ government.address?.region }},
                {{ government.address?.province }},
                {{ government.address?.city }}
              </Label>
            </v-card-text>
          </div>
        </v-expand-transition>
      </Card>
    </template>
  </v-hover>
</template>

<script setup>
import { like, unlike, isLike, countLikes } from "@/api/government/likes";

import Image from "@/components/common/Image.vue";
import Card from "@/components/common/Card.vue";
import Label from "@/components/common/Label.vue";
import ButtonIcon from "@/components/common/ButtonIcon.vue";

import { useRouter } from "vue-router";
const router = useRouter();

import { computed, ref, toRefs, watch } from "vue";
import { useModel } from "@/utils/vue";
import { onMounted } from "vue";

const emit = defineEmits(["update:modelValue"]);
const props = defineProps({ modelValue: Object });
const propsRef = toRefs(props);

const government = computed(useModel(propsRef, emit, "modelValue"));

const show = ref(false);
const likes = ref(0);
const likeStatus = ref(false);

const viewHandler = ({ id }) => {
  router.push({
    name: "Government",
    params: {
      id: id,
    },
  });
};

const updateLike = async () => {
  likeStatus.value = await isLike(government.value);
  likes.value = await countLikes(government.value);
};

onMounted(() => {
  updateLike();
});

const likeHandler = async () => {
  try {
    await like(government.value);
    updateLike();
  } catch ({ message }) {
    console.log(message);
  }
};

const unlikeHandler = async () => {
  try {
    await unlike(government.value);
    updateLike();
  } catch ({ message }) {
    console.log(message);
  }
};
</script>
<style>
.titleColor {
  background-color: rgba(64, 64, 64, 0.5) !important;
  border-color: white !important;
}
</style>
