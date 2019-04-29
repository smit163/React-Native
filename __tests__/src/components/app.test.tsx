

/**
 * @format
 */
import 'react-native'
import React from 'react';
import { ApolloProvider } from 'react-apollo';
import App from '../../../src/App'

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import ApolloClient from 'apollo-client';
import { NETWORK_INTERFACE } from '../../../src/config/api';
import { HttpLink, InMemoryCache } from 'apollo-boost';
import toJson from 'enzyme-to-json';

it('renders correctly', () => {
    const client = new ApolloClient({
        link: new HttpLink({ uri: NETWORK_INTERFACE }),
        cache: new InMemoryCache()
    });
 const tree = renderer.create(<ApolloProvider client={client}>
    <App/>
</ApolloProvider>);

expect(toJson(tree)).toMatchSnapshot();
});