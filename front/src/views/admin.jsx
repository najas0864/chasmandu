import { useEffect, useRef, useState } from "react";
import { useProduct } from "../other/product";
import "./admin.css"

const AdminPage = () => {
    const {products, fetchProducts, createProduct,updateProduct,deleteProduct ,updateImage, deleteImage} = useProduct();
    const fileInput = useRef(null);
    const addFileInput = useRef(null);
    const [files, setFiles] = useState([]);
    const [message, setMessage] = useState("");
    const [addedFiles, setPushFiles] = useState([]);
    const [imagePreviews, setImagePrev] = useState([]);
    const [addedFileLength, setPushFileLen] = useState(0);
    const [addedImagePreviews, setPushFilePrev] = useState([]);
    const [product, setProduct] = useState({id: null, name: "", brand: "",shape:'',material:"", model: "", color: "", size: "",forThem:"",type:"", stock: "", price: "", description: ""});

    useEffect(() => {
        setTimeout(() => {
            setMessage("");
        }, 4000);
    }, [message]);
    useEffect(() => {
        fetchProducts()
    }, [fetchProducts]);
    const handleFilesChange = (e) => {
        const selectedFiles = Array.from(e.target.files);
        setFiles(selectedFiles);
        setImagePrev(selectedFiles.map(file => URL.createObjectURL(file)));
    };
    const handePushFilelChange = (e)=>{ //for after image uploads
        const selectedFiles = Array.from(e.target.files);
        setPushFiles(selectedFiles)
        setPushFileLen(e.target.files.length)
        setPushFilePrev(selectedFiles.map(file => URL.createObjectURL(file)));
    }

    const handleUpload = async () => {
        if (
            !product.name||
            !product.size||
            !product.type||
            !product.brand||
            !product.shape||
            !product.model||
            !product.color||
            !product.price||
            !product.stock||
            !product.forThem||
            !product.material||
            !product.description
        ){
            return setMessage("Please fill all input fields.");
        }
        const formData = new FormData();
        files?.forEach(file => formData.append("imageURL", file));
        Object.entries(product).forEach(([key, value]) => formData.append(key, value));
        const { success, message } = product.id ? await updateProduct(product.id,formData) : await createProduct(formData);
        (!success)?setMessage(message):setMessage(message);
        if (success) {
            setProduct({name:"",brand:"",material:"",shape:"",model:"",color:"",size:"",type:"",forThem:"",stock:"",price:"",description:""});
            setFiles([]);
            setImagePrev([]);
        }
    };
    const handelFileSubmmit = async (id)=>{
        if(addedFiles.length===0)return addFileInput.current.click();
        const formData = new FormData();
        addedFiles.forEach(file => formData.append("imageURL", file));            
        const { success, message } = await updateImage(id,formData);
        (!success)?setMessage(message):setMessage(message);
        if (success) {
            setPushFiles([]);
            setPushFileLen(0)
            setPushFilePrev([]);
        }
    }
    const editFormDatas = (item) => {
        setProduct({ 
            id: item._id,
            size:item.size,
            type:item.type,
            name:item.name,
            shape:item.shape,
            color:item.color,
            stock:item.stock,
            price:item.price,
            brand:item.brand,
            model:item.model,
            forThem:item.forThem,
            material:item.material,
            description:item.description,
        });
    };
    const delProduct = async (pid) => {
        if(confirm("Are you sure ?")){
            const { success, message } = await deleteProduct(pid);
            (!success)?setMessage(message):setMessage(message);
        }
    };
    const delProductImage = async (pid, fileName) => {
        if(confirm("Are you sure ?")){
            const { success, message } = await deleteImage(pid,fileName);
            (!success)?setMessage(message):setMessage(message);
        }
    };
    const clearFormInputs = () => {
        setFiles([]);
        setImagePrev([]);
        setProduct({ id: null, name: "", brand: "", model: "", color: "",shape:"",material:"",type:"", size: "",forThem:"", stock: "", price: "", description: "" });
    };
    const clearFileInput = () => {
        setPushFiles([]);
        setPushFileLen(0);
        setPushFilePrev([]);
    };
    return (
        <main className='adminMain'>
            <div className="formCover" id="gototop">
                <h2>Upload Item Info</h2>
                {['brand', 'name', 'model', 'color', 'size', 'stock', 'price', 'description'].map(field => (
                    <input
                        key={field}
                        name={field}
                        type={['stock', 'price'].includes(field) ? 'number' : 'text'}
                        placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                        value={product[field]}
                        min={['stock', 'price'].includes(field) ? 0 : undefined}
                        onChange={(e) => setProduct({ ...product, [field]: e.target.value })}
                    />
                ))}
                <input
                    style={{display:'none'}}
                    ref={fileInput}
                    type="file" 
                    multiple 
                    onChange={handleFilesChange} 
                />
                <div>Types:
                    <label>
                        <input
                            type="radio"
                            name="type"
                            checked={product.type === "shades"}
                            value={'shades'}
                            onChange={(e) => setProduct({ ...product, "type": e.target.value })}
                        />Shades
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="type"
                            checked={product.type === "specs"}
                            value={'specs'}
                            onChange={(e) => setProduct({ ...product, "type": e.target.value })}
                        />Specs
                    </label>
                </div>
                <div>FOR:
                    <label>
                        <input
                            type="checkbox"
                            checked={product.forThem === "men"}
                            value={'men'}
                            onChange={(e) => setProduct({ ...product, "forThem": e.target.value })}
                        />Men's
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            checked={product.forThem === "women"}
                            value={'women'}
                            onChange={(e) => setProduct({ ...product, "forThem": e.target.value })}
                        />Women's
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            checked={product.forThem === "child"}
                            value={'child'}
                            onChange={(e) => setProduct({ ...product, "forThem": e.target.value })}
                        />Child's
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            checked={product.forThem === "unisex"}
                            value={'unisex'}
                            onChange={(e) => setProduct({ ...product, "forThem": e.target.value })}
                        />Unisex
                    </label>
                </div>
                <label htmlFor="material">Material: 
                    <select 
                        name="material" 
                        value={product.material} 
                        onChange={(e) => setProduct({ ...product, "material": e.target.value })} 
                    >
                        <option value="" selected>Select</option>
                        <option value="Metals">Metals</option>
                        <option value="Titanium">Titanium</option>
                        <option value="Acetate">Acetate</option>
                        <option value="Plastic">Plastic</option>
                        <option value="Semi-acetate">Semi-acetate</option>
                        <option value="Aluminium">Aluminium</option>
                        <option value="TR">TR</option>
                    </select>
                </label>
                <label htmlFor="shape">Shapes: 
                    <select 
                        name="shape" 
                        value={product.shape} 
                        onChange={(e) => setProduct({ ...product, "shape": e.target.value })} 
                    >
                        <option value="" selected>Select</option>
                        <option value="Cateye">Cateye</option>
                        <option value="Circle">Circle</option>
                        <option value="Oval">Oval</option>
                        <option value="Aviator">Aviator</option>
                        <option value="Rectangle">Rectangle</option>
                        <option value="Sporty">Sporty</option>
                        <option value="Clubmaster">Clubmaster</option>
                        <option value="Butterfly">Butterfly</option>
                        <option value="Rimless">Rimless</option>
                    </select>
                </label>
                <input 
                    style={{display:product.id?"none":'block'}}
                    onClick={()=>fileInput.current.click()}  
                    type='button'
                    value={`Add Images:(${imagePreviews?.length})`} 
                />
                {message && <p style={{color:"silver"}}>{message}</p>}
                <div className="prvImgBox">
                    {(imagePreviews.length > 0) && (imagePreviews.map((preview, index) => (
                        <img
                            key={index}
                            src={preview}
                            alt={`Preview ${index}`}
                        />
                    )))}
                </div>
                <div className="formBtns">
                    <button onClick={()=>handleUpload(product?.id)}>{product.id?'UPDATE':'Create'}</button>
                    <button onClick={clearFormInputs}>Clear</button>
                </div>
            </div>
            <div className='dataCover'>
            {products.length === 0 ? (<p>No Product avilable. 😥</p>) :products.map((item, index) => (
                <details className='itemDatas'key={index}>
                    <summary>{item.name}</summary>
                    <p>Type : {item.type}</p>
                    <p>Size  : {item.size}</p>
                    <p>Model : {item.model}</p>
                    <p>Brand : {item.brand}</p>
                    <p>Color : {item.color}</p>
                    <p>Shape : {item.shape}</p>
                    <p>Stock : {item.stock}</p>
                    <p>Price : {item.price}</p>
                    <p>Material : {item.material}</p>
                    <div className="prvImgBox">
                        {item.imagesURl.length === 0 ? (<p>No image avilable.😥</p>) :item.imagesURl?.map((fileName,index)=>(
                            <img
                                key={index}
                                width="60px" 
                                alt={item.name} 
                                src={`${fileName}`} 
                                onDoubleClick={()=>delProductImage(item._id, fileName)}
                            />
                        ))}
                        {addedImagePreviews?.map((preview, index) => (
                            <img
                                width="60px"
                                key={index}
                                src={preview}
                                alt={`Preview ${index}`}
                                style={{ boxShadow: "0 0 0 3px #fff, 0 0 0 9px red" }}
                            />
                        ))}
                    </div>
                    <div className="btnBox">
                        <div>
                            <input id="addImage" ref={addFileInput} name="files" type="file" multiple onChange={(e)=>handePushFilelChange(e)} />
                            <button className="addImgBtn" data_length={addedFileLength} onClick={()=>handelFileSubmmit(item._id)}>
                                {addedFileLength?"Upload":"Select"}
                            </button>
                            {addedFileLength !==0 && <button onClick={clearFileInput}>Cancel</button>}
                        </div>
                        <div>
                            <a href="#gototop"><button onClick={() => editFormDatas(item)}>Edit</button></a>
                            <button onClick={() => delProduct(item._id)}>Delete</button>
                        </div>
                    </div>
                </details>
            ))}
            </div>
        </main>
    );
};
export default AdminPage;