
import './App.css';
import curtain from '../src/images/curtain.png'
import{motion} from 'framer-motion';
import Masonry from '@mui/lab/Masonry';
import { useEffect, useState } from 'react';
import {BiSearchAlt} from 'react-icons/bi';

function App() {
  const [img, setImg] = useState("");
  const [res, setRes] = useState([]);
  
  const fetchRequest = async() => {
    const data = await fetch(`https://api.unsplash.com/search/photos?page=1&query=${img}&client_id=${process.env.REACT_APP_API_KEY}`);
    const dataJ = await data.json();
    const result = await dataJ.results;
    setRes(result);
    console.log(res);
  }

  const submit = () =>{
    fetchRequest();
  }
  useEffect(() => {
    fetchRequest();
  }, [])

  return (
    <div  className='bg-[#184642] text-[#978d61] h-screen overflow-auto' >
      <img  src={curtain} alt="curtain" className='h-full absolute'/>
      <motion.h1 animate={{scale: [1.5 ,1] , opacity:1}} initial={{opacity:0}} exit={{opacity:0}} transition={{ ease: "easeIn", duration: 10 }} className='text-9xl w-4/5 m-auto text-center pt-32 milky max-[600px]:text-5xl' >Collectionary</motion.h1>
      <div className='text-center satoshi pb-32 mt-24 flex align-center justify-center'>
      <input placeholder='Enter ....' className='bg-transparent rounded-full p-4 placeholder:text-[#978d61] border-[#978d61] outline-[#978d61] text-2xl w-1/3' value={img} onChange={(e) => setImg(e.target.value)} />
      <button className='ml-4 pl-16' onClick={submit}><BiSearchAlt size={30} /></button>
      </div>
      <div className='bg-[#184642]'>
      <div className='w-3/4 m-auto'>
      <Masonry columns={{xs: 1, sm:2, md:3, lg:3}} spacing={{xs:1, sm:3, md:4}}>
        {res.map((item, index) => (
          <div key={index}>
            <img
              className='drop-shadow-md hover:drop-shadow-[0_25px_25px_rgba(255,0,153,1)] hover:scale-90 rounded-lg'
              src={`${item.urls.small}?w=162&auto=format`}
              srcSet={`${item.urls.small}?w=162&auto=format&dpr=2 2x`}
              alt={item.title}
              loading="lazy"
              style={{
                borderBottomLeftRadius: 4,
                borderBottomRightRadius: 4,
                display: 'block',
                width: '100%',
              }}
            />
          </div>
        ))}
      </Masonry>
      </div>
      </div>
    </div>
  );
}

export default App;
