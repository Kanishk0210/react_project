import React from 'react';
import {Media} from  'reactstrap';


function RenderLeader({leader}) {
    return(
        <Media className="mb-4">
            <Media left middle>
                <Media object src="/assets/images/alberto.png" alt="Leader"/>
            </Media>
            <Media body className="ml-5">
                <Media heading>{leader.name}</Media>
                <p>{leader.designation}</p>
                <p>{leader.description}</p>
            </Media>
        </Media>
    );
}

export default RenderLeader;