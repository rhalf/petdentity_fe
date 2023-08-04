<template>
  <Sheet v-if="user" min-height="550">
    <div class="text-center">
      <Avatar v-model="user.profile.photoUrl" size="220" />
    </div>

    <div class="mt-4">
      <Label text class="text-primary">ID</Label>
      <Label text class="mt-2">{{ user.id }}</Label>
    </div>

    <div class="mt-4">
      <Label text class="text-primary">Email</Label>
      <Label text class="mt-2">{{ user.email }}</Label>
    </div>

    <!-- <v-row dense class="mt-4">
       
          <Label text class="text-primary">Verified</Label>
        </v-col>
        <v-col cols="12" md="9">
          <Label text class="mt-2"> {{ user.emailVerified ? "Yes" : "No" }}</Label>
        </v-col>
      </v-row> -->

    <div class="mt-4">
      <Label text class="text-primary">Status</Label>
      <Label text class="mt-2"> {{ user.status }} </Label>
    </div>

    <div class="mt-4">
      <Label text class="text-primary">Roles</Label>

      <Chip class="mt-2" v-for="(role, index) in user.roles" :key="index">
        <Label caption> {{ role }}</Label>
      </Chip>
    </div>
  </Sheet>
</template>
<script setup>
import Sheet from "@/components/common/Sheet.vue";
import Label from "@/components/common/Label.vue";
import Chip from "@/components/common/Chip.vue";
import Avatar from "@/components/common/Avatar.vue";

import { computed, toRefs } from "vue";

import { useModel } from "@/utils/vue";

const emit = defineEmits(["upload", "update:modelValue"]);
const props = defineProps({
  modelValue: Object,
});

const propsRef = toRefs(props);
const user = computed(useModel(propsRef, emit, "modelValue"));
</script>
