import createStore from '../store/store';
import React from 'react';

//check whether is in development environment
const isServer = typeof window === 'undefined';
const _NEXT_REDUX_STORE_ = '_NEXT_REDUX_STORE_';


function getOrCreateStore(initialState){
    if(isServer){ //in server side
        return createStore(initialState);
    }

    if(!window[_NEXT_REDUX_STORE_]){
        window[_NEXT_REDUX_STORE_] = createStore(initialState);
    }
    return window[_NEXT_REDUX_STORE_];
}

export default Comp => {

    class WithReduxApp extends React.Component { 
        constructor(props){
            super(props)
            this.reduxStore = getOrCreateStore(props.initialReduxState)
        }

        redner(){
            const {Component,pageProps,...rest} = this.props;

            if(pageProps){
                pageProps.test = 123;
            }
    
            return <Comp Component={Component} pageProps = {pageProps} {...rest} reduxSrore={this.reduxSrore}/>
        }
    }

    WithReduxApp.getInitialProps = async(ctx)=>{
       
        let reduxStore;

        if(isServer){
            const {req} = ctx.ctx;
            const session = req.session;

            if(session && session.userInfo){
                reduxStore = getOrCreateStore({
                    user:session.userInfo
                })
            }else{
                reduxStore = getOrCreateStore();
            }
        }else{
            reduxStore = getOrCreateStore();
        }
 
        ctx.reduxStore = reduxStore;

        let appProps = {}
        if(typeof Comp.getInitialProps === 'function'){
            appProps = await Comp.getInitialProps(ctx);//fetch data from component's props
        }

        return { 
            ...appProps,
            initialReduxState:reduxStore.getState()
        };
    }
    
    return WithReduxApp;
}



