<template>
  <Sheet v-if="government" :height="220">
    <div>
      <Label header class="text-primary">
        {{ government.name }}
      </Label>
      <Label text class="text-grey mt-2">
        {{ government.name || "-" }}
      </Label>
    </div>
    <!-- 
    <div class="mt-4">
      <Label text class="text-primary"> Gender </Label>
      <Label text class="mt-2">
        {{ government.gender || "-" }}
      </Label>
    </div>

    <div class="mt-4">
      <Label text class="text-primary"> Birth Date </Label>
      <Label text class="mt-2">
        {{ toStringDate(government.birthDate) }}
        ({{ toAge(government.birthDate) }})
      </Label>
    </div>

    <div class="mt-4">
      <Label text class="text-primary"> Mobile Number </Label>
      <Label text class="mt-2"> {{ government.mobileNumber || "-" }}</Label>
    </div>

    <div class="mt-4">
      <Label text class="text-primary"> Address </Label>
      <Label text class="mt-2">
        {{ government.address.exact || "-" }}
        {{ government.address.division || "-" }}
      </Label>
      <Label caption class="text-grey">
        {{ government.address.barangay || "-" }},
        {{ government.address.city || "-" }},
        {{ government.address.province || "-" }},
        {{ government.address.region || "-" }},
        {{ government.address.state || "-" }},
        {{ government.address.country || "-" }},
        {{ government.address.zipcode || "-" }}
      </Label>
    </div>

    <div v-if="government.headline" class="mt-4">
      <Label text class="text-primary"> Headline </Label>
 <Alert icon="mdi-account-voice" class="mt-2">
        {{ government.headline }}
      </Alert> 
      <Label text>
        {{ government.headline }}
      </Label>
    </div> -->
  </Sheet>
</template>
<script setup>
import Sheet from "@/components/common/Sheet.vue";
import Alert from "@/components/common/Alert.vue";
import Label from "@/components/common/Label.vue";

// import { toStringDate, getAge } from "@/utils/vue";
import { toRefs, computed } from "vue";
import { useModel } from "@/utils/vue";

const emit = defineEmits(["upload", "update:modelValue"]);
const props = defineProps({
  modelValue: Object,
});

const propsRef = toRefs(props);
const government = computed(useModel(propsRef, emit, "modelValue"));

// const toAge = (age) => {
//   const { years, months, days } = getAge(age);
//   return `${years} years, ${months} months, ${days} days`;
// };
</script>
