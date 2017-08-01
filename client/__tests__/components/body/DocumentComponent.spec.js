import React from 'react';
import { shallow } from 'enzyme';
import DocumentsComponent from '../../../components/body/DocumentsComponent';

describe('DocumentsComponent', () => {
  it('should render', () => {
    const wrapper = shallow(<DocumentsComponent />);
    expect(wrapper.find('.documents-wrapper')).toHaveLength(1);
  });
});
