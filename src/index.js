import DisplayFields from './DisplayFields.vue';

const LibraryModule = {
  DisplayFields,

  install(Vue) {
    // Register components with vue
    Vue.component('vfg-display-fields', DisplayFields);
  },
};

// Export library
export default LibraryModule;

// Export components
export { DisplayFields };
