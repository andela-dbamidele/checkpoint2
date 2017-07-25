import React from 'react';
import { shallow } from 'enzyme';
import DocHeader from '../../../components/body/document/DocHeader';
import DocListing from '../../../components/body/document/DocListing';
import DocumentsPage from '../../../components/body/DocumentsPage';

describe('DocumentsPage', () => {
  it('should render', () => {
    const wrapper = shallow(<DocumentsPage />);
    expect(wrapper.find(DocHeader)).toHaveLength(1);
    expect(wrapper.find(DocListing)).toHaveLength(1);
  });
});
