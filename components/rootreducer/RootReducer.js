const initialState = {
  cart: {},
  user: {},
  network: true,
  product: {},
  invoice: {},
};

function RootReducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_STATE':
      state.network = action.payload;
      return {
        cart: state.cart,
        user: state.user,
        network: state.network,
        product: state.product,
        invoice: state.invoice,
      };

    case 'ADD_USER':
      state.user[action.payload[0]] = action.payload[1];
      return {
        cart: state.cart,
        user: state.user,
        network: state.network,
        product: state.product,
        invoice: state.invoice,
      };
    case 'ADD_CART':
      state.cart[action.payload[0]] = action.payload[1];
      console.log('CART', state.cart);
      return {
        cart: state.cart,
        user: state.user,
        network: state.network,
        product: state.product,
        invoice: state.invoice,
      };
    case 'ADD_INVOICE':
      console.log('called');
      state.invoice[action.payload[0]] = action.payload[1];
      console.warn(state.invoice);
      return {
        cart: state.cart,
        user: state.user,
        network: state.network,
        product: state.product,
        invoice: state.invoice,
      };
    case 'REMOVE_ALL_INVOICE':
      console.log('before delete.............:', state.product);
      state.invoice = new Object();
      console.log('after delete.............:', state.product);
      return {
        cart: state.cart,
        user: state.user,
        network: state.network,
        product: state.product,
        invoice: state.invoice,
      };
    case 'ADD_PRODUCT':
      console.log('called');
      state.product[action.payload[0]] = action.payload[1];
      console.warn(state.product);
      return {
        cart: state.cart,
        user: state.user,
        network: state.network,
        product: state.product,
        invoice: state.invoice,
      };
    case 'REMOVE_ALL_PRODUCT':
      console.log('before delete.............:', state.product);
      state.product = new Object();
      console.log('after delete.............:', state.product);
      return {
        cart: state.cart,
        user: state.user,
        network: state.network,
        product: state.product,
        invoice: state.invoice,
      };
    case 'REMOVE_ITEM':
      delete state.cart[action.payload[0]];
      console.log('SAndeep:', state.cart);
      return {
        cart: state.cart,
        user: state.user,
        network: state.network,
        product: state.product,
        invoice: state.invoice,
      };
    case 'REMOVE_ALL_ITEM':
      state.cart = new Object();
      console.log('SAndeep:', state.cart);
      return {
        cart: state.cart,
        user: state.user,
        network: state.network,
        product: state.product,
        invoice: state.invoice,
      };

    default:
      return state;
  }
}
export default RootReducer;
