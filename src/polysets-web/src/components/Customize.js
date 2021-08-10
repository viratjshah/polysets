import React,{useState,useEffect} from 'react';
import 'primeflex/primeflex.css';
import { Slider } from 'primereact/slider';
import { InputNumber } from 'primereact/inputnumber';
import { ToggleButton } from 'primereact/togglebutton';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import {Steps} from 'primereact/steps';
import { ListBox } from 'primereact/listbox';
import { Editor } from 'primereact/editor';
import { FileUpload } from 'primereact/fileupload';
import UserImage from '../assets/user.png'
import FundImage from '../assets/fundlogo.png'
import '../assets/css/customize.css';


const Customize = (props) => {

    return (
         <div>
            <h2 className="p-mt-5">Customize</h2>
            <div className='p-field p-col-12 p-md-12'>
            <div className="p-d-flex  p-flex-column p-mb-2">
                         <div>
                        <h5>Fund Creator</h5>
                        </div>
                        <div className="p-d-flex p-flex-row fund-input">
                            <div className="">
                                <img src={UserImage} className="fund-image"/>
                            </div>
                            <div className="fund-input-in">
                                <InputText style={{height: "50px"}} className = "p-field-input" value={props.state.customizeFundCreator} onChange={(e) => {props.onChange({customizeFundCreator: e.target.value})}} />
                            </div>
                        </div>
            </div>
            <div className=" p-d-flex">
                <div className="p-d-flex  p-flex-column">
                    <div className="p-d-flex ">
                        <div>
                            <img src={FundImage} className="fund-image" />
                        </div>
                        <div className="fund-logo-text-parent">
                            <h5 className = "fund-logo-text">Fund Logo</h5>
                        </div>
                    </div>
                    <div className="p-d-flex p-flex-column p-mt-4">
                          <FileUpload name="file[]" url="./upload" multiple onClick={(e)=>props.onChange({customizeFundLogo:e.target.file})} />
                         <h5>Description</h5>
                        <Editor style={{height:'320px'}} value={props.state.customizeFundDesc} onTextChange={(e) => props.onChange({customizeFundDesc: e.htmlValue})} />
                    </div> 
                </div>
            </div>
         </div>
        </div>
    )
}
export default Customize;