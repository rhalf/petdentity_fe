<template>
  <div>
    <v-row dense>
      <v-col cols="12" :md="isPhilippines ? 4 : 3">
        <Label text class="text-primary"> Country </Label>
        <Select
          v-model="address.country"
          :items="countries"
          placeholder="Country"
          item-title="name"
          item-value="name"
          clearable
          :disabled="props.disabled"
          @update:modelValue="onCountry"
          class="text-truncate mt-2"
        />
      </v-col>
      <v-col v-if="!isPhilippines" cols="12" md="3">
        <Label text class="text-primary"> State </Label>
        <TextField
          v-model="address.state"
          placeholder="State"
          clearable
          :disabled="props.disabled"
          class="text-truncate mt-2"
        />
      </v-col>

      <v-col cols="12" :md="isPhilippines ? 4 : 3">
        <Label text class="text-primary"> Region </Label>
        <Select
          v-if="isPhilippines"
          v-model="address.region"
          :items="datas.regions"
          item-title="fullName"
          item-value="name"
          placeholder="Region"
          clearable
          :disabled="props.disabled"
          @update:modelValue="onRegion"
          class="text-truncate mt-2"
        />
        <TextField
          v-else
          v-model="address.region"
          placeholder="Region"
          clearable
          :disabled="props.disabled"
          class="text-truncate mt-2"
        />
      </v-col>

      <v-col cols="12" :md="isPhilippines ? 4 : 3">
        <Label text class="text-primary"> Province </Label>

        <Select
          v-if="isPhilippines"
          v-model="address.province"
          :items="datas.provinces"
          placeholder="Province"
          clearable
          :disabled="props.disabled"
          @update:modelValue="onProvince"
          class="text-truncate mt-2"
        />
        <TextField
          v-else
          v-model="address.province"
          placeholder="Province"
          clearable
          :disabled="props.disabled"
          class="text-truncate mt-2"
        />
      </v-col>
    </v-row>

    <v-row dense class="mt-2">
      <v-col cols="12" md="4">
        <Label text class="text-primary"> City / Municipality / Town </Label>
        <Select
          v-if="isPhilippines"
          v-model="address.city"
          :items="datas.cities"
          placeholder="City / Municipality / Town"
          clearable
          :disabled="props.disabled"
          @update:modelValue="onCity"
          class="text-truncate mt-2"
        />
        <TextField
          v-else
          v-model="address.city"
          placeholder="City / Municipality / Town"
          clearable
          :disabled="props.disabled"
          class="text-truncate mt-2"
        />
      </v-col>

      <v-col cols="12" md="4">
        <Label text class="text-primary"> Barangay </Label>

        <Select
          v-if="isPhilippines"
          v-model="address.barangay"
          :items="datas.barangays"
          placeholder="Barangay"
          clearable
          :disabled="props.disabled"
          class="text-truncate mt-2"
        />
        <TextField
          v-else
          v-model="address.barangay"
          placeholder="Barangay"
          clearable
          :disabled="props.disabled"
          class="text-truncate mt-2"
        />
      </v-col>

      <v-col cols="12" md="4">
        <Label text class="text-primary"> Zip Code </Label>

        <TextField
          v-model="address.zipcode"
          placeholder="Zip Code"
          clearable
          :disabled="props.disabled"
          class="text-truncate mt-2"
        />
      </v-col>
    </v-row>

    <v-row dense>
      <v-col>
        <Label text class="text-primary"> Subdivision, Zone, Phase </Label>

        <TextField
          v-model="address.division"
          placeholder="Subdivision, Zone, Phase"
          clearable
          :disabled="props.disabled"
          class="text-truncate mt-2"
        />
      </v-col>
    </v-row>

    <v-row dense class="mt-2">
      <v-col>
        <Label text class="text-primary">
          Unit, Floor, Building Number and Street
        </Label>

        <TextField
          v-model="address.exact"
          placeholder="Unit, Floor, Building Number and Street"
          clearable
          :disabled="props.disabled"
          class="text-truncate mt-2"
        />
      </v-col>
    </v-row>
  </div>
</template>

<script setup>
import Label from "@/components/common/Label.vue";
import Select from "@/components/common/Select.vue";
import TextField from "@/components/common/TextField.vue";

import countries from "@/data/countries.json";
import philippines from "@/data/philippines.json";

import { Address } from "@/constants";

import { useModel } from "@/utils/vue";

import { cloneDeep } from "lodash";

import { computed, reactive, watch, toRefs } from "vue";

const emit = defineEmits(["update:modelValue"]);

const props = defineProps({
  modelValue: {
    type: Object,
    default: cloneDeep(Address),
  },
  disabled: Boolean,
});
const propsRef = toRefs(props);

const address = computed(useModel(propsRef, emit, "modelValue"));

const datas = reactive({
  countries,
  regions: [],
  provinces: [],
  cities: [],
  barangays: [],
});

const isPhilippines = computed(() => {
  return address.value?.country === "Philippines";
});

const selectedCountry = computed(() => {
  return address.value?.country;
});
const selectedRegion = computed(() => {
  return address.value?.region;
});

const selectedProvince = computed(() => {
  return address.value?.province;
});

const selectedCity = computed(() => {
  if (!address.value) null;
  return address.value?.city;
});

const onCountry = () => {
  const { state, region, province, city, barangay } = Address;
  address.value.state = state;
  address.value.region = region;
  address.value.province = province;
  address.value.city = city;
  address.value.barangay = barangay;
};
const onRegion = () => {
  const { province, city, barangay } = Address;
  address.value.province = province;
  address.value.city = city;
  address.value.barangay = barangay;
};
const onProvince = () => {
  const { city, barangay } = Address;
  address.value.city = city;
  address.value.barangay = barangay;
};
const onCity = () => {
  const { barangay } = Address;
  address.value.barangay = barangay;
};

watch(
  selectedCountry,
  async () => {
    if (!isPhilippines.value) return;

    const regions = await Object.entries(philippines);
    const result = regions.map((region) => {
      return { name: region[0], fullName: region[1].region_name };
    });
    datas.regions = result;
  },
  { immediate: true }
);

watch(
  selectedRegion,
  async (currentRegion) => {
    if (!currentRegion) return;
    if (!isPhilippines.value) return;

    let provinces = Object.entries(philippines[currentRegion].province_list);
    const result = await provinces.map((province) => {
      return province[0];
    });
    datas.provinces = result;
  },
  { immediate: true }
);

watch(
  selectedProvince,
  async (currentProvince) => {
    if (!currentProvince) return;
    if (!isPhilippines.value) return;
    if (!selectedRegion.value) return;

    let cities = Object.entries(
      philippines[selectedRegion.value].province_list[currentProvince]
        .municipality_list
    );

    const result = await cities.map((city) => {
      return city[0];
    });

    datas.cities = result;
  },
  { immediate: true }
);

watch(
  selectedCity,
  async (currentCity) => {
    if (!currentCity) return;
    if (!isPhilippines.value) return;
    if (!selectedRegion.value) return;
    if (!selectedProvince.value) return;

    let city =
      philippines[selectedRegion.value].province_list[selectedProvince.value]
        .municipality_list[currentCity];

    datas.barangays = city.barangay_list;
  },
  { immediate: true }
);
</script>
