<template>
  <v-container class="mt-3">
    <Sheet>
      <v-row dense>
        <v-col>
          <div class="text-h5">Profile</div>
        </v-col>
      </v-row>

      <v-row dense class="mt-3">
        <v-col>
          <v-divider />
        </v-col>
      </v-row>

      <v-row dense class="mt-5">
        <v-col>
          <div class="text-title">Account</div>
        </v-col>
      </v-row>

      <v-row dense class="mt-5">
        <v-col>
          <div class="text-title">User Details</div>
        </v-col>
      </v-row>
    </Sheet>
  </v-container>
</template>

<script setup>
import Sheet from '@/components/common/Sheet.vue'
</script>

<style></style>
