import React from 'react';
import { mount, shallow } from 'enzyme';
import mockProps from '../../../../__mocks__/mockProps.json';
import historyMock from '../../../../__mocks__/historyMock';
import { DocHeader } from '../../../../components/body/document/DocHeader';

describe('Document page header', () => {
  let wrapper;
  let searchDocuments;
  beforeAll(() => {
    searchDocuments = jest.fn(() => null);
    wrapper = mount(
      <DocHeader
        {...mockProps}
        searchDocuments={searchDocuments}
        history={historyMock}
      />
    );
  });

  describe('Rendering', () => {
    it('Renders', () => {
      expect(wrapper.find('.doc-header'))
      .toHaveLength(1);
    });
  });

  describe('Class Methods', () => {
    it('search for matching documents when a user starts typing', () => {
      const shallowWrapper = shallow(
        <DocHeader
          {...mockProps}
          searchDocuments={searchDocuments}
          history={historyMock}
        />
      );
      const spy = jest.spyOn(shallowWrapper.instance(), 'searchDoc');
      shallowWrapper.find('#searchDocs')
      .simulate('change', { target: { value: 'hello' } });
      expect(spy)
      .toHaveBeenCalled();
      spy.mockReset();
      spy.mockRestore();
    });
  });
});
