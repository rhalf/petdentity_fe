<template>
  <div min-height="500">
    <Label text class="text-primary"> Name </Label>

    <Label text class="text-grey"> {{ profile.name.prefix }} </Label>
    <Label header>
      {{ profile.name.first }}
      {{ profile.name.middle }}
      {{ profile.name.last }},
      {{ profile.name.suffix || "-" }}
    </Label>

    <Label text class="text-primary mt-5"> Gender </Label>

    <v-row dense>
      <v-col>
        <Label text> {{ profile.gender ? "Male" : "Female" }} </Label>
      </v-col>
    </v-row>

    <Label text class="text-primary mt-5"> Birth Date </Label>

    <v-row dense>
      <v-col>
        <Label text>
          {{ toStringDate(profile.birthDate) }}
          ({{ getBirthDate(profile.birthDate) }} years)
        </Label>
      </v-col>
    </v-row>

    <Label text class="text-primary mt-5"> Mobile Number </Label>

    <v-row dense>
      <v-col>
        <Label text> {{ profile.mobileNumber }}- </Label>
      </v-col>
    </v-row>

    <Label text class="text-primary mt-5"> Address </Label>

    <Label text>
      {{ profile.address.exact }}
      {{ profile.address.division }}
    </Label>
    <Label caption class="text-grey">
      {{ profile.address.barangay }}, {{ profile.address.city }},
      {{ profile.address.province }}, {{ profile.address.region }},
      {{ profile.address.country }},
      {{ profile.address.zipcode }}
    </Label>

    <Label text class="text-primary mt-5"> Headline </Label>

    <Label text> {{ profile.headline }}- </Label>
  </div>
</template>
<script setup>
import Card from "@/components/common/Card.vue";
import Label from "@/components/common/Label.vue";

import { toRefs } from "vue";

import { toStringDate, getBirthDate } from "@/utils/vue";
import { computed } from "vue";

import { useModel } from "@/utils/vue";

const emit = defineEmits(["upload", "update:modelValue"]);
const props = defineProps({
  modelValue: Object,
});

const propsRef = toRefs(props);
const profile = computed(useModel(propsRef, emit, "modelValue"));
</script>
