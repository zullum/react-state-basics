import React from 'react';
import styled from '@emotion/styled';
import { CssBaseline } from '@material-ui/core';

import './App.css';
import PokemonInfo from './components/PokemonInfo';
import PokemonFilter from './components/PokemonFilter';
import PokemonTable from './components/PokemonTable';
import { Provider, useDispatch, useSelector } from 'react-redux';
import store from './store';

const Title = styled.h1`
  text-align: center;
`;
const PageContainer = styled.div`
  margin: auto;
  width: 800px;
  padding-top: 1em;
`;
const TwoColumnLayout = styled.div`
  display: grid;
  grid-template-columns: 80% 20%;
  grid-column-gap: 1rem;
`;

function App() {
  const dispatch = useDispatch();
  const pokemon = useSelector((state) => state.pokemon);

  React.useEffect(() => {
    fetch('/starting-react/pokemon.json')
      .then((resp) => resp.json())
      .then((data) =>
        dispatch({
          type: 'SET_POKEMON',
          payload: data,
        })
      );
  }, [dispatch]);

  if (!pokemon) {
    return <div>Loading data</div>;
  }

  return (
    <PageContainer>
      <CssBaseline />
      <Title>Pokemon Search</Title>
      <TwoColumnLayout>
        <div>
          <PokemonFilter />

          <PokemonTable />
        </div>
        <PokemonInfo />
      </TwoColumnLayout>
    </PageContainer>
  );
}

export default () => (
  <Provider store={store}>
    <App />
  </Provider>
);
