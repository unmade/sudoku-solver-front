import React from 'react';
import { Route } from 'react-router-dom';
import {
  grommet, Box, Grid, Grommet, Button, Text,
} from 'grommet';
import BlankGrid from './pages/BlankGrid';
import Daily from './pages/Daily';
import Random from './pages/Random';
import Sidebar from './components/Sidebar';
import Header from './containers/Header';


const pages = [
  {
    name: 'Blank Grid',
    href: 'blank',
  },
  {
    name: 'Daily Sudoku',
    href: '/daily',
  },
  {
    name: 'Random Sudoku',
    href: '/random',
  },
];


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isSidebarOpen: false,
    };
  }

  toggleSidebar() {
    const { isSidebarOpen } = this.state;
    this.setState({
      isSidebarOpen: !isSidebarOpen,
    });
  }

  render() {
    const { isSidebarOpen } = this.state;
    return (
      <Grommet theme={grommet} full>
        <Grid
          fill
          rows={['auto', 'flex']}
          columns={['auto', 'flex']}
          areas={[
            { name: 'header', start: [0, 0], end: [1, 0] },
            { name: 'sidebar', start: [0, 1], end: [0, 1] },
            { name: 'main', start: [1, 1], end: [1, 1] },
          ]}
        >
          <Header onMenuClick={() => this.toggleSidebar()} />

          <Sidebar open={isSidebarOpen} onClose={() => this.toggleSidebar()}>
            {pages.map((item) => (
              <Button key={item.name} href={item.href} hoverIndicator>
                <Box pad={{ horizontal: 'medium', vertical: 'small' }}>
                  <Text size="large">{item.name}</Text>
                </Box>
              </Button>
            ))}
          </Sidebar>

          <Box gridArea="main" as="main" justify="center">
            <Route exact path="/" component={Daily} />
            <Route exact path="/daily" component={Daily} />
            <Route path="/blank" component={BlankGrid} />
            <Route path="/random" component={Random} />
          </Box>
        </Grid>
      </Grommet>
    );
  }
}


export default App;
