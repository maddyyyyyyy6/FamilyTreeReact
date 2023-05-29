import './App.css';
import Button from '@mui/material/Button';
import TreeView from '@mui/lab/TreeView';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TreeItem from '@mui/lab/TreeItem';
import Form from './components/Form';
const data = {
  id: 'root',
  name: 'Pemaram',
  children: [
    {
      id: '1',
      name: 'Narayanram',
    },
    {
      id: '2',
      name: 'Khushalaram',
    },
    {
      id: '3',
      name: 'Chainaram',
    },
    {
      id: '4',
      name: 'Danaram',
    },
    {
      id: '5',
      name: 'Purkharam',
    },
    {
      id: '3',
      name: 'Child - 3',
      children: [
        {
          id: '4',
          name: 'Child - 4',
        },
      ],
    },
  ],
};

function App() {

  const renderTree = (nodes) => (
    <TreeItem key={nodes.id} nodeId={nodes.id} label={nodes.name}>
      {Array.isArray(nodes.children)
        ? nodes.children.map((node) => renderTree(node))
        : null}
    </TreeItem>
  );
  return (
    <div className="App">
      <Form />
      <TreeView
        aria-label="family tree"
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpandIcon={<ChevronRightIcon />}
        sx={{ height: 240, flexGrow: 1, maxWidth: 500 }}
      >
        {renderTree(data)}
      </TreeView>

    </div>
  );
}

export default App;
