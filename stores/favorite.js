import { defineStore } from "pinia";

import products from "~~/data";

export const useFavoriteStore = defineStore("favorite", {
    state: () => ({
      favoriteContent: {},
    }),
    getters: {
        formattedFavorite() {
            return Object.keys(this.favoriteContent).map((productId) => {
                const product = this.favoriteContent[productId];
        
                return {
                  id: product.productId,
                  image: products.find((p) => p.id === product.productId).image,
                  name: products.find((p) => p.id === product.productId).name,
                  price: products.find((p) => p.id === product.productId).price,
                  quantity: product.quantity,
                  cost:
                    product.quantity *
                    products.find((p) => p.id === product.productId).price,
                };
              });
        },
        productsTotal() {
            return Object.keys(this.favoriteContent).reduce((acc, id) => {
              return acc + this.favoriteContent[id].quantity;
            }, 0);
          },
          getTheme() {
            return this.theme;
          },
    },
    actions: {
      add(productId) {
        if (this.favoriteContent.hasOwnProperty(productId)) {
          this.favoriteContent[productId] = {
            productId,
            quantity: this.favoriteContent[productId].quantity,
          };
        } else {
          this.favoriteContent[productId] = {
            productId,
            quantity: 1,
          };
        }
      },
      remove(productId) {
        if (!this.favoriteContent[productId]) {
          return;
        }
        this.favoriteContent[productId].quantity -= 1;
  
        if (this.favoriteContent[productId].quantity === 0) {
          delete this.favoriteContent[productId];
        }
      },
      removeProduct(productId) {
        delete this.favoriteContent[productId];
      },
        
    }
})