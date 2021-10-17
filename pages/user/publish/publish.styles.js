import { makeStyles } from "@material-ui/core";


const useStyles = makeStyles((theme) => ({


  boxContainer: {
    paddingBottom: theme.spacing(3),
  },
  box: {
    backgroundColor: theme.palette.background.white,
    padding: theme.spacing(3),
  },
  inputLabel:{
    fontWeight: 400,
    color: theme.palette.primary.main
  },
  
  loading:{
    display: 'block',
    margin: '10px auto'
  },

}));

export default useStyles