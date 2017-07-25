import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter as Router } from 'react-router-dom';
// import mockProps from '../../../../__mocks__/mockProps.json';
import SingleDoc from '../../../../components/body/document/SingleDoc';

describe('Single Document Page', () => {
  const props = {
    id: 1,
    title: 'hello world',
    date: '2-3-4',
    access: 1
  };

  const wrapper = mount(
    <Router>
      <SingleDoc {...props} />
    </Router>
  );

  it('renders', () => {
    expect(wrapper.find('#singledoc'))
    .toHaveLength(1);
  });
});
