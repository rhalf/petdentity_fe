<template>
  <v-row v-if="user">
    <v-col cols="12" md="4">
      <Panel2 v-model="user" />
    </v-col>
    <v-col cols="12" md="8">
      <Panel1 v-model="user.profile" />
    </v-col>
  </v-row>
</template>

<script setup>
import Panel1 from "./components/Panel1.vue";
import Panel2 from "./components/Panel2.vue";

import { computed, onMounted, reactive, ref, watch } from "vue";
import { update } from "@/api/user";

import { uploadProfilePhoto } from "@/api/photo";
import { toRefs } from "vue";

import { useSnackbarStore } from "@/store/snackbar";
const { show } = useSnackbarStore();

import { useModel } from "@/utils/vue";

const emit = defineEmits(["upload", "update:modelValue"]);
const props = defineProps({
  modelValue: Object,
});

const propsRef = toRefs(props);
const user = computed(useModel(propsRef, emit, "modelValue"));

const isLoading = ref(false);

onMounted(() => {});

const file = ref();
const imagePath = ref();

// const photoHandler = async () => {
//   let fileUpload = document.getElementById("fileUpload");
//   if (fileUpload != null) {
//     await fileUpload.click();
//   }
// };

// watch(imagePath, async (current) => {
//   if (!current) return;
//   try {
//     isLoading.value = true;
//     const result = await uploadProfilePhoto(user.value.uid, current);
//     emit("upload", result);
//   } catch (error) {
//     console.log("error", error);
//   } finally {
//     isLoading.value = false;
//   }
// });

const saveHandler = async () => {
  try {
    isLoading.value = true;
    await update(user.value);
    show("success", "Saved successfully!");
  } catch (error) {
    console.log("error", error);
  } finally {
    isLoading.value = false;
  }
};
</script>

<style></style>
