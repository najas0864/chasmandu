import axios from "axios";
import { create } from "zustand";
export const useProduct = create((set) => ({
	products: [],
	singleProduct:{},
	setProducts: (products) => set({ products }),
	fetchProducts: async () => {
		const res = await axios.get("/api/products");
		const data = await res.data.data;
		set({ products: data });
	},
	fetchSingleProduct: async (id) => {
		const res = await axios.get(`/api/products/${id}`);
		const data = await res.data.data;
		set({ singleProduct: data });
	},
	createProduct: async (newProduct) => {
		const res = await axios.post("/api/products",newProduct);
		const data = await res.data.data;
		set((state) => ({ products: [...state.products, data] }));
		return { success: true, message: "Product created successfully" };
	},
	updateProduct: async (pid, updatedProduct) => {
		const res = await axios.put(`/api/products/${pid}`,updatedProduct, {
			headers: {"Content-Type": "application/json",},
		});
		const data = res.data;
		if (!data.success) return { success: false, message: data.message };
		set((state) => ({
			products: state.products.map((product) => product._id === pid ? { ...product, ...data.data } : product),
		}));
		return { success: true, message: data.message };
	},
	updateImage: async (pid, updatedImages) => {		
		const res = await axios.put(`/api/products/images/${pid}`,updatedImages, {
            headers: { "Content-Type": "multipart/form-data" }
		});
		const data = res.data;
		if (!data.success) return { success: false, message: data.message };
		console.log(res);
		set((state) => ({
			products: state.products.map((product) => (product._id === pid ? { ...product, imagesURl: data.product.imagesURl } : product)),
		}));
		return { success: true, message: data.message };
	},
	deleteProduct: async (pid) => {
		const res = await axios.delete(`/api/products/${pid}`);
		const data = await res.data;
		if (!data.success) return { success: false, message: data.message };
		set((state) => ({ products: state.products.filter((product) => product._id !== pid) }));
		return { success: true, message: data.message };
	},
	deleteImage: async (id,url) => {
		const res = await axios.delete(`/api/products/deleteImage`, {data: { id, url }});
		const data = await res.data;
		if (!data.success) return { success: false, message: data.message };
		set((state) => ({ 
			products: state.products.map((product) => product._id === id?{ ...product, imagesURl : data.data.imagesURl } : product)
		}));
		return { success: true, message: data.message };
	},
}));
export const useOrderStore = create((set) => ({
	orders: [],
	createOrder: async (pid, updatedImages) => {		
		const res = await axios.post(`/api/products/images/${pid}`,updatedImages, {
            headers: { "Content-Type": "multipart/form-data" }
		});
		const data = res.data;
		if (!data.success) return { success: false, message: data.message };
		console.log(res);
		set((state) => ({
			products: state.products.map((product) => (product._id === pid ? { ...product, imagesURl: data.product.imagesURl } : product)),
		}));
		return { success: true, message: data.message };
	},
	cancelOrder: async (pid) => {
		const res = await axios.delete(`/api/order/${pid}`);
		const data = await res.data;
		if (!data.success) return { success: false, message: data.message };
		set((state) => ({ products: state.products.filter((product) => product._id !== pid) }));
		return { success: true, message: data.message };
	},
	orderComplete:async (pid) => {
		const res = await axios.post(`/api/order/${pid}`,{
			headers: {"Content-Type": "application/json",},
		});
		const data = await res.data.data;
		if (!data.success) return { success: false, message: data.message };
		set((state) => ({
			products: state.products.map((product) => (product._id === pid ? data : product)),
		}));
		return { success: true, message: data.message };
	},
}));
export const useCartStore = create((set) => ({
    cart: JSON.parse(localStorage.getItem("Cart")) || [],
    addToCarts: (product) => set((state) => {
        const goods = {
            id: product._id,
            file: product.imagesURl[0],
            name: product.name,
            price: product.price,
        };
        const existingItemIndex = state.cart.findIndex(item => item.id === goods.id);
        let updatedCart;
        
        if (existingItemIndex !== -1) {
            updatedCart = state.cart.map((item, index) =>
                index === existingItemIndex ? { ...item, ...goods, quantity: item.quantity + 1 } : item
            );
        } else {
            updatedCart = [...state.cart, { ...goods, quantity: 1 }];
        }
        
        localStorage.setItem("Cart", JSON.stringify(updatedCart));
        return { cart: updatedCart };
    }),
    incrementQuantity: (id) => set((state) => {
        const updatedCart = state.cart.map(item =>
            item.id === id ? { ...item, quantity: item.quantity + 1 } : item
        );
        localStorage.setItem("Cart", JSON.stringify(updatedCart));
        return { cart: updatedCart };
    }),
    decrementQuantity: (id) => set((state) => {
        const updatedCart = state.cart.map(item =>
            item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        ).filter(item => item.quantity > 0);
        localStorage.setItem("Cart", JSON.stringify(updatedCart));
        return { cart: updatedCart };
    })
}));