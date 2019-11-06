import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
// import { ApolloClient } from 'apollo-client';
// import { createHttpLink } from 'apollo-link-http';
import fetch from 'isomorphic-unfetch';
import Head from 'next/head';
import { InMemoryCache } from 'apollo-cache-inmemory';

export function withApollo(PageComponent) {
  const WithApollo = ({ apolloClient, apolloState, ...pageProps }) => {
    const client = apolloClient || initApolloClient(apolloState);
    return (
      <ApolloProvider client={client}>
        <PageComponent {...pageProps} />
      </ApolloProvider>
    );
  };

  //gets data ready to use with SSR
  WithApollo.getInitialProps = async ctx => {
    const { AppTree } = ctx;
    const apolloClient = (ctx.apolloClient = initApolloClient());

    let pageProps = {};
    if (PageComponent.getInitialProps) {
      pageProps = await PageComponent.getInitialProps(ctx);
    }

    //if on server
    if (typeof window === 'undefined') {
      if (ctx.res && ctx.res.finished) {
        return pageProps;
      }
      try {
        //mounts application and gets data before rendering
        const { getDataFromTree } = await import('@apollo/react-ssr');
        await getDataFromTree(
          <AppTree
            pageProps={{
              ...pageProps,
              apolloClient,
            }}
          />
        );
      } catch (e) {
        console.log(e);
      }

      //no component will mount from above, so header needs to be cleared with following
      Head.rewind();
    }
    const apolloState = apolloClient.cache.extract();
    return {
      ...pageProps,
      apolloState,
    };
  };

  return WithApollo;
}
const isDev = process.env.NODE_ENV !== 'production';
const url = isDev
  ? 'http://localhost:3000'
  : 'https://workout-tracker.jordanrendall.now.sh/';

const initApolloClient = (initialState = {}) => {
  const cache = new InMemoryCache().restore(initialState);

  const client = new ApolloClient({
    // uri: 'https://www.graphqlhub.com/graphql',

    uri: `${url}/api/graphql`,
    fetch,
    cache,
  });
  //   const client = new ApolloClient({
  //     ssrMode: true,
  //     // Remember that this is the interface the SSR server will use to connect to the
  //     // API server, so we need to ensure it isn't firewalled, etc
  //     link: createHttpLink({
  //       uri: 'http://localhost:3000/api/graphql',
  //       credentials: 'same-origin',
  //     }),
  //     cache,
  //   });

  return client;
};
