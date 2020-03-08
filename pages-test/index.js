import React,{ useEffect } from 'react';
import Link from 'next/router';
import {Button} from 'antd';
import {connect} from 'react-redux';
import getConfig from 'next/config';
import axios from 'axios';

const { publicRuntimeConfig } = getConfig();

const Index = ({counter,userName}) => {

  useEffect(()=>{
    axios.get('/api/user/info').then(resp => console.log(resp));
  },[])

  return(
    <>
      <span>This is Neolu count ${counter}</span>
      <span>This is ${userName}</span>
      <a href={publicRuntimeConfig.OAUTH_URL}>GO TO LOGIN</a>
    </>
  )
}

const mapState = (state) =>{    
  return {
    counter:state.counter.counter,
    userName:state.user.userName 
  }
}

const mapDispatch = () => {
  
}

export default connect(mapState,mapDispatch)(Index)
  
 