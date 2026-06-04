import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import App from '../App.vue'

describe('App', () => {
  it('mounts renders properly', () => {
    const wrapper = mount(App)
    let text = wrapper.text();
    expect(text).toBe("Create your own domain or insert your domain DomainDomain Continue");
  })
})
