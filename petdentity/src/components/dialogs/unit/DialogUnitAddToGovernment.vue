<template>
  <Dialog v-model="dialog" :width="480">
    <Card>
      <v-card-title class="bg-primary pa-4">
        <Label header class="text-black"> Add Unit </Label>
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col>
            <TextField v-model="unitUid" placeholder="Enter Unit UID" />
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-row dense class="py-4 px-4">
          <v-spacer />
          <v-col cols="auto">
            <Button
              @click="submitHandler"
              :loading="isLoading"
              :disabled="!unitUid"
            >
              Submit
            </Button>
          </v-col>
          <v-col cols="auto">
            <Button @click="closeHandler" variant="outlined">Close</Button>
          </v-col>
        </v-row>
      </v-card-actions>
    </Card>
  </Dialog>
</template>

<script setup>
import Button from "@/components/common/Button.vue";
import Label from "@/components/common/Label.vue";
import Dialog from "@/components/common/Dialog.vue";
import TextField from "@/components/common/TextField.vue";
import Card from "@/components/common/Card.vue";

import { useSnackbarStore } from "@/store/snackbar";
const { show } = useSnackbarStore();

import { getByUid, addGovernment } from "@/api/unit";

import { useModel } from "@/utils/vue";

import { ref, toRefs, computed } from "vue";

const props = defineProps({ modelValue: Boolean, government: Object });
const propsRef = toRefs(props);
const emit = defineEmits(["update:modelValue", "update:government", "done"]);

const isLoading = ref(false);
const dialog = computed(useModel(propsRef, emit, "modelValue"));
const government = computed(useModel(propsRef, emit, "government"));
const unitUid = ref();

const submitHandler = async () => {
  try {
    isLoading.value = true;

    //get unit
    if (!unitUid.value) return;

    const units = await getByUid(unitUid.value);

    const unit = units[0];

    if (!unit) throw new Error("Unit has not been added to the system yet!");

    if (unit.government)
      throw new Error("Unit is already added to other government!");

    await addGovernment(government.value, unit);

    emit("done");
    show("success", "Added a unit!");

    dialog.value = false;
  } catch ({ message }) {
    show("error", message);
  } finally {
    isLoading.value = false;
  }
};

const closeHandler = () => {
  dialog.value = false;
};
</script>

<style></style>
