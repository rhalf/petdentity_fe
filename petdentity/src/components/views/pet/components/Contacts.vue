<template>
  <Panel label="Contacts" icon="mdi-account-group" min-height="320">
    <v-row v-for="(contact, index) in contacts" :key="index">
      <v-col align="start">
        <Card class="pa-4" color="grey-darken-3" variant="flat">
          <Label text class="text-primary">{{ contact.name }}</Label>
          <Label caption>
            {{ contact.address.exact || "-" }}
            {{ contact.address.division || "-" }}
          </Label>
          <Label caption class="text-grey">
            {{ contact.address.barangay }}, {{ contact.address.city }},
            {{ contact.address.province }}, {{ contact.address.region }},
            {{ contact.address.country }},
            {{ contact.address.zipcode }}
          </Label>
          <Label caption>{{ contact.mobileNumber || "-" }}</Label>
        </Card>
      </v-col>
    </v-row>

    <v-row class="mt-4 text-left">
      <v-col>
        <Button @click="dialogContactsPick = true"> + Add </Button>
      </v-col>
    </v-row>

    <DialogContactAddToPet
      v-model="dialogContactsPick"
      v-model:pet="pet"
      @done="loadItems"
    />
  </Panel>
</template>

<script setup>
import Panel from "@/components/common/Panel.vue";
import Card from "@/components/common/Card.vue";
import Label from "@/components/common/Label.vue";

import Button from "@/components/common/Button.vue";

import DialogContactAddToPet from "@/components/dialogs/contact/DialogContactAddToPet.vue";

import { toRefs, ref } from "vue";
import { useModel } from "@/utils/vue";
import { computed, onMounted } from "vue";

import { getAllByPet, getAll } from "@/api/contact";

const emit = defineEmits(["update:modelValue"]);
const props = defineProps({ modelValue: Object);

const propsRef = toRefs(props);

const pet = computed(useModel(propsRef, emit, "modelValue"));

const isLoading = ref(false);

const dialogContactsPick = ref(false);

const contacts = ref();

onMounted(async () => {
  await loadItems();
});

const loadItems = async () => {
  try {
    isLoading.value = true;
    contacts.value = await getAllByPet(pet.value?.id);
  } catch ({ message }) {
    console.log("error", message);
  } finally {
    isLoading.value = false;
  }
};
</script>

<style scoped>
.overlapPhoto {
  position: relative;
  top: -100px;
}
</style>
