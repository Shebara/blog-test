const initialState = {
    data: []
};

export default function(state = initialState, action) {

    switch (action.type) {
        case 'SET_DATA': {
            state.data = action.payload.data;
          
            return state;
        }
        default:
            return state;
      }
}

