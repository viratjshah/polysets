import React from 'react';
import 'primeflex/primeflex.css';
import { InputText } from 'primereact/inputtext';
import { Editor } from 'primereact/editor';
import { FileUpload } from 'primereact/fileupload';

const Customize = (props) => {
    return (
         <div>
            <h2 className="p-mt-5">Customize</h2>
            <div className='p-field p-col-12 p-md-12'>
            <div>
                <h5>Fund Creator</h5>
                <InputText value={props.state.customizeFundCreator} onChange={(e) => props.onChange({customizeFundCreator: e.target.value})} />
            </div>
            <div className="p-mt-3">
                <h5>Fund Logo</h5>
                <FileUpload name="demo[]" url="./upload" multiple />
                <h5>Description</h5>
                <Editor style={{height:'320px'}} value={props.state.customizeFundDesc} onTextChange={(e) => props.onChange({customizeFundDesc: e.htmlValue})}  />
            </div>
            </div>
         </div>
    )
}
export default Customize;