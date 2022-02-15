import * as React from 'react';
import { Box, Collapse, AppBar, Divider, Drawer, List, Toolbar, IconButton, Typography, Button, Stack } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import CssBaseline from '@mui/material/CssBaseline';
import { useRecoilState } from 'recoil';
import { userAtom } from '../Atoms/userAtom'
import { Outlet } from "react-router-dom";
import RolesAccess from '../Data/RolesAccess';
import SideAvatar from '../Components/SideAvatar';
import CompleteUserInfoDialog from '../Components/SideDrawer/CompleteUserInfoDialog'
import colors from '../Data/colors';
import { useCookies } from 'react-cookie';

const drawerWidth = 240;
const appBarHeight = 56;

function HomePage(props) {
    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [user, setUser] = useRecoilState(userAtom);
    const [title, setTitle] = React.useState('خانه');
    const [userCookie, setUserCookie] = useCookies(['user'])

    const dataIsComplete = ('name' in user && user.name !== "") && ('surname' in user && user.surname !== "")

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const drawer = (
        <div>
            <SideAvatar />
            <List>
                <Divider />
                {
                user.roles.includes("owner") ? (
                    <div key={"owner"}>
                        <RolesAccess selectedItem={props.selectedItem} role={"owner"} onChanged={(name) => {setTitle(name); handleDrawerToggle();}}/>
                        <Divider />
                    </div>
                 ) :
                user.roles.map((role) => (
                    <div key={role}>
                        <RolesAccess selectedItem={props.selectedItem} role={role} onChanged={(name) => {setTitle(name); handleDrawerToggle();}}/>
                        <Divider />
                    </div>
                ))}
            </List>
            {/* <div className="textCenter">
                <Button variant='text'>
                    درباره‌ی ما
                </Button>
            </div> */}
        </div>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar sx={{ display: { sm: 'none' }, height: appBarHeight }}>
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        onClick={() => setMobileOpen(true)}
                        sx={{ ml: 2 }}>
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div">
                        {title}
                    </Typography>
                </Toolbar>
            </AppBar>
            <Box sx={{ display: 'flex' }}>
                <Box
                    component="nav"
                    sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}>
                        <Collapse orientation="horizontal" in={mobileOpen}>
                    <Drawer
                        transitionDuration={0}
                        dir="rtl"
                        container={container}
                        variant="temporary"
                        open={mobileOpen}
                        anchor='right'
                        onClose={handleDrawerToggle}
                        ModalProps={{ keepMounted: true }}
                        sx={{
                            display: { xs: 'block', sm: 'none' },
                            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                        }}>
                        {drawer}
                    </Drawer>
                    </Collapse>
                    {/* <Collapse orientation="horizontal" in={mobileOpen}> */}
                    <Drawer
                         transitionDuration={0}
                        anchor='right'
                        variant="permanent"
                        sx={{
                            display: { xs: 'none', sm: 'block' },
                            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                        }}
                        open
                    >
                        {drawer}
                    </Drawer>
                    {/* </Collapse> */}
                </Box>
            </Box>
            <Box component="main" sx={{ p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` }, mt: {xs: `${appBarHeight}px`, sm: 0} }}>
                <Outlet />
            </Box>
            <CompleteUserInfoDialog open={!dataIsComplete} onSuccess={(data) => {
                setUserCookie('user', JSON.stringify({...user, ...data.user}))
                setUser({...user, ...data.user});
            }} />
        </Box>
    );
}

export default HomePage;