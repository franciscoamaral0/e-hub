import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Container,
  Avatar,
  Menu,
  MenuItem,
  Divider
} from '@material-ui/core';

import Link from 'next/link'
import Image from 'next/image'
import MenuIcon from '@material-ui/icons/Menu'
import { makeStyles } from '@material-ui/core';
import { AccountCircle } from '@material-ui/icons';
import { useState } from 'react';
import {useSession, signOut} from 'next-auth/client'
import LogoEHub from '../../public/images/eHub_logo-removebg-preview.png'

const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title:{
    flexGrow: 1,
    padding:'15px 0 15px 0'
  },
  userName:{
    marginLeft: 8
  },
  divider:{
    margin: '14px 0'
  }
}))
const Header = () =>  {
  const classes = useStyles()
  const [session] = useSession()
  const [anchorUserMenu, setAnchorUserMenu] = useState(false)


  const openUserMenu = Boolean(anchorUserMenu)



  return (
    <> 
      <AppBar position='static' elevation={5}>
        <Container maxWidth='lg'> 
          <Toolbar>
            {/* <Link href='/' passHref> add route to / */}
            <Box variant='h6' className={classes.title}>
              <Image src={LogoEHub} alt='logo' width={110} height={50}/> 
            </Box>
            {/* </Link>   */}
            <Link href={session ? '/user/publish' : '/auth/signin'} passHref>
              <Button variant='outlined' color='inherit'>Anunciar e Vender</Button>
            </Link>
            
            {
              session 
                ? (
                  <IconButton color= 'secondary' onClick={(e) => setAnchorUserMenu(e.currentTarget)} >
                  {
                    session.user.image ?
                    <Avatar src={session.user.image} /> :
                    <AccountCircle/>

                  }
                    <Typography className={classes.userName} variant='subtitle2' color='secondary'>
                      {session.user.name}
                    </Typography>
                  </IconButton>

                ) : null
            }
            
            

            <Menu
            anchorEl={anchorUserMenu}
            open={openUserMenu}
            onClose={() => setAnchorUserMenu(null)}
            anchorOrigin={{
              vertial:'top',
              horizontal:'right',
            }}
            >
              <MenuItem>Dashboard</MenuItem>
              <MenuItem>Meus Anuncios</MenuItem>
              <MenuItem>Publicar Novo Anuncio</MenuItem>
              <Divider className={classes.divider}/>
              <MenuItem onClick={() => signOut({callbackUrl: '/'})}>Sair</MenuItem>
            </Menu>


          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
}


export default Header