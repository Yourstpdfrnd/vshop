import { defineStore } from "pinia";

import products from "~~/data";

export const useCartStore = defineStore("cart", {
  state: () => ({
    cartContent: {},
    orderInfo: null,
  }),
  getters: {
    formattedCart() {
      return Object.keys(this.cartContent).map((productId) => {
        const product = this.cartContent[productId];

        return {
          id: product.productId,
          image: products.find((p) => p.id === product.productId).image,
          name: products.find((p) => p.id === product.productId).name,
          price: products.find((p) => p.id === product.productId).price,
          option:products.find((p) => p.id === product.productId).option,
          quantity: product.quantity,
          cost:
            product.quantity *
            products.find((p) => p.id === product.productId).price,
        };
      });
    },
    total() {
      return Object.keys(this.cartContent).reduce((acc, id) => {
        const product = products.find((p) => p.id === id);
        if (product) {
          return acc + product.price * this.cartContent[id].quantity;
        }
        return acc + 0;
      }, 0);
    },
    productsTotal() {
      return Object.keys(this.cartContent).reduce((acc, id) => {
        return acc + this.cartContent[id].quantity;
      }, 0);
    },
    orderInformation(state) {
      return state.orderInfo;
    },
  },
  actions: {
    updateOrderInfo(orderInfo) {
      this.orderInfo = orderInfo;
    },
    add(productId) {
      this.$patch(state => {
        if (state.cartContent.hasOwnProperty(productId)) {
          state.cartContent[productId] = {
            productId,
            quantity: state.cartContent[productId].quantity + 1,
          };
        } else {
          state.cartContent[productId] = {
            productId,
            quantity: 1,
          };
        }
      });
    },
    remove(productId) {
      this.$patch(state => {
        if (!state.cartContent[productId]) {
          return;
        }
        state.cartContent[productId].quantity -= 1;

        if (state.cartContent[productId].quantity === 0) {
          delete state.cartContent[productId];
        }
      });
    },
    removeProduct(productId) {
      this.$patch(state => {
        delete state.cartContent[productId];
      });
    },
  },
});
