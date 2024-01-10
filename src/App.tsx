import { useEffect, useState } from 'react'
import './App.css'

const IFRAME_URL = 'https://contact.webdb.build-self.com/tables/2'

interface EventTargetObject {
  type: string;
  payload: {
    width: number
    height: number
    rect: DOMRect
  }
}
type FrameSizeEvent = MessageEvent<EventTargetObject>

const EVENT_TYPE = 'GET_WINDOW_SIZE';
function useIframeSize() {
  const [height, setHeight] = useState<number>(0);
  const [width, setWidth] = useState<number>(0);
  const [rect, setRect] = useState<DOMRect>();

  useEffect(() => {
    const handleMessage = (ev: FrameSizeEvent) => {
      if (!ev?.data?.type) return;
      if (ev.data.type !== EVENT_TYPE) return;
      if (!ev.data?.payload) return;

      setHeight(ev.data.payload.height);
      setWidth(ev.data.payload.width);
      setRect(ev.data.payload.rect);
    };

    window.addEventListener('message', handleMessage);

    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, []);

  return { height, width, rect };
}

function App() {
  const { height } = useIframeSize()
  console.log('height', height);


  return (
    <>
      <iframe
        src={IFRAME_URL}
        width={900}
        height={height}
      />
    </>
  )
}

export default App
