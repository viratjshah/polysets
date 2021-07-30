import React,{useState} from 'react'; 
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
const PasswordReset = (props) => {

  // const {computedMatch:{params}}=props;
  // const token = decodeURIComponent(params.token);
   const [password,setPassword] = useState(''); 
   const [repassword,setRepassword] = useState('');
   return (
         <div className='card' id='pwdreset'>
             <h4>Password Reset</h4>
              
           <div className='p-grid p-mt-2 p-m-0'>
              <div className='p-col'>
                <div className='box'>
                  <InputText
                    id='password'
                    value={password}
                    onChange={(e) =>
                      setPassword( e.target.value)
                    }
                    placeholder='Enter Password'
                    type='password'
                  />
                </div>
              </div>
             </div>
             <div className='p-grid p-mt-2 p-m-0'>
              <div className='p-col'>
                <div className='box'>
                    <InputText
                        id='repassword'
                        value={repassword}
                        onChange={(e) =>
                        setRepassword( e.target.value)
                        }
                        placeholder='ReEnter Password'
                        type='password'
                    />
                    </div>
                </div>            
              </div>
              <div className='p-grid p-mt-2 p-m-0'>
              <Button label='Submit' className='p-button-info p-mt-2' />
                </div>
            </div>
      );
     
}  
export default PasswordReset; 