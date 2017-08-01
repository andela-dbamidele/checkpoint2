import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter as Router } from 'react-router-dom';
import DocumentCard from '../../../../components/body/cards/DocumentCard';

describe('Single Document Page', () => {
  const props = {
    id: 1,
    title: 'hello world',
    date: '2-3-4',
    access: 1
  };

  const wrapper = mount(
    <Router>
      <DocumentCard {...props} />
    </Router>
  );

  it('renders', () => {
    expect(wrapper.find('#DocumentCard'))
    .toHaveLength(1);
  });
});
