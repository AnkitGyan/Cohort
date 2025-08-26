
import './App.css'
import { RecoilRoot, useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { JobAtom, MessageAtom, NetworkAtom, NotificationAtom, TotalNotificationCount } from './atoms'

function App(){
  return(
  <RecoilRoot>
    <MainApp/>
  </RecoilRoot>
  );
}

function MainApp() {
  const networkCount = useRecoilValue(NetworkAtom);
  const JobCount = useRecoilValue(JobAtom); 
  const [messageCount, setMessagingCount] = useRecoilState(MessageAtom);
  const NotiCount = useRecoilValue(NotificationAtom);
  const TOtalNotiCount = useRecoilValue(TotalNotificationCount);

  return (
    <>
      <button>Home</button>
      <button>My Network ({networkCount >=100 ? "99+" : networkCount})</button>
      <button>Job ({JobCount})</button>
      <button>Messages ({messageCount})</button>
      <button>Notification ({NotiCount})</button>
      <button onClick={()=>{setMessagingCount(messageCount + 1)}}>Me ({TOtalNotiCount})</button>
  
    </>
  )
}

export default App
