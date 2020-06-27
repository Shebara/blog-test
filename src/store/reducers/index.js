const initialState = {
    data: [],
    comments: []
};

export default function(state = initialState, action) {

    switch (action.type) {
        case 'SET_DATA': {
            state.data = action.payload.data;
          
            return state;
        }
        case 'POST_COMMENT': {            
            const newComments = [action.payload];
            state.comments = state.comments.concat(newComments);
          
            return state;
        }
        default:
            return state;
      }
}

