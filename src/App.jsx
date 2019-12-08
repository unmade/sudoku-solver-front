import React from 'react';
import { Route } from 'react-router-dom';
import {
  grommet, Box, Grid, Grommet, Button, Text,
} from 'grommet';
import { User, Menu } from 'grommet-icons';
import BlankGrid from './pages/BlankGrid';
import Daily from './pages/Daily';


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
          <Box
            gridArea="header"
            direction="row"
            align="center"
            justify="between"
            pad={{ horizontal: 'medium', vertical: 'small' }}
          >
            <Button icon={<Menu />} onClick={() => this.toggleSidebar()} />
            <Button icon={<User />} onClick={() => {}} />
          </Box>
          {isSidebarOpen && (
            <Box
              gridArea="sidebar"
              gap="medium"
              pad="medium"
              animation={[
                { type: 'fadeIn', duration: 300 },
                { type: 'slideRight', size: 'xlarge', duration: 150 },
              ]}
            >
              {[{ name: 'Blank Grid', href: 'blank' }, { name: 'Daily Sudoku', href: '/' }].map((item) => (
                <Button key={item.name} href={item.href} hoverIndicator>
                  <Box pad={{ horizontal: 'medium', vertical: 'small' }}>
                    <Text size="large">{item.name}</Text>
                  </Box>
                </Button>
              ))}
            </Box>
          )}
          <Box gridArea="main" justify="center">
            <Route exact path="/" component={Daily} />
            <Route path="/blank" component={BlankGrid} />
          </Box>

        </Grid>
      </Grommet>
    );
  }
}


export default App;
