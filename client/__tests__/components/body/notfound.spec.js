import React from 'react';
import { mount } from 'enzyme';
import NotFound from '../../../components/body/NotFound';

describe('Page Not Found Component', () => {
  const wrapper = mount(<NotFound />);
  it('should render', () => {
    expect(wrapper.find('#notfound').exists())
    .toBeTruthy();
  });
});
