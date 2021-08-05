import React from 'react'
import axios from 'axios'
import { useAuth0 } from '@auth0/auth0-react'
import {CopyToClipboard} from 'react-copy-to-clipboard';

const TokenField = () => {
    let [accessToken, setAccessToken] = React.useState('')
    let [buttonText, setButtonText] = React.useState('Get Access Token')
    const serverUrl = process.env.REACT_APP_SERVER_URL;
    const { getAccessTokenSilently } = useAuth0();

    const handleClick = () => {
        if(accessToken.length > 0) {
            handleClickCopy();
        } else {
            handleClickAcc();
        }
    }

    const handleClickAcc = async () => {
        const token = await getAccessTokenSilently();
        setButtonText("Loading...");
        axios
            .get(`${serverUrl}/generatetoken`, {
                headers: {
                  Authorization: `Bearer ${token}`,
                }
            })
            .then(response => {
                setAccessToken(response.data.access_token);
                setButtonText("Copy to clipboard");
            })
    }

    const handleClickCopy = () => {
        setButtonText('Copied to clipboard!');
    }

    return (
        <div class="flex items-center border-b border-teal-500 py-2">
            <input 
                class="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight" 
                type="text" 
                placeholder="Get your SFW token, will only be displayed once." 
                value={accessToken}
                disabled
            />
            {
                accessToken.length === 0 ?
                <button 
                    class="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-black py-1 px-2 rounded" 
                    type="button"
                    onClick={() => handleClickAcc()}
                >
                    {buttonText}
                </button>
                :
                <CopyToClipboard text={accessToken}>
                    <button
                        class="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-black py-1 px-2 rounded"
                        type="button"
                        onClick={handleClickCopy}
                    >
                        {buttonText}
                    </button>
                </CopyToClipboard>
            }   
        </div>
    )
}

export default TokenField
