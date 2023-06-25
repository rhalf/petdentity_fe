<template>
  <div>
    <v-row dense>
      <v-col cols="12" :md="isPhilippines ? 4 : 3">
        <BaseHeaderText :required="required" class="mb-1"> Country </BaseHeaderText>
        <ValidationProvider
          v-slot="{ errors }"
          :name="`${name} (country)`"
          :rules="`${required ? 'required' : ''}`"
        >
          <v-select
            :value="value.country"
            @change="update('country', $event || '')"
            :error-messages="errors"
            :items="countries"
            item-text="name"
            item-value="name"
            placeholder="Select Country"
            hide-details="auto"
            dense
            outlined
            clearable
            :disabled="disabled"
            :background-color="disabled ? disabledBgColor : ''"
          />
        </ValidationProvider>
      </v-col>

      <v-col v-if="!isPhilippines" cols="12" md="3">
        <BaseHeaderText class="mb-1"> State </BaseHeaderText>
        <v-text-field
          :value="value.state"
          @input="update('state', $event || '')"
          placeholder="State"
          hide-details="auto"
          dense
          outlined
          clearable
          :disabled="disabled"
          :background-color="disabled ? disabledBgColor : ''"
        />
      </v-col>

      <v-col cols="12" :md="isPhilippines ? 4 : 3">
        <BaseHeaderText :required="required && isPhilippines" class="mb-1"> Region </BaseHeaderText>
        <ValidationProvider
          v-slot="{ errors }"
          :name="`${name} (region)`"
          :rules="`${required && value.country === 'Philippines' ? 'required' : ''}`"
        >
          <v-select
            v-if="value.country === 'Philippines'"
            :value="value.region"
            @change="update('region', $event || '')"
            :error-messages="errors"
            :items="regions"
            item-text="fullName"
            item-value="name"
            placeholder="Select Region"
            hide-details="auto"
            dense
            outlined
            clearable
            :disabled="disabled"
            :background-color="disabled ? disabledBgColor : ''"
          />
          <v-text-field
            v-else
            :value="value.region"
            @input="update('region', $event || '')"
            placeholder="Region"
            hide-details="auto"
            dense
            outlined
            clearable
            :disabled="disabled"
            :background-color="disabled ? disabledBgColor : ''"
          />
        </ValidationProvider>
      </v-col>

      <v-col cols="12" :md="isPhilippines ? 4 : 3">
        <BaseHeaderText :required="required && isPhilippines" class="mb-1">
          Province
        </BaseHeaderText>

        <ValidationProvider
          v-slot="{ errors }"
          :name="`${name} (province)`"
          :rules="`${required && value.country === 'Philippines' ? 'required' : ''}`"
        >
          <v-select
            v-if="value.country === 'Philippines'"
            :value="value.province"
            @change="update('province', $event || '')"
            :error-messages="errors"
            :items="provinces"
            placeholder="Select Province"
            hide-details="auto"
            dense
            outlined
            clearable
            :disabled="disabled"
            :background-color="disabled ? disabledBgColor : ''"
          />
          <v-text-field
            v-else
            :value="value.province"
            @input="update('province', $event || '')"
            placeholder="Province"
            hide-details="auto"
            dense
            outlined
            clearable
            :disabled="disabled"
            :background-color="disabled ? disabledBgColor : ''"
          />
        </ValidationProvider>
      </v-col>
    </v-row>

    <v-row dense class="mt-3">
      <v-col cols="12" md="4">
        <BaseHeaderText :required="required && isPhilippines" class="mb-1">
          City/Municipality/Town
        </BaseHeaderText>
        <ValidationProvider
          v-slot="{ errors }"
          :name="`${name} (city/municipality/town)`"
          :rules="`${required && value.country === 'Philippines' ? 'required' : ''}`"
        >
          <v-select
            v-if="value.country === 'Philippines'"
            :value="value.cityTown"
            @change="update('cityTown', $event || '')"
            :error-messages="errors"
            :items="cities"
            placeholder="Select City/Municipality/Town"
            hide-details="auto"
            dense
            outlined
            clearable
            :disabled="disabled"
            :background-color="disabled ? disabledBgColor : ''"
          />
          <v-text-field
            v-else
            :value="value.cityTown"
            @input="update('cityTown', $event || '')"
            placeholder="City/Municipality/Town"
            hide-details="auto"
            dense
            outlined
            clearable
            :disabled="disabled"
            :background-color="disabled ? disabledBgColor : ''"
          />
        </ValidationProvider>
      </v-col>

      <v-col cols="12" md="4">
        <BaseHeaderText :required="required && isPhilippines" class="mb-1">
          Barangay
        </BaseHeaderText>
        <ValidationProvider
          v-slot="{ errors }"
          :name="`${name} (barangay)`"
          :rules="`${required && value.country === 'Philippines' ? 'required' : ''}`"
        >
          <v-select
            v-if="value.country === 'Philippines'"
            :value="value.barangay"
            @input="update('barangay', $event || '')"
            :error-messages="errors"
            :items="barangays"
            placeholder="Select Barangay"
            hide-details="auto"
            dense
            outlined
            clearable
            :disabled="disabled"
            :background-color="disabled ? disabledBgColor : ''"
          />
          <v-text-field
            v-else
            :value="value.barangay"
            @input="update('barangay', $event || '')"
            placeholder="Barangay"
            hide-details="auto"
            dense
            outlined
            clearable
            :disabled="disabled"
            :background-color="disabled ? disabledBgColor : ''"
          />
        </ValidationProvider>
      </v-col>

      <v-col cols="12" md="4">
        <BaseHeaderText :required="required && isPhilippines" class="mb-1">
          Postal Code
        </BaseHeaderText>
        <ValidationProvider
          v-slot="{ errors }"
          :name="`${name} (postal code)`"
          :rules="`${required && value.country === 'Philippines' ? 'required' : ''}`"
        >
          <v-text-field
            :value="value.zipcode"
            @input="update('zipcode', $event || '')"
            :error-messages="errors"
            placeholder="Postal Code"
            hide-details="auto"
            dense
            outlined
            clearable
            :disabled="disabled"
            :background-color="disabled ? disabledBgColor : ''"
          />
        </ValidationProvider>
      </v-col>
    </v-row>

    <v-row dense class="mt-3">
      <v-col>
        <BaseHeaderText> Subdivision, Zone, Phase </BaseHeaderText>
      </v-col>
    </v-row>

    <v-row dense>
      <v-col cols="12">
        <v-text-field
          :value="value.street2"
          @input="update('street2', $event || '')"
          placeholder="Subdivision, Zone, Phase"
          hide-details="auto"
          dense
          outlined
          clearable
          :disabled="disabled"
          :background-color="disabled ? disabledBgColor : ''"
        />
      </v-col>
    </v-row>

    <v-row dense class="mt-3">
      <v-col>
        <BaseHeaderText :required="required">
          Bldg Number, Building and Street Name
        </BaseHeaderText>
      </v-col>
    </v-row>

    <v-row dense>
      <v-col cols="12">
        <ValidationProvider
          v-slot="{ errors }"
          :name="`${name} (bldg Number, building and street name)`"
          :rules="`${required ? 'required' : ''}`"
        >
          <v-text-field
            :value="value.street1"
            @input="update('street1', $event || '')"
            :error-messages="errors"
            placeholder="Bldg Number, Building and Street Name"
            hide-details="auto"
            dense
            outlined
            clearable
            :disabled="disabled"
            :background-color="disabled ? disabledBgColor : ''"
          />
        </ValidationProvider>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import BaseHeaderText from '@/components/common/BaseHeaderText'

