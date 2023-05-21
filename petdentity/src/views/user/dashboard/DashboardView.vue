<template>
  <v-container>
    <v-row class="pa-16">
      <v-col cols="12" sm="6" md="4" v-for="item in items" :key="item">
        <v-btn color="primary" class="pa-5" :height="item.height" block :disabled="item.disabled">
          <template v-slot:default>
            <v-row>
              <v-col>
                <v-icon class="text-h1" size="x-large">{{ item.icon }}</v-icon>
                <div>{{ item.title }}</div>
              </v-col>
            </v-row>
          </template>
        </v-btn>
      </v-col>
    </v-row>

    <Button color="primary">sample</Button>
  </v-container>
</template>

<script setup>
import Button from '@/components/common/Button.vue'
const items = [
  {
    icon: 'mdi-card-account-details-star-outline',
    title: 'Pet Owner',
    height: 200,
    disabled: false,
    handler: () => {}
  },
  {
    // icon: 'mdi-doctor',
    icon: 'mdi-stethoscope',
    title: 'Veterinarian Area',
    height: 200,
    disabled: false,
    handler: () => {}
  },
  {
    icon: 'mdi-shield-star',
    title: 'Local Government Unit',
    height: 200,
    disabled: false,
    handler: () => {}
  },
  {
    icon: 'mdi-magnify',
    title: 'Pet Information',
    height: 200,
    disabled: false,
    handler: () => {}
  },
  {
    icon: 'mdi-paw',
    title: 'Missing and Found Pets',
    height: 200,
    disabled: true,
    handler: () => {}
  },
  {
    icon: 'mdi-needle',
    title: 'Pet Vaccination',
    height: 200,
    disabled: true,
    handler: () => {}
  },
  {
    icon: 'mdi-calendar',
    title: 'Upcoming Events',
    height: 200,
    disabled: true,
    handler: () => {}
  },
  {
    icon: 'mdi-cash',
    title: 'Points and Rewards',
    height: 200,
    disabled: true,
    handler: () => {}
  },

  {
    icon: 'mdi-account-network',
    title: 'Administrator',
    height: 200,
    disabled: false,
    handler: () => {}
  }
]
</script>
