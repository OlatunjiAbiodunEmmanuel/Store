import { CartProductType } from "@/app/product/[productid]/ProductDetails";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import toast from "react-hot-toast";

type CartContextType = {
  cartTotalQty: number;
  cartTotalAmount:number,
  cartProducts: CartProductType[] | null;
  handleAddProductToCart: (product: CartProductType) => void;
  handleRemoveProductFromCart: (product: CartProductType) => void;
  handleCartQtyIncrease: (product: CartProductType) => void;
  handleCartQtyDecrease: (product: CartProductType) => void;
  handleClearCart:()=>void
};

interface Props {
  [propName: string]: any;
}

export const CartContext = createContext<CartContextType | null>(null);

export const CartContextProvider = (props: Props) => {
  const [cartTotalQty, setCartTotalQty] = useState(0);
  const [cartTotalAmount, setCartTotalAmount] = useState(0)
  const [cartProducts, setCartProducts] = useState<CartProductType[] | null>(
    null
  );

console.log("qty",cartTotalQty)
  console.log("amount",cartTotalAmount)

  useEffect(() => {
    const cartItems: any = localStorage.getItem("OSoreCartItems");
    const cProducts: CartProductType[] | null = JSON.parse(cartItems);
    setCartProducts(cProducts);
  }, []);


useEffect(()=>{
const getTotals =()=>{

if (cartProducts){
  const {total, qty}=cartProducts?.reduce((acc, item)=>{

    const itemTotal = item.price * item.quantity
    acc.total += itemTotal
    acc.qty += item.quantity
    
    return acc
    
    },{
      total:0,
      qty:0
    })

setCartTotalQty(qty)
setCartTotalAmount(total)
}
}
getTotals();
}, [cartProducts])



  const handleAddProductToCart = useCallback((product: CartProductType) => {
    setCartProducts((prev) => {
      const updatedCart = prev ? [...prev, product] : [product];
      return updatedCart;
    });

    toast.success("Product added to cart");
  }, []);

  const handleRemoveProductFromCart = useCallback(
    (product: CartProductType) => {
      setCartProducts((prev) => {
        const filteredProducts =
          prev?.filter((item) => item.id !== product.id) || [];
        return filteredProducts;
      });

      toast.success("Product removed from cart");
    },
    []
  );

  useEffect(() => {
    if (cartProducts) {
      localStorage.setItem("OSoreCartItems", JSON.stringify(cartProducts));
    }
  }, [cartProducts]);

  const handleCartQtyIncrease = useCallback(
    (product: CartProductType) => {
      let updatedCart;
      if (product.quantity === 99) {
        return toast.error("Opps maximum quantity reached");
      }

      if (cartProducts) {
        updatedCart = [...cartProducts];
        const existingIndex = cartProducts.findIndex(
          (item) => item.id === product.id
        );
        if (existingIndex > -1) {
          updatedCart[existingIndex].quantity =
            updatedCart[existingIndex].quantity + 1;
        }

        setCartProducts(updatedCart);
        localStorage.setItem("OSoreCartItems", JSON.stringify(updatedCart));
      }
    },
    [cartProducts]
  );




  const handleCartQtyDecrease = useCallback(
    (product: CartProductType) => {
      let updatedCart;
      if (product.quantity === 1) {
        return toast.error("Opps minimum quantity reached");
      }

      if (cartProducts) {
        updatedCart = [...cartProducts];
        const existingIndex = cartProducts.findIndex(
          (item) => item.id === product.id
        );
        if (existingIndex > -1) {
          updatedCart[existingIndex].quantity =
            updatedCart[existingIndex].quantity - 1;
        }

        setCartProducts(updatedCart);
        localStorage.setItem("OSoreCartItems", JSON.stringify(updatedCart));
      }
    },
    [cartProducts]
  );

const handleClearCart = useCallback(()=>{
setCartProducts(null)
setCartTotalQty(0)
localStorage.setItem("OSoreCartItems", JSON.stringify(null));


},[cartProducts])


  const value = {
    cartTotalQty,
    cartTotalAmount,
    cartProducts,
    handleAddProductToCart,
    handleRemoveProductFromCart,
    handleCartQtyIncrease,
    handleCartQtyDecrease,
    handleClearCart
  };

  return <CartContext.Provider value={value} {...props} />;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === null) {
    throw new Error("useCart must be used within a CartContextProvider");
  }
  return context;
};
