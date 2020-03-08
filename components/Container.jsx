import {cloneElement} from 'react';

const style = {
    wdith:"100%",
    maxWidth: 1200,
    marginRight:"auto",
    marginLeft: "auto",
    paddingLeft:20,
    paddingRight:20
};

export default ({children, renderer = <div />}) => {
    return cloneElement(renderer,{
        style:Object.assign({},renderer.props.style,style),
        children
    })
}