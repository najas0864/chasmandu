import axios from "axios";
import { create } from "zustand";

export const useUser = create((set) => ({
	users: [],
	setUsers: (users) => set({ users }),
	fetchUsers: async () => {
		const res = await axios.get("/api/users");
		const data = await res.data.data;
		set({ users: data });
	},
	createUser: async (newUser) => {
		if (!newUser.name || !newUser.email || !newUser.password || !newUser.gender) {
			return { success: false, message: "Please fill in all fields." };
		}
		try {
			const res = await axios.post("/api/users",newUser,{headers: {"Content-Type": "application/json",}});
			const data = await res.data.data;
			set((state) => ({ users: [...state.users, data] }));
			return { success: true, message: "user created successfully" };
		} catch (error) {
			if (error.response && error.response.status === 400) {
				return { success: false, message: error.response.data.message };
			}
		}
		return { success: false, message: "An unexpected error occurred." };
	},
	updateUserPassword: async (uid, updatedProduct) => {
		const res = await axios.put(`/api/users/${uid}`,updatedProduct, {headers: {"Content-Type": "application/json",}});
		console.log(res);
		
		const data = await res.data.data;
		if (!data.success) return { success: false, message: data.message };

		set((state) => ({
			users: state.users.map((user) => (user._id === uid ? data.data : user)),
		}));

		return { success: true, message: data.message };
	},
	deleteUser: async (uid) => {
		const res = await axios.delete(`/api/users/${uid}`);
		console.log(res);
		
		const data = await res.data;
		if (!data.success) return { success: false, message: data.message };

		set((state) => ({ users: state.users.filter((user) => user._id !== uid) }));
		return { success: true, message: data.message };
	},
}));
export const useReview = create((set) => ({
	reviews: [],
	setReviews: (reviews) => set({ reviews }),
	fetchReviews: async () => {
		const res = await axios.get("/api/reviews");		
		const data = await res.data.data;
		set({ reviews: data });
	},
	createReview: async (newReview) => {
		if (!newReview) {
			return { success: false, message: "Please fill in all fields." };
		}
		const res = await axios.post("/api/reviews",newReview, {	//pass item id and user id too
			headers: {"Content-Type": "application/json",},
		});
		console.log(res);
		
		const data = await res.data.data;
		set((state) => ({ reviews: [...state.reviews, data] }));
		return { success: true, message: "review created successfully" };
	},
	updateReview: async (rid, updatedReview) => {
		const res = await axios.put(`/api/reviews/${rid}`,updatedReview, {
			headers: {"Content-Type": "application/json",},
		});
		const data = await res.data.data;
		if (!data.success) return { success: false, message: data.message };

		set((state) => ({
			reviews: state.reviews.map((review) => (review._id === rid ? data.data : review)),
		}));

		return { success: true, message: data.message };
	},
	deleteReview: async (rid) => {
		const res = await axios.delete(`/api/reviews/${rid}`);
		const data = await res.data;
		if (!data.success) return { success: false, message: data.message };

		set((state) => ({ reviews: state.reviews.filter((review) => review._id !== rid) }));
		return { success: true, message: data.message };
	},
}));
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
		const data = await res.data.data;
		if (!data.success) return { success: false, message: data.message };

		set((state) => ({
			products: state.products.map((product) => (product._id === pid ? data : product)),
		}));

		return { success: true, message: data.message };
	},
	updateImage: async (pid, updatedImages) => {		
		const res = await axios.put(`/api/products/images/${pid}`,updatedImages);
		const data = await res.data;
		if (!data.success) return { success: false, message: data.message };

		set((state) => ({
			products: state.products.map((product) => (product._id === pid ? data : product)),
		}));

		return { success: true, message: data.message };
	},
	orderProduct:async (pid) => {
		const res = await axios.post(`/api/products/order/${pid}`,{
			headers: {"Content-Type": "application/json",},
		});
		const data = await res.data.data;
		if (!data.success) return { success: false, message: data.message };
		set((state) => ({
			products: state.products.map((product) => (product._id === pid ? data : product)),
		}));
		return { success: true, message: data.message };
	},
	deleteProduct: async (pid) => {
		const res = await axios.delete(`/api/products/${pid}`);
		const data = await res.data;
		
		if (!data.status===200) return { success: false, message: data.message };

		set((state) => ({ products: state.products.filter((product) => product._id !== pid) }));
		return { success: true, message: data.message };
	},
	deleteImage: async (pid) => {
		const res = await axios.delete(`/api/deleteImage/${pid}`);
		const data = await res.data;
		
		if (!data.status===200) return { success: false, message: data.message };

		set((state) => ({ products: state.products.filter((product) => product._id !== pid) }));
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