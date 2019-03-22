import { shallowMount } from '@vue/test-utils';
import DisplayFields from '@/DisplayFields.vue';

describe('DisplayFields.vue', () => {
  it('renders props.msg when passed', () => {
    const obj = { id: 1 };
    const schema = {
      fields: [{
        type: 'input',
        inputType: 'text',
        label: 'ID',
        model: 'id',
        readonly: true,
        featured: false,
        disabled: true,
      }],
    };
    const wrapper = shallowMount(DisplayFields, {
      propsData: { schema, obj },
    });
    expect(wrapper.text()).toMatch('xx');
  });
});
