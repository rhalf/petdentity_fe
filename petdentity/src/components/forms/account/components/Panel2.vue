<template>
  <div min-height="500">
    <v-row dense class="mt-2">
      <v-col cols="12" md="" class="text-center">
        <Avatar :src="user.profile.photoUrl" size="200" />
      </v-col>
    </v-row>

    <v-row dense class="mt-2">
      <v-col cols="12" md="">
        <Label text class="text-primary">ID</Label>

        <Label text>{{ user.id }}</Label>
      </v-col>
    </v-row>

    <v-row dense class="mt-2">
      <v-col cols="12" md="">
        <Label text class="text-primary">Email</Label>
        <Label text>{{ user.email }}</Label>
      </v-col>
    </v-row>

    <!-- <v-row dense class="mt-2">
        <v-col cols="12" md="">
          <Label text class="text-primary">Verified</Label>
        </v-col>
        <v-col cols="12" md="9">
          <Label text> {{ user.emailVerified ? "Yes" : "No" }}</Label>
        </v-col>
      </v-row> -->

    <v-row dense class="mt-2">
      <v-col cols="12" md="">
        <Label text class="text-primary">Status</Label>

        <Label text> {{ user.status }} </Label>
      </v-col>
    </v-row>

    <v-row dense class="mt-2">
      <v-col cols="12" md="">
        <Label text class="text-primary">Roles</Label>

        <Chip
          color="green"
          variant="flat"
          v-for="(role, index) in user.roles"
          :key="index"
        >
          <Label text medium> {{ role }}</Label>
        </Chip>
      </v-col>
    </v-row>
  </div>
</template>
<script setup>
import Card from "@/components/common/Card.vue";
import Label from "@/components/common/Label.vue";
import Chip from "@/components/common/Chip.vue";
import Avatar from "@/components/common/Avatar.vue";

import { toRefs } from "vue";

import { computed } from "vue";

import { useModel } from "@/utils/vue";

const emit = defineEmits(["upload", "update:modelValue"]);
const props = defineProps({
  modelValue: Object,
});

const propsRef = toRefs(props);
const user = computed(useModel(propsRef, emit, "modelValue"));
</script>
