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
            <Button @click="submitHandler" :loading="isLoading">Submit</Button>
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

import { getByUid, update } from "@/api/unit";

import { useModel } from "@/utils/vue";

import { ref, toRefs, computed } from "vue";
import { getCurrentUser } from "@/utils/firebase";

const props = defineProps({ modelValue: Boolean });
const propsRef = toRefs(props);
const emit = defineEmits(["update:modelValue", "done"]);

const isLoading = ref(false);
const dialog = computed(useModel(propsRef, emit, "modelValue"));
const unitUid = ref();

const submitHandler = async () => {
  try {
    isLoading.value = true;
    //get unit
    if (!unitUid.value) return;

    const units = await getByUid(unitUid.value);

    if (units.length === 0) throw new Error("Unit not yet registered!");

    const unit = units[0];
    if (unit.owner) throw new Error("Unit is already added to an owner!");

    const { uid } = await getCurrentUser();
    unit.owner = uid;

    await update(unit);
    // const docRef = await create(unit.value);

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
