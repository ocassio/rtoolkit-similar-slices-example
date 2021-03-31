import { configureStore, ThunkAction, Action, getDefaultMiddleware } from '@reduxjs/toolkit';
import { bunldeReducer } from '../features/bundle/slices/bundle.slice';
import { CUSTOM_PRODUCT_TYPE } from '../features/product/slices/custom/custom-product.slice';
import { GENERIC_PRODUCT_TYPE } from '../features/product/slices/generic/generic-product.slice';
import { createProductReducer, ProductSliceNames } from '../features/product/slices/product.slices';

export const store = configureStore({
  preloadedState: {
    bundle: {
      id: "bundle-1",
      name: "Dynamic Bundle",
      products: {
        ids: ["bp1", "bp2"],
        entities: {
          "bp1": {
            type: CUSTOM_PRODUCT_TYPE,
            id: "bp1",
            name: "Bundle Product 1",
            version: {
              value: 1
            },
            chars: {
              values: {},
              version: {
                value: 7
              }
            },
            loading: false,
            services: {
              services: {
                ids: [],
                entities: {}
              }
            }
          }
        }
      }
    },
    product: {
      type: GENERIC_PRODUCT_TYPE,
      id: "1",
      name: "Product 1",
      count: 1,
      version: {
        value: 0
      },
      services: {
        services: {
          ids: [],
          entities: {}
        }
      },
      equipment: {
        ids: ["e1", "e2"],
        entities: {
          "e1": {
            id: "e1",
            name: "Equipment 1",
            services: {
              services: {
                ids: [],
                entities: {}
              }
            },
          },
          "e2": {
            id: "e2",
            name: "Equipment 2",
            services: {
              services: {
                ids: [],
                entities: {}
              }
            },
          }
        }
      }
    },
    popupProduct: {
      type: GENERIC_PRODUCT_TYPE,
      id: "2",
      name: "Product 2",
      count: 5,
      version: {
        value: 0
      },
      services: {
        services: {
          ids: [],
          entities: {}
        }
      },
      equipment: {
        ids: ["e1", "e2"],
        entities: {
          "e1": {
            id: "e1",
            name: "Equipment 1",
            services: {
              services: {
                ids: [],
                entities: {}
              }
            },
          },
          "e2": {
            id: "e2",
            name: "Equipment 2",
            services: {
              services: {
                ids: [],
                entities: {}
              }
            },
          }
        }
      }
    },
    oneMoreProduct: {
      type: CUSTOM_PRODUCT_TYPE,
      id: "3",
      name: "Product 3",
      version: {
        value: 1
      },
      chars: {
        values: {},
        version: {
          value: 7
        }
      },
      loading: false,
      services: {
        services: {
          ids: [],
          entities: {}
        }
      }
    }
  },
  reducer: {
    product: createProductReducer(ProductSliceNames.PRODUCT),
    popupProduct: createProductReducer(ProductSliceNames.POPUP_PRODUCT),
    oneMoreProduct: createProductReducer(ProductSliceNames.ONE_MORE_PRODUCT),
    bundle: bunldeReducer
  },
  middleware: getDefaultMiddleware({
    serializableCheck: {
      ignoredActionPaths: [
        "meta.selector",
        "meta.arg.meta.selector"
      ]
    }
  })
});

export type RootState = ReturnType<typeof store.getState>;
export type RootSelector<T> = (state: RootState) => T;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
