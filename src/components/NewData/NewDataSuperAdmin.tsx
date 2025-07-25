import GenericTable, {Column} from '../Forms/Table/GenericTable';

// Define the type for the new data list
type NewDataItem = {
  DateTime: string;
  Language: string;
  Type: string;
  Name: string;
};

// Sample data for new data
const newDataItems: NewDataItem[] = [
  {
    DateTime: '2024-09-09 12:00:00',
    Language: 'English',
    Type: 'Tutorial',
    Name: 'React Basics',
  },
  {
    DateTime: '2024-09-08 14:30:00',
    Language: 'Spanish',
    Type: 'Documentation',
    Name: 'Vue.js Guide',
  },
];

// Define the columns for the new data table
const columns: Column<NewDataItem>[] = [
  {header: 'Date&Time', accessor: 'DateTime', sortable: true},
  {header: 'Language', accessor: 'Language', sortable: true},
  {header: 'Type', accessor: 'Type', sortable: true},
  {header: 'Name', accessor: 'Name', sortable: true},
];

// Main component rendering the new data table
const NewDataSuperAdmin = () => {
  return (
    <GenericTable
      data={newDataItems}
      columns={columns}
      title="New Data"
      action
      onDelete={() => {}}
      onEdit={() => {}}
    />
  );
};

export default NewDataSuperAdmin;
