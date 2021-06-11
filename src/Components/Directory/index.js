import React from "react";
import ShopMan from "../../../src/Assets/man.jpg"
import ShopWoman from "../../../src/Assets/woman.jpg"
import "./styles.scss"

const Directory =(props)=>{
    return(
        <div  className="directory">
            <div className="wrap">
            <div className="item" 
            // style={{ backgroundImage:`url(${ShopMan})`}}
            // style={{backgroundColor:"purple"}}
            >
                <a href="#">Shop Woman</a>
            </div>
            <div className="item" 
            // style={{ backgroundImage:`url(${ShopMan})`}}
            >
                <a href="#">Shop Man</a>
            </div>
            </div>
        </div>
    )
}

export default Directory