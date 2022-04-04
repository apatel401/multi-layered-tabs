import React from 'react';
import ReactDOM from 'react-dom';
import ProviderComponent from './components/Provider';
import ContentCabinet from './components/ContentCabinet';
import '../css/style.scss';

console.group('%%%PACKAGE_NAME%%% v%%%PACKAGE_VERSION%%%');/*RemoveLogging:skip*/
console.log('using React v' + React.version);/*RemoveLogging:skip*/
console.log('using ReactDOM v' + ReactDOM.version);/*RemoveLogging:skip*/
console.groupEnd();/*RemoveLogging:skip*/

// Find all DOM containers
document.querySelectorAll('.content-cabinet-container')
    .forEach((domContainer, index) => {
        // Read the config from a data-* attribute.
        const _configFile = domContainer.dataset.config;
        let _config = [];
        let _tfc = '';
        
        //get the json file
        fetch(_configFile)
            .then(res => res.json())
            .then( result => {

                _config = result; 
        
            }).then(() => { // wait until we're ready to pass in our config 
                              
                if (_config !== undefined && _config !== '') {
                    _tfc =
                        <ProviderComponent config={_config}>
                            <ContentCabinet id={index} />
                        </ProviderComponent>
                }
                ReactDOM.render(_tfc, domContainer);
            })
            .catch(error => {
                console.error('There was an error!', error);
                _tfc = <div class='warn'>error: ContentCabinet - missing config</div>
                ReactDOM.render(_tfc, domContainer);
            })
    });