import React from 'react';
import { mount, shallow } from 'enzyme';
import sinon from 'sinon';
import { SingleDocumentComponent } from
  '../../../components/body/SingleDocumentComponent';
import mockProps from '../../../__mocks__/mockProps.json';
import authMockProps from '../../../__mocks__/authMockProps.json';
import historyMock from '../../../__mocks__/historyMock';

describe('Single Document Page', () => {
  let wrapper;
  let props;
  let setSingleDocument;
  let updateDocument;
  let deleteSingleDocument;
  beforeAll(() => {
    props = authMockProps;
    setSingleDocument = jest.fn(() => Promise.resolve(false));
    deleteSingleDocument = jest.fn(() => Promise.resolve(true));
    updateDocument = jest.fn(() => Promise.resolve(true));
    wrapper = mount(
      <SingleDocumentComponent
        history={historyMock}
        {...props}
        setSingleDocument={setSingleDocument}
        deleteSingleDocument={deleteSingleDocument}
        updateDocument={updateDocument}
      />
    );
    wrapper.setState({
      errors: {
        document: {
          message: 'error'
        }
      },
    });
  });

  describe('Rendering', () => {
    it('displays a loading gif when loading', () => {
      wrapper.setState({
        loading: true
      });
      expect(wrapper.find('#loading')).toHaveLength(1);
    });

    it('displays error message if document is not found', () => {
      const shallowWrapper = shallow(
        <SingleDocumentComponent
          history={historyMock}
          {...props}
          setDocumentCardument={setSingleDocument}
          deleteDocumentCardument={deleteSingleDocument}
          updateDocument={updateDocument}
        />
      );
      shallowWrapper.setState({
        loading: false,
        documentNotFound: true
      });
      expect(shallowWrapper.find('#notFound')).toHaveLength(1);
      shallowWrapper.setState({
        errors: {
          document: {
            message: ''
          }
        }
      });
      expect(shallowWrapper.find('#503')).toHaveLength(1);
    });
  });

  describe('React Lifecycles', () => {
    it('redirects unauthenticated user on component Mount', () => {
      const wrapper2 = mount(
        <SingleDocumentComponent
          history={historyMock}
          {...mockProps}
          setDocumentCardument={setSingleDocument}
          deleteDocumentCardument={deleteSingleDocument}
          updateDocument={updateDocument}
        />
      );
      wrapper2.instance().componentDidMount();
    });

    it('receives props', () => {
      const nextProps = {
        document: {
          access: 1,
          title: 'Hello world',
          content: 'Hello World',
          userId: 1,
          roleId: 1
        },
        editedAccess: 1,
        editedTitle: 'Hello',
        errors: [],
      };
      wrapper.instance().componentWillReceiveProps(nextProps);
    });

    it('unmount', () => {
      const spy = sinon.spy(SingleDocumentComponent.prototype,
          'componentWillUnmount');
      wrapper.instance().componentWillUnmount();
      expect(spy.called).toBeTruthy();
    });
  });

  describe('Class Methods', () => {
    describe('OnChange Method', () => {
      it('sets form input to state when called', () => {
        expect(wrapper.instance().state.input).toBeUndefined();
        wrapper.instance().onChange(global.e);
        expect(wrapper.instance().state.input).toEqual('input');
      });
    });

    describe('addEditor Method', () => {
      it('initialize tinymce editor when called', () => {
        expect(wrapper.instance().state.editorOpen).toBeFalsy();
        wrapper.instance().addEditor();
        expect(wrapper.instance().state.editorOpen).toBeTruthy();
      });
    });

    describe('removeEditor Method', () => {
      it('remove tinymce editor when called', () => {
        expect(wrapper.instance().state.editorOpen).toBeTruthy();
        wrapper.instance().removeEditor();
        expect(wrapper.instance().state.editorOpen).toBeFalsy();
      });
    });

    describe('saveChanges Method', () => {
      const newState = {
        editorOpen: true,
        document: {
          access: 1,
          title: 'Hello world',
          content: 'Hello World',
          userId: 1,
          roleId: 1
        },
        loading: false
      };

      it('saves edited documents when called', () => {
        const spy = sinon.spy(SingleDocumentComponent.prototype,
          'saveChanges');
        const shallowWrapper = shallow(
          <SingleDocumentComponent
            history={historyMock}
            {...props}
            setDocumentCardument={setSingleDocument}
            deleteDocumentCardument={deleteSingleDocument}
            updateDocument={updateDocument}
          />
        );
        shallowWrapper.setState(newState);
        shallowWrapper.find('#saveChanges').simulate('click');
        expect(spy.called).toBeTruthy();
      });

      it('displays a modal for successful update', () => {
        const updateDocumentSuccess = jest.fn(() => Promise.resolve(false));
        const shallowWrapper = shallow(
          <SingleDocumentComponent
            history={historyMock}
            {...props}
            setDocumentCardument={setSingleDocument}
            deleteDocumentCardument={deleteSingleDocument}
            updateDocument={updateDocumentSuccess}
          />
        );
        shallowWrapper.setState(newState);
      });
    });

    describe('deleteDocument Method', () => {
      const newState = {
        editorOpen: false,
        document: {
          access: 1,
          title: 'Hello world',
          content: 'Hello World',
          userId: 1,
          roleId: 1
        },
        loading: false
      };
      it('deletes a single documents when called', () => {
        const spy = sinon.spy(SingleDocumentComponent.prototype,
          'deleteDocument');
        const shallowWrapper = shallow(
          <SingleDocumentComponent
            history={historyMock}
            {...props}
            setDocumentCardument={setSingleDocument}
            deleteDocumentCardument={deleteSingleDocument}
            updateDocument={updateDocument}
          />
        );
        shallowWrapper.setState(newState);
        shallowWrapper.find('#deleteDocument').simulate('click');
        expect(spy.called).toBeTruthy();
      });
    });
  });
});
