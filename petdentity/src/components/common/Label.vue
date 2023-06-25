<template>
  <div :class="customClass"><slot /></div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  title: Boolean,
  subtitle: Boolean,
  header: Boolean,
  text: Boolean,
  caption: Boolean,

  black: Boolean,
  bold: Boolean,
  medium: Boolean,
  regular: Boolean,
  light: Boolean,
  thin: Boolean,
  italic: Boolean,

  none: Boolean,
  noUnderlineLink: Boolean,
  lineOver: Boolean,
  lineThrough: Boolean,
  lineUnder: Boolean,

  uppercase: Boolean,
  lowercase: Boolean,
  capitalize: Boolean,

  disabled: Boolean,
});

const customClass = computed(() => {
  let classes = [];

  if (props.title) classes.push("text-h4");
  if (props.subtitle) classes.push("text-subtitle-1");
  if (props.header) classes.push("text-h5");
  if (props.text) classes.push("text-body-1");
  if (props.caption) classes.push("text-caption");

  if (props.black) classes.push("font-weight-black");
  if (props.bold) classes.push("font-weight-bold");
  if (props.medium) classes.push("font-weight-medium");
  if (props.regular) classes.push("font-weight-regular");
  if (props.light) classes.push("font-weight-light");
  if (props.thin) classes.push("font-weight-thin");
  if (props.italic) classes.push("font-weight-italic");

  if (props.none) classes.push("text-decoration-none");
  if (props.noUnderlineLink) classes.push("font-weight-italic");
  if (props.lineOver) classes.push("text-decoration-line-over");
  if (props.lineThrough) classes.push("text-decoration-line-through");
  if (props.lineUnder) classes.push("text-decoration-line-under");

  if (props.uppercase) classes.push("text-uppercase");
  if (props.lowercase) classes.push("text-lowercase");
  if (props.capitalize) classes.push("text-capitalize");

  if (props.disabled) classes.push("text-disabled");

  return classes;
});
</script>

<style scoped></style>
