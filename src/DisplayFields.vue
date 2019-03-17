<template>
  <div :class="classObject">
    <p
      v-if="schema.legend"
      :class="`${options.stylePrefix}Overall ${options.stylePrefix}GroupLegend`"
    >
      {{ schema.legend }}
    </p>
    <EachFieldDisplay
      v-for="field in fields"
      :key="field.id"
      :field="field"
    />
    <DisplayGroups
      :schema="schema"
      :obj="obj"
      :options="options"
    />
  </div>
</template>

<script>
import {
  get,
  isArray,
  isEmpty,
  isNil,
} from 'lodash';

import EachFieldDisplay from './eachFieldDisplay';
import DisplayGroups from './DisplayGroups.vue';

export default {
  name: 'DisplayFields',
  components: {
    EachFieldDisplay,
    DisplayGroups,
  },
  props: {
    schema: {
      type: Object,
      required: false,
      default: () => ({
        fields: [],
      }),
    },
    obj: {
      type: Object,
      required: true,
    },
    options: {
      type: Object,
      required: false,
      default: () => ({
        stylePrefix: 'results',
        showNulls: true,
        fieldsOptions: {},
      }),
    },
  },
  computed: {
    fields() {
      const {
        stylePrefix,
        showNulls,
        fieldsOptions,
      } = this.options;

      const schemaFields = this.schema.fields;
      if (!isNil(schemaFields)
        && isArray(schemaFields)
        && !isEmpty(schemaFields)
      ) {
        const fieldsAndValues = schemaFields.map(field => ({
          ...field,
          value: get(this.obj, field.model),
          key: field.model,
          fieldOptions: {
            ...fieldsOptions[field.model],
            stylePrefix,
            showNulls,
          },
        }));
        return fieldsAndValues;
      }

      // Deal with fields without a schema
      const fieldsAndValues = Object.keys(this.obj).map(key => ({
        type: 'unknown',
        key,
        value: this.obj[key],
        fieldOptions: {
          ...fieldsOptions[key],
          stylePrefix,
        },
      }));
      return fieldsAndValues;
    },
    classObject() {
      const obj = {};
      if (this.schema.legend) {
        obj[`${this.options.stylePrefix}Group`] = true;
      }
      return obj;
    },
  },
  mounted() {
    console.log('DF', this.schema, this.obj);
  },
};
</script>

<style scoped>

</style>
