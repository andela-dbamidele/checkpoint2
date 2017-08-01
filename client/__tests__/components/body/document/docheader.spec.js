import React from 'react';
import { mount, shallow } from 'enzyme';
import sinon from 'sinon';
import mockProps from '../../../../__mocks__/mockProps.json';
import historyMock from '../../../../__mocks__/historyMock';
import { DocHeader } from '../../../../components/body/document/DocHeader';

describe('Document page header', () => {
  describe('Rendering', () => {
    it('Renders', () => {
      const searchDocuments = jest.fn(() => null);
      const wrapper = mount(
        <DocHeader
          {...mockProps}
          searchDocuments={searchDocuments}
          history={historyMock}
        />
      );
      expect(wrapper.find('.doc-header'))
      .toHaveLength(1);
    });
  });

  describe('Class Methods', () => {
    it('search for matching documents when a user starts typing', () => {
      const searchSpy = sinon.spy(DocHeader.prototype, 'searchDoc');
      const searchDocuments = jest.fn(() => Promise.resolve());
      const shallowWrapper = shallow(
        <DocHeader
          {...mockProps}
          searchDocuments={searchDocuments}
          history={historyMock}
        />
      );
      shallowWrapper.find('#searchDocs')
      .simulate('change', { target: { value: 'hello' } });
      expect(searchSpy.called)
      .toBeTruthy();
    });
  });
});
