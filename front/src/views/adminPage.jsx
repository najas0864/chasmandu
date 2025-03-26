import { useEffect, useRef, useState } from "react";
import { useProduct } from "../other/product";
import "./adminPage.css"

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
    const [product, setProduct] = useState({id: null, name: "", brand: "", model: "", color: "", size: "", stock: "", price: "", description: ""});

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
        if (!product.name||!product.brand||!product.model||!product.color||!product.size||!product.price||!product.stock||!product.description){
            return setMessage("Please fill all input fields.");
        }
        const formData = new FormData();
        files?.forEach(file => formData.append("imageURL", file));
        Object.entries(product).forEach(([key, value]) => formData.append(key, value));
        const { success, message } = product.id ? await updateProduct(product.id,formData) : await createProduct(formData);
        (!success)?setMessage(message):setMessage(message);
        if (success) {
            setProduct({name:"",brand:"",model:"",color:"",size:"",stock:"",price:"",description:""});
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
          name:item.name,
          brand:item.brand,
          model:item.model,
          color:item.color,
          size:item.size,
          stock:item.stock,
          price:item.price,
          description:item.description,
          id: item._id,
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
        setProduct({ id: null, name: "", brand: "", model: "", color: "", size: "", stock: "", price: "", description: "" });
    };
    const clearFileInput = () => {
        setPushFiles([]);
        setPushFileLen(0);
        setPushFilePrev([]);
    };
    return (
        <main className='adminMain'>
            <div className="formCover">
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
                    <p>Brand : {item.brand}</p>
                    <p>Model : {item.model}</p>
                    <p>Color : {item.color}</p>
                    <p>Size  : {item.size}</p>
                    <p>Stock : {item.stock}</p>
                    <p>Price : {item.price}</p>
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
                            <button onClick={() => editFormDatas(item)}>Edit</button>
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