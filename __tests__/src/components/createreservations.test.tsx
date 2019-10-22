import React from 'react';
import MakeReservation from '../../../src/components/createreservations';
import Enzyme, { shallow } from 'enzyme';


describe('Testing ReassignLocationMenu component', () => {
  it('renders as expected', () => {
    const wrapper = shallow(
      <MakeReservation />
    );
    expect(wrapper).toMatchSnapshot();
    wrapper.setProps({ count: 1 });
    expect(wrapper).toMatchSnapshot();
  });
})