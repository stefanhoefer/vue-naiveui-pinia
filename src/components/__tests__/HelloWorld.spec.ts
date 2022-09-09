import { describe, it, expect } from 'vitest';

import { mount } from '@vue/test-utils';
import BaseForm from '../BaseForm.vue';

describe('BaseForm', () => {
  it('renders properly', () => {
    const wrapper = mount(BaseForm);
    expect(wrapper.text()).toContain('PAGE NAME');
  });
});
