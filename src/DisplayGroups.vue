<template>
  <div>
    <display-fields
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
    'display-fields': () => import('./DisplayFields.vue'),
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
  // beforeCreate() {
  //   // eslint-disable-next-line global-require, max-len
  //   this.$options.components['display-fields'] = require('./DisplayFields.vue').default;
  // },
  mounted() {
    console.log('DG', this.schema, this.obj);
  },
};
</script>

<style scoped>

</style>
