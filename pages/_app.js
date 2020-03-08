import React from 'react';
import App,{Container} from 'next/app';
import {Provider} from 'react-redux';

import 'antd/dist/antd.css';
import WithRedux from '../lib/with-redux';
import Layout  from '../components/Layout';


class MyApp extends App{

    static async getInitialProps({Component,ctx}){
        let pageProps;
        if(Component.getInitialProps){
             pageProps = await Component.getInitialProps(ctx);
        }
        return {
            //Act as the props of MyApp
            pageProps
        } 
    }

    render(){
        const {Component,pageProps} = this.props;

        return(
            <Layout>
                <Component {...pageProps}/>
            </Layout>
        )
    } 
}

export default WithRedux(MyApp);