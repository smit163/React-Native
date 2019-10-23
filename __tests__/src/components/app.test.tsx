import 'react-native'
import React from 'react';
import { ApolloProvider } from 'react-apollo';
import App from '../../../src/App'

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import { createMockClient } from 'mock-apollo-client';
import toJson from 'enzyme-to-json';

it('renders correctly11', () => {
    const client = createMockClient();
    const tree = renderer.create(<ApolloProvider client={client}><App /></ApolloProvider>);
    expect(toJson(tree)).toMatchSnapshot();
});