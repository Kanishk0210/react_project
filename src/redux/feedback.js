import * as ActionTypes from './ActionTypes';

export const Feedback = (state = {
    isLoading: true,
    errmess: null,
    feedback: []
}, action) => {
    switch(action.type){
        case ActionTypes.ADD_FEEDBACK:
            console.log('done');
            alert("done");
            return {...state, isLoading: false, errMess: null, feedback: action.payload};

        default:
            return state;
    }
}