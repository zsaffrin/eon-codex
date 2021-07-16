import { FirebaseProvider, UserProvider } from '../../contexts';

const App = () => {
  return (
    <FirebaseProvider>
      <UserProvider>
        <div>
          FIVE
        </div>
      </UserProvider>
    </FirebaseProvider>
  );
};

export default App;