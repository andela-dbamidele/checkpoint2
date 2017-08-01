import React from 'react';
import { mount } from 'enzyme';
import TinyMceComponent from
  '../../../../components/body/document/TinyMceComponent';

describe('Tinymce Editor Component', () => {
  const handleEditorChange = jest.fn(() => null);
  const wrapper = mount(
    <TinyMceComponent
      id="hello"
      handleEditorChange={handleEditorChange}
      content="Hello world"
    />
  );
  it('renders', () => {
    expect(wrapper.find('#hello'))
    .toHaveLength(1);
    wrapper.instance().componentDidMount();
  });
});
