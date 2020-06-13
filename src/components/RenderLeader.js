import React from 'react';
import {Media} from  'reactstrap';
import { baseUrl } from '../shared/baseURL';
import { Fade } from 'react-animation-components';

function RenderLeader({leader}) {
    return(        
        <Fade in>
            <Media className="mb-4">
                <Media left middle>
                    <Media object src={baseUrl + leader.image} alt="Leader"/>
                </Media>
                <Media body className="ml-5">
                    <Media heading>{leader.name}</Media>
                    <p>{leader.designation}</p>
                    <p>{leader.description}</p>
                </Media>
            </Media>            
        </Fade>        
    );
}

export default RenderLeader;