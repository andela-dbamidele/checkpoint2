import React from 'react';
import { mount, /** shallow */ } from 'enzyme';
// import { MemoryRouter as Router } from 'react-router-dom';
// import mockProps from '../../../../__mocks__/mockProps.json';
import authMockProps from '../../../../__mocks__/authMockProps.json';
import historyMock from '../../../../__mocks__/historyMock';
import { DocListing } from '../../../../components/body/document/DocListing';
// import SingleDoc from '../../../../components/body/document/SingleDoc';

describe('Document Listing Component', () => {
  const createDocument = jest.fn()
    .mockImplementationOnce(() => Promise.resolve({}))
    .mockImplementationOnce(() => Promise.resolve(
      { title: 'title is required' }));
  const getDocuments = jest.fn(() => Promise.resolve(true));
  const searchDocuments = jest.fn(() => Promise.resolve(true));
  const wrapper = mount(
    <DocListing
      history={historyMock}
      createDocument={createDocument}
      getDocuments={getDocuments}
      searchDocuments={searchDocuments}
      {...authMockProps}
    />
  );

  describe('Rendering', () => {
    it('renders without crashing', () => {
      expect(wrapper.find('#doclisting'))
      .toHaveLength(1);
    });

    // it('contains `SingleDoc` component', () => {
      // const shallowWrapper = shallow(
      //   <DocListing
      //     history={historyMock}
      //     createDocument={createDocument}
      //     getDocuments={getDocuments}
      //     searchDocuments={searchDocuments}
      //     {...authMockProps}
      //   />
      // );

    //   console.log(shallowWrapper.find(<SingleDoc />));
    // });
  });

  describe('Class methods', () => {
    describe('ComponentWillReceiveProps', () => {
      it('sets new props to state on call', () => {
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
        const spy = jest.spyOn(wrapper.instance(), 'onChange');
        wrapper.find('#access')
        .simulate('change', { target: { name: 'access', value: 'value' } });
        expect(spy).toHaveBeenCalled();
        spy.mockReset();
        spy.mockRestore();
      });
    });

    describe('handleEditorChange method', () => {
      it('sets value of input box to state', () => {
        const content = 'hello world';
        wrapper.instance().handleEditorChange(content);
        expect(wrapper.instance().state.content)
        .toEqual('hello world');
      });
    });

    describe('openModal method', () => {
      it('opens modal for writing new document', () => {
        const spy = jest.spyOn(wrapper.instance(), 'openModal');
        wrapper.find('#openModal')
        .simulate('click');
        expect(spy).toHaveBeenCalled();
        spy.mockReset();
        spy.mockRestore();
      });
    });

    describe('saveDocument method', () => {
      it('saves document to the database', () => {
        const spy = jest.spyOn(wrapper.instance(), 'saveDocument');
        wrapper.find('#saveDocument')
        .simulate('click');
        expect(spy).toHaveBeenCalled();
        spy.mockReset();
        spy.mockRestore();
      });

      it('returns error for missing fields', () => {
        const spy = jest.spyOn(wrapper.instance(), 'saveDocument');
        wrapper.find('#saveDocument')
        .simulate('click');
        expect(spy).toHaveBeenCalled();
        spy.mockReset();
        spy.mockRestore();
      });
    });

    describe('cancelDocument method', () => {
      it('close the document modal', () => {
        const spy = jest.spyOn(wrapper.instance(), 'cancelDocument');
        wrapper.find('#closeModal')
        .simulate('click');
        expect(spy).toHaveBeenCalled();
        spy.mockReset();
        spy.mockRestore();
      });
    });

    describe('handlePageClick Method', () => {
      it('gets the next set of documents based on limit', () => {
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
        // const shallowWrapper = mount(
        //   <Router>
        //     <DocListing
        //       history={historyMock}
        //       createDocument={createDocument}
        //       getDocuments={getDocuments}
        //       searchDocuments={searchDocuments}
        //       {...authMockProps}
        //     />
        //   </Router>
        // );
        // shallowWrapper.setState({
        //   documents: [
        //     {
        //       id: 1,
        //       title: 'hello world',
        //       date: '2-4-7',
        //       access: 1,
        //     }
        //   ],
        //   pageCount: 1
        // });
        // console.log(shallowWrapper.find('li.active'));
      });
    });
  });
});
