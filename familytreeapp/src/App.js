import './App.css';
import TreeView from '@mui/lab/TreeView';
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TreeItem from '@mui/lab/TreeItem';
import Form from './components/Form';
import { useEffect, useRef, useState } from 'react';
import ControlPointRoundedIcon from '@mui/icons-material/ControlPointRounded';
import { styled } from '@mui/system';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import { IconButton } from '@mui/material';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Button from '@mui/joy/Button';
import { data } from './dump.js'
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import Input from '@mui/joy/Input';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import HourglassBottomRoundedIcon from '@mui/icons-material/HourglassBottomRounded';
//  for theme treeitem

const StyledTreeItem = styled(TreeItem)(({ theme }) => ({
  fontSize: 11,
  // Add your custom styles here
  // For example:
  color: '#415a77',
  backgroundColor: "#f1faee",
  fontWeight: 'bold',
  textAlign: "left",
  '& .MuiIconButton-root': {
    // Styles for the icon button
    backgroundColor: "#fefae0",

    // Add more styles as needed
  },
  '& .MuiTreeItem-root .MuiTreeItem-label': {
    // backgroundColor: 'yellow', // Set the background color for children
  },
  '& .MuiTreeItem-root': {
    // backgroundColor: 'yellow', // Set the background color for children
    marginLeft: 30
  },

}));


function App() {
  const [open, setOpen] = useState(false);
  const [memberName, setMemberName] = useState('');
  const [age, setAge] = useState(0)
  const [gender, setGender] = useState("none")
  const selectedNodeRef = useRef(null);
  const [tree, setTree] = useState(data)
  const inputRef = useRef(null);
  const [expanded, setExpanded] = useState([])




  const handleToggle = (event, nodeIds) => {
    setExpanded(nodeIds);
  };

  const handleExpandClick = () => {
    setExpanded((oldExpanded) =>
      oldExpanded.length === 0 ? ['1', '5', '6', '7'] : [],
    );
  };

  const handleNodeSelect = (event, node) => {
    selectedNodeRef.current = node;
    setOpen(true);
  };

  // sync from localstorage 
  const syncData = () => {
    let dataString = localStorage.getItem("data")
    let data = JSON.parse(dataString) || []
    setTree(data)

  }
  const updateData = () => {
    let dataParse = tree
    let dataString = JSON.stringify(dataParse)
    localStorage.setItem("data", dataString)
  }




  useEffect(() => {
    // syncData()
  }, [])
  const handleAddMember = () => {
    // Perform any necessary actions with the entered member name, such as updating the data object or making an API call
    // console.log('New member:', memberName);

    // // Reset the member name and close the dialog box
    // setMemberName('');
    // setOpen(false);

    // Create a new member object with a unique ID and the entered name
    const newMember = {
      id: Date.now().toString(), // Generate a unique ID
      name: memberName,
      age: age,
      gender: gender
    };

    // Find the selected node in the data
    const findNode = (nodes) => {
      if (nodes.id === selectedNodeId) {
        if (!Array.isArray(nodes.children)) {
          nodes.children = [];
        }
        nodes.children.push(newMember);
        return true;
      }
      if (Array.isArray(nodes.children)) {
        return nodes.children.some(findNode);
      }
      return false;
    };

    // Find and update the selected node in the data
    const selectedNodeId = selectedNodeRef.current.id;
    findNode(data);

    // Reset the member name and close the dialog box
    setMemberName('');
    setOpen(false);
    // updateData()
  };

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));


  console.log(tree)
  const renderTree = (nodes) => (
    <StyledTreeItem key={nodes.id} nodeId={nodes.id} sx={{ fontSize: 10 }} label={[nodes.name,
    <IconButton size="small" color="secondary" onClick={(event) => handleNodeSelect(event, nodes)} >
      <ControlPointRoundedIcon sx={{ width: 15, height: 15 }} />
    </IconButton>]}>
      {Array.isArray(nodes.children)
        ? nodes.children.map((node) => renderTree(node))
        : null}
    </StyledTreeItem>
  );
  return (
    <div className="App">

      <Grid spacing={3} sx={{ marginBottom: 1 }}>
        <Grid lg>
          <Button onClick={handleExpandClick} variant="soft">{expanded.length === 0 ? 'Expand all' : 'Collapse all'}</Button>
        </Grid>
        {/* <Grid xs>
          <Button variant="soft"> All</Button>
        </Grid> */}
      </Grid>
      <TreeView
        aria-label="family tree"
        defaultCollapseIcon={<ExpandMoreRoundedIcon />}
        defaultExpandIcon={<ChevronRightIcon />}
        sx={{ height: 240, flexGrow: 1, maxWidth: 500 }}
        expanded={expanded}
        onNodeToggle={handleToggle}
      >
        {renderTree(tree)}

      </TreeView>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Add Family Member</DialogTitle>
        <DialogContent>
          {/* <TextField
            autoFocus
            margin="dense"
            label="Member Name"
            value={memberName}
            onChange={(e) => setMemberName(e.target.value)}
            fullWidth
          /> */}
          <Input onChange={(e) => setMemberName(e.target.value)} value={memberName} startDecorator={<PersonRoundedIcon />} placeholder="Name" sx={{ marginBottom: 1 }} />
          <Input
            sx={{ marginBottom: 1 }}
            startDecorator={<HourglassBottomRoundedIcon />}
            type="number"
            defaultValue={17}
            onChange={(e) => setAge(e.target.value)}
            slotProps={{
              input: {
                ref: inputRef,
                min: 0,
                max: 100,
                step: 1,
              },
            }}
          />
          <Select onChange={(e) => setGender(e.target.value)} defaultValue="none" sx={{ marginBottom: 1 }}>
            <Option value="none">Gender</Option>
            <Option value="male">Male</Option>
            <Option value="female">Female</Option>
          </Select>
          {/* <TextField
            autoFocus
            margin="dense"
            label="Member Name"
            // value={memberName}
            onChange={(e) => setMemberName(e.target.value)}
            fullWidth
          /> */}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAddMember}>Add</Button>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
        </DialogActions>
      </Dialog>

    </div>
  );
}

export default App;





