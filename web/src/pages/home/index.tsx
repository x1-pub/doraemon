import { Button } from "antd";
import { useNavigate } from 'react-router'

const Home = () => {
  const navigate = useNavigate()
  return <>
    <span>home</span>
    <Button onClick={() => navigate('/detail')}>detail</Button>
  </>
  
}

export default Home