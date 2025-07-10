<template>
  <v-dialog v-bind="$props">
    <v-card rounded="lg">
      <v-toolbar class="py-2" color="green" v-if="$attrs['hide-toolbar'] !== ''" border>
        <v-list-item class="pl-2" density="compact">
          <template v-if="$attrs.icon" v-slot:prepend>
  <v-avatar class="mr-1" variant="text">
    <v-icon :icon="$attrs.icon" dark />
  </v-avatar>
</template>
          <v-list-item-title>{{ $attrs.title }}</v-list-item-title>
          <v-list-item-subtitle v-if="$attrs.subtitle">{{ $attrs.subtitle }}</v-list-item-subtitle>
        </v-list-item>

        <v-spacer />
        <v-btn class="mr-0" @click="$emit('update:modelValue', false)" rounded="0" icon="mdi-close" />
      </v-toolbar>
      <slot name="default" />
      <v-divider />
      <v-card-actions>
        <v-row dense justify="center">
          <v-col cols="5">
            <v-btn variant="tonal" color="error" @click="$emit('update:modelValue', false)" block>CANCEL</v-btn>
          </v-col>
          <v-col cols="5">
            <v-btn variant="tonal" color="success" @click="submitForm" block>
              {{ submitText }}
            </v-btn>
          </v-col>
        </v-row>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    submitText: String,
    icon: String,
  },
  methods: {
    submitForm() {
      this.$emit('submit');
    },
  },
};
</script>
