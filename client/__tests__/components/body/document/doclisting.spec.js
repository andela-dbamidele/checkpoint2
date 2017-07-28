import React from 'react';
import { mount, /** shallow */ } from 'enzyme';
import sinon from 'sinon';
import authMockProps from '../../../../__mocks__/authMockProps.json';
import historyMock from '../../../../__mocks__/historyMock';
import { DocListing } from '../../../../components/body/document/DocListing';
// import DocumentCard from '../../../../components/body/cards/DocumentCard';

describe('Document Listing Component', () => {
  const createDocument = jest.fn()
    .mockImplementationOnce(() => Promise.resolve({}))
    .mockImplementationOnce(() => Promise.resolve(
      { title: 'title is required' }));
  const getDocuments = jest.fn(() => Promise.resolve(true));
  const searchDocuments = jest.fn(() => Promise.resolve(true));

  describe('Rendering', () => {
    it('renders without crashing', () => {
      const wrapper = mount(
        <DocListing
          history={historyMock}
          createDocument={createDocument}
          getDocuments={getDocuments}
          searchDocuments={searchDocuments}
          {...authMockProps}
        />
      );
      expect(wrapper.find('#doclisting'))
      .toHaveLength(1);
    });
  });

  describe('Class methods', () => {
    describe('ComponentWillReceiveProps', () => {
      it('sets new props to state on call', () => {
        const wrapper = mount(
          <DocListing
            history={historyMock}
            createDocument={createDocument}
            getDocuments={getDocuments}
            searchDocuments={searchDocuments}
            {...authMockProps}
          />
        );
        const nextProps = {
          documents: {
            documents: [],
            totalCount: 30,
            search: false,
            searchString: ''
          },
          errors: []
        };
        wrapper.instance().componentWillReceiveProps(nextProps);
        expect(wrapper.instance().state.documents)
        .toEqual([]);
      });
    });

    describe('onChange method', () => {
      it('sets value of input box to state', () => {
        const spy = sinon.spy(DocListing.prototype, 'onChange');
        const wrapper = mount(
          <DocListing
            history={historyMock}
            createDocument={createDocument}
            getDocuments={getDocuments}
            searchDocuments={searchDocuments}
            {...authMockProps}
          />
        );
        wrapper.setProps({
          loading: false
        });
        wrapper.find('#access')
        .simulate('change', { target: { name: 'access', value: 'value' } });
        expect(spy.called).toBeTruthy();
      });
    });

    describe('handleEditorChange method', () => {
      it('sets value of input box to state', () => {
        const wrapper = mount(
          <DocListing
            history={historyMock}
            createDocument={createDocument}
            getDocuments={getDocuments}
            searchDocuments={searchDocuments}
            {...authMockProps}
          />
        );
        const content = 'hello world';
        wrapper.instance().handleEditorChange(content);
        expect(wrapper.instance().state.content)
        .toEqual('hello world');
      });
    });

    describe('openModal method', () => {
      it('opens modal for writing new document', () => {
        const spy = sinon.spy(DocListing.prototype, 'openModal');
        const wrapper = mount(
          <DocListing
            history={historyMock}
            createDocument={createDocument}
            getDocuments={getDocuments}
            searchDocuments={searchDocuments}
            {...authMockProps}
          />
        );
        wrapper.setProps({
          loading: false
        });
        wrapper.find('#openModal')
        .simulate('click');
        expect(spy.called).toBeTruthy();
      });
    });

    describe('saveDocument method', () => {
      it('saves document to the database', () => {
        const spy = sinon.spy(DocListing.prototype, 'saveDocument');
        const wrapper = mount(
          <DocListing
            history={historyMock}
            createDocument={createDocument}
            getDocuments={getDocuments}
            searchDocuments={searchDocuments}
            {...authMockProps}
          />
        );
        wrapper.setProps({
          loading: false
        });
        wrapper.find('#saveDocument')
        .simulate('click');
        expect(spy.called).toBeTruthy();
        spy.restore();
      });

      it('returns error for missing fields', () => {
        const spy = sinon.spy(DocListing.prototype, 'saveDocument');
        const wrapper = mount(
          <DocListing
            history={historyMock}
            createDocument={createDocument}
            getDocuments={getDocuments}
            searchDocuments={searchDocuments}
            {...authMockProps}
          />
        );
        wrapper.setProps({
          loading: false
        });
        wrapper.find('#saveDocument')
        .simulate('click');
        expect(spy.called).toBeTruthy();
      });
    });

    describe('cancelDocument method', () => {
      it('close the document modal', () => {
        const spy = sinon.spy(DocListing.prototype, 'cancelDocument');
        const wrapper = mount(
          <DocListing
            history={historyMock}
            createDocument={createDocument}
            getDocuments={getDocuments}
            searchDocuments={searchDocuments}
            {...authMockProps}
          />
        );
        wrapper.setProps({
          loading: false
        });
        wrapper.find('#closeModal')
        .simulate('click');
        expect(spy.called).toBeTruthy();
      });
    });

    describe('handlePageClick Method', () => {
      it('gets the next set of documents based on limit', () => {
        const wrapper = mount(
          <DocListing
            history={historyMock}
            createDocument={createDocument}
            getDocuments={getDocuments}
            searchDocuments={searchDocuments}
            {...authMockProps}
          />
        );
        wrapper.instance().docsPerPage = 10;
        wrapper.instance().handlePageClick({
          selected: 2
        });
        expect(wrapper.instance().state.offset)
        .toEqual(20);
        // set searching to true to test the second
        // branch of the function
        wrapper.setState({
          search: true
        });
        wrapper.instance().handlePageClick({
          selected: 3
        });
        expect(wrapper.instance().state.offset)
        .toEqual(30);
      });
    });
  });
});
