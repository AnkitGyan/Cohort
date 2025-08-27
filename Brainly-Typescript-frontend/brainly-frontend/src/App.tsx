import {Button} from "./components/ui/button/Button";
import { Card } from "./components/ui/card/Card";
import { PlusIcon } from "./icons/PlusIcon";
import { ShareIcon } from "./icons/ShareIcon";

function App() {
  return (
    <>
    <div className="flex gap-2">
      <Button 
        variant="secondary"
        size="md"
        text="Share Content"
        startIcon= {<ShareIcon/>}
        onClick={() => console.log("working")}/>
       <Button 
        variant="primary"
        size="md"
        text="Add Content"
        startIcon= {<PlusIcon/>}
        onClick={() => console.log("working")}
      />
    </div>
    <Card/>
    </>
    
  );
}

export default App;
