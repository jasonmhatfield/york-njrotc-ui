import React, { useState } from 'react';
import { People, Event, Info, Settings, Logout } from '@mui/icons-material';
import ManageCadets from './ManageCadets';
import ManageEvents from './ManageEvents';
import ManageUnit from './ManageUnit';
import { Card, Button } from './common/StyledComponents';
import styled from 'styled-components';
import { theme } from '../../styles/theme';

const AdminDashboard = styled.div`
    display: flex;
    justify-content: center;
    height: 95vh;
    background-color: ${theme.colors.background};
`;

const Sidebar = styled.div`
    width: 250px;
    background-color: ${theme.colors.surface};
    padding: ${theme.spacing.md};
`;

const Logo = styled.div`
    font-size: 24px;
    font-weight: bold;
    color: ${theme.colors.primary};
    margin-bottom: ${theme.spacing.xl};
`;

const MenuItem = styled(Button)`
    display: flex;
    align-items: center;
    width: 100%;
    justify-content: flex-start;
    margin-bottom: ${theme.spacing.sm};
    background-color: ${props => props.active ? theme.colors.primary : 'transparent'};
    color: ${props => props.active ? theme.colors.textLight : theme.colors.text};

    &:hover {
        background-color: ${props => props.active ? theme.colors.primary : theme.colors.background};
    }
`;

const Content = styled.div`
    flex: 1;
    padding: ${theme.spacing.md};
`;

const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: ${theme.spacing.md};
`;

const Title = styled.h1`
    font-size: 28px;
    font-weight: bold;
    color: ${theme.colors.text};
`;

const Dashboard = () => {
  const [activeSection, setActiveSection] = useState('Cadets');

  const menuItems = [
    { name: 'Cadets', icon: <People /> },
    { name: 'Events', icon: <Event /> },
    { name: 'Unit Info', icon: <Info /> },
    { name: 'Settings', icon: <Settings /> },
  ];

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'Cadets':
        return <ManageCadets />;
      case 'Events':
        return <ManageEvents />;
      case 'Unit Info':
        return <ManageUnit />;
      case 'Settings':
        return <div>Settings Component</div>;
      default:
        return null;
    }
  };

  return (
    <AdminDashboard>
      <Sidebar>
        <Logo>NJROTC</Logo>
        {menuItems.map((item) => (
          <MenuItem
            key={item.name}
            active={activeSection === item.name}
            onClick={() => setActiveSection(item.name)}
          >
            {item.icon}
            {item.name}
          </MenuItem>
        ))}
      </Sidebar>
      <Content>
        <Header>
          <Title>{activeSection}</Title>
          <Button variant="secondary">
            <Logout /> Logout
          </Button>
        </Header>
        <Card>
          {renderActiveSection()}
        </Card>
      </Content>
    </AdminDashboard>
  );
};

export default Dashboard;