import countries from '@/data/countries.json'
import philippines from '@/data/philippines.json'

export default {
  components: { BaseHeaderText },
  props: {
    value: {
      type: Object,
      default: () => ({
        country: '',
        state: '',
        region: '',
        province: '',
        cityTown: '',
        barangay: '',
        village: '',
        zipcode: '',
        street2: '',
        street1: ''
      }),
      required: true
    },
    disabled: {
      type: Boolean,
      default: false
    },
    required: {
      type: Boolean,
      default: false
    },
    disabledBgColor: {
      type: String,
      default: '#f2f2f2'
    },
    name: {
      type: String,
      default: 'address'
    }
  },
  data() {
    return {
      countries,
      philippines,
      regions: [],
      provinces: [],
      cities: [],
      barangays: []
    }
  },
  computed: {
    isPhilippines() {
      return this.value.country === 'Philippines'
    }
  },
  methods: {
    getFields(obj) {
      let collection = []

      for (let prop in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, prop)) {
          collection.push(prop)
        }
      }

      return collection
    },
    onCountry() {
      this.regions = []

      let regionIndex = this.getFields(this.philippines)

      regionIndex.forEach((region) => {
        this.regions.push({
          name: region,
          fullName: this.philippines[region].region_name
        })
      })
    },
    onRegion() {
      this.provinces = []

      if (!this.value.region) return

      this.provinces = this.getFields(this.philippines[this.value.region].province_list)
    },
    onProvince() {
      this.cities = []

      if (!this.value.region || !this.value.province) return

      this.cities = this.getFields(
        this.philippines[this.value.region].province_list[this.value.province].municipality_list
      )
    },
    onCityTown() {
      this.barangays = []

      if (!this.value.region || !this.value.province || !this.value.cityTown) return

      this.barangays =
        this.philippines[this.value.region].province_list[this.value.province].municipality_list[
          this.value.cityTown
        ].barangay_list
    },
    update(key, val) {
      const fields = { region: '', province: '', cityTown: '', barangay: '' }
      let obj = {}

      if (key === 'country') {
        const { region, province, cityTown, barangay } = fields
        obj = { region, province, cityTown, barangay }
      } else if (key === 'region') {
        const { province, cityTown, barangay } = fields
        obj = { province, cityTown, barangay }
      } else if (key === 'province') {
        const { cityTown, barangay } = fields
        obj = { cityTown, barangay }
      } else if (key === 'cityTown') {
        const { barangay } = fields
        obj = { barangay }
      }

      this.$emit('input', { ...this.value, [key]: val, ...obj })
    }
  },
  watch: {
    'value.country': {
      immediate: true,
      handler(current, previous) {
        if (current !== previous) {
          if (current === 'Philippines') {
            this.onCountry()
          }
        }
      }
    },
    'value.region': {
      immediate: true,
      handler(current, previous) {
        if (current !== previous) {
          if (this.value.country === 'Philippines') {
            this.onRegion()
          }
        }
      }
    },
    'value.province': {
      immediate: true,
      handler(current, previous) {
        if (current !== previous) {
          if (this.value.country === 'Philippines') {
            this.onProvince()
          }
        }
      }
    },
    'value.cityTown': {
      immediate: true,
      handler(current, previous) {
        if (current !== previous) {
          if (this.value.country === 'Philippines') {
            this.onCityTown()
          }
        }
      }
    }
  }
}
</script>
