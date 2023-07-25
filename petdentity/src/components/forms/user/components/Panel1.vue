<template>
  <Sheet v-if="profile" min-height="550">
    <Label text class="text-primary"> Name </Label>

    <div>
      <Label text class="text-grey mt-2">
        {{ profile.name.prefix || "-" }}
      </Label>
      <Label header>
        {{ profile.name.first || "-" }}
        {{ profile.name.middle || "-" }}
        {{ profile.name.last || "-" }},
        {{ profile.name.suffix || "-" }}
      </Label>
    </div>

    <div class="mt-4">
      <Label text class="text-primary"> Gender </Label>
      <Label text class="mt-2">
        {{ profile.gender || "-" }}
      </Label>
    </div>

    <div class="mt-4">
      <Label text class="text-primary"> Birth Date </Label>
      <Label text class="mt-2">
        {{ toStringDate(profile.birthDate) }}
        ({{ toAge(profile.birthDate) }})
      </Label>
    </div>

    <div class="mt-4">
      <Label text class="text-primary"> Mobile Number </Label>
      <Label text class="mt-2"> {{ profile.mobileNumber || "-" }}</Label>
    </div>

    <div class="mt-4">
      <Label text class="text-primary"> Address </Label>
      <Label text class="mt-2">
        {{ profile.address.exact || "-" }}
        {{ profile.address.division || "-" }}
      </Label>
      <Label caption class="text-grey">
        {{ profile.address.barangay || "-" }},
        {{ profile.address.city || "-" }},
        {{ profile.address.province || "-" }},
        {{ profile.address.region || "-" }}, {{ profile.address.state || "-" }},
        {{ profile.address.country || "-" }},
        {{ profile.address.zipcode || "-" }}
      </Label>
    </div>

    <div v-if="profile.headline" class="mt-4">
      <Label text class="text-primary"> Headline </Label>
      <!-- <Alert icon="mdi-account-voice" class="mt-2">
        {{ profile.headline }}
      </Alert> -->
      <Label text>
        {{ profile.headline }}
      </Label>
    </div>
  </Sheet>
</template>
<script setup>
import Sheet from "@/components/common/Sheet.vue";
import Alert from "@/components/common/Alert.vue";
import Label from "@/components/common/Label.vue";

import { toRefs } from "vue";

import { toStringDate, getAge } from "@/utils/vue";
import { computed } from "vue";

import { useModel } from "@/utils/vue";

const emit = defineEmits(["upload", "update:modelValue"]);
const props = defineProps({
  modelValue: Object,
});

const propsRef = toRefs(props);
const profile = computed(useModel(propsRef, emit, "modelValue"));

const toAge = (age) => {
  const { years, months, days } = getAge(age);
  return `${years} years, ${months} months, ${days} days`;
};
</script>
