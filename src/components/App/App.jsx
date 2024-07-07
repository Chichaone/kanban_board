import { Theme, presetGpnDefault } from '@consta/uikit/Theme';
import HomePage from '../pages/HomePage';

function App()
{
  return (
    <Theme preset={presetGpnDefault}>
      <HomePage />
    </Theme>
  );
}

export default App;
