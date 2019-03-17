<template>
  <div>
    <vfg-display-fields
      v-for="group in groups"
      :key="group.legend"
      :schema="group"
      :obj="obj"
      :options="options"
    />
  </div>
</template>

<script>
export default {
  name: 'DisplayGroups',
  components: {
    'vfg-display-fields': () => import('./DisplayFields.vue'),
  },
  props: {
    schema: {
      type: Object,
      required: true,
    },
    obj: {
      type: Object,
      required: true,
    },
    options: {
      type: Object,
      required: true,
    },
  },
  computed: {
    groups() {
      return this.schema.groups || [];
    },
  },
  mounted() {
    console.log('DG', this.schema, this.obj);
  },
};
</script>

<style scoped>

</style>
