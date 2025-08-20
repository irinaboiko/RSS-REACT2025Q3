import { UsersList } from '@/components/UsersList';

function App() {
  return (
    <>
      <div>
        <button>Open Controlled Modal</button>
        <button>Open Uncontrolled Modal</button>
      </div>
      <div>
        <UsersList />
      </div>
    </>
  );
}

export default App;
