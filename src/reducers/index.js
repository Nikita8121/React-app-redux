const initailaState = {
    menu: [],
    loading: true,
    error: false,
    items: [],
    total: 0
}


const reducer = (state = initailaState, action) => {
    switch (action.type) {
        case 'MENU_LOADED':
            return {
                ...state,
                menu: action.payload,
                loading: false,
                error: state.error
            };
        case 'MENU_REQUESTED':
            return {
                ...state,
                loading: true
            };
        case 'MENU_CRASHED':
            return {
                ...state,
                loading: false,
                error: true
            };
        case 'ITEM_ADD_TO_CART':
            const id = action.payload;
            const item = state.menu.find(item => item.id === id);
            let newItem;

            const checkItem = state.items.find(item => item.id === id);

            if (!checkItem) {
                newItem = {
                    title: item.title,
                    price: item.price,
                    url: item.url,
                    id: item.id,
                    amount: 1
                }
                return {
                    ...state,
                    total: state.total += newItem.price,
                    items: [
                        ...state.items,
                        newItem
                    ]
                };
            } else {
                return {
                    ...state
                }
            }
        case 'ITEM_REMOVE_FROM_CART':
            const idx = action.payload;
            const itemIndex = state.items.findIndex(item => item.id === idx);

            return {
                ...state,
                total: state.total -= state.items[itemIndex].price,
                items: [
                    ...state.items.slice(0, itemIndex),
                    ...state.items.slice(itemIndex + 1)
                ]

            };
        case 'ITEM_ADD_TO_ITEM':
            const idxx = action.payload;
            const itemIndexx = state.items.findIndex(item => item.id === idxx);
                state.items.filter(item => {
                if(item.id === idxx){
                    item.amount++;    
                }

                return item
            });
            return {
                ...state,
                total: state.total += state.items[itemIndexx].price,
                items: [
                    ...state.items,
                    
                ]

            };
            case 'ITEM_REMOVE_FROM_ITEM':
            const idxxx = action.payload;
            const itemIndexxx = state.items.findIndex(item => item.id === idxxx);
                state.items.filter(item => {
                if(item.id === idxxx){
                    item.amount--;    
                }
                if(item.amount === 0){
                    return null;
                }else{
                    return item;
                }

                
            });
            return {
                ...state,
                total: state.total -= state.items[itemIndexxx].price,
                items: [
                    ...state.items,
                    
                ]

            };
        default:
            return state;
    }
}

export default reducer;