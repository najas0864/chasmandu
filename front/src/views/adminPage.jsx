import { useEffect, useRef, useState } from "react";
import axios from "axios";
import "./adminPage.css"
import { useProduct } from "../other/product";
import PopMessage from "../components/propMessage";

const AdminPage = () => {
    const {products, fetchProducts, createProduct, updateImage} = useProduct();
    const fileInput = useRef(null);
    const addFileInput = useRef(null);
    const [files, setFiles] = useState([]);
    const [message, setMessage] = useState("");
    const [addedFiles, setAddedFiles] = useState([]);
    const [addedImagePreviews, setAddedImagePreviews] = useState([]);
    const [imagePreviews, setImagePreviews] = useState([]);
    const [addedFileLength, setAddedFileLength] = useState(0);
    const [product, setProduct] = useState({id: null, name: '', brand: '', model: '', color: '', size: '', stock: '', price: '', description: ''});

    useEffect(() => {
        setTimeout(() => {
            setMessage("");
        }, 4000);
    }, [message]);
    useEffect(() => {
        fetchProducts()
    }, [fetchProducts]);

    const handleFileChange = (e) => {
        const selectedFiles = Array.from(e.target.files);
        setFiles(selectedFiles);
        setImagePreviews(selectedFiles.map(file => URL.createObjectURL(file)));
    };
    const handelChange = (e)=>{ //for after image uploads
        const selectedFiles = Array.from(e.target.files);
        setAddedFiles(selectedFiles)
        setAddedFileLength(e.target.files.length)
        setAddedImagePreviews(selectedFiles.map(file => URL.createObjectURL(file)));
    }

    const handleUpload = async () => {
        if (!product.name || !product.brand || !product.model || !product.color || !product.size || !product.price || !product.stock || !product.description) {
            return setMessage("Please fill all input fields.");
        }
        const formData = new FormData();
        files.forEach(file => formData.append("imageURL", file));
        Object.entries(product).forEach(([key, value]) => formData.append(key, value));
        const { success, message } = await createProduct(formData);
        (!success)?<PopMessage message={message}/>:<PopMessage message={message}/>;
        if (success) {
            setProduct({name:"",brand:"",model:"",color:"",size:"",stock:null,price:null,description:""});
            setFiles([]);
            setImagePreviews([]);
        }
    };
    const handelFileSubmmit = async (id)=>{
        if(addedFiles.length===0)return addFileInput.current.click();
        const formData = new FormData();
        addedFiles.forEach(file => formData.append("imageURL", file));            
        const { success, message } = await updateImage(id,formData);
        if (success) {
            setAddedFiles([]);
            setAddedFileLength(0)
            setAddedImagePreviews([]);
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
    const deleteAllData = async (id) => {
		const { success, message } = await deleteProduct(pid);
		(!success)?setMessage(message):setMessage(message);
    };
    const deleteThisItem = async (id) => {
		const { success, message } = await deleteImage(pid);
		(!success)?setMessage(message):setMessage(message);
    };
    const clearFormInputs = () => {
        setFiles([]);
        setImagePreviews([]);
        setProduct({ id: null, name: '', brand: '', model: '', color: '', size: '', stock: '', price: '', description: '' });
    };
    const clearFileInput = () => {
        setAddedFiles([]);
        setAddedFileLength(0);
        setAddedImagePreviews([]);
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
                    onChange={handleFileChange} 
                />
                <input 
                    style={{display:product.id?"none":'block'}}
                    onClick={()=>fileInput.current.click()}  
                    type='button'
                    value={`Add Images:(${imagePreviews?.length})`} 
                />
                <div className="formBtns">
                    <button onClick={handleUpload}>{product.id?'UPDATE':'Add'}</button>
                    <button onClick={clearFormInputs}>Clear</button>
                </div>
                {message && <p style={{color:"silver"}}>{message}</p>}
                {(imagePreviews.length > 0) && (
                    <div>
                    <h3>Selected Files:</h3>
                    <div className="prvImgBox">
                        {imagePreviews.map((preview, index) => (
                            <img
                                key={index}
                                src={preview}
                                alt={`Preview ${index}`}
                                width="100"
                                height="100"
                                style={{ borderRadius: "10px", objectFit: "cover" }}
                            />
                        ))}
                    </div>
                </div>
                )}
            </div>
            <div className='dataCover'>
            {products.map((item, index) => (
                <details className='itemDatas'key={index}>
                    <summary>{item.name}</summary>
                        <div className="dataInfo">
                            <p><b>Brand :</b>{item.brand}</p>
                            <p><b>Model :</b>{item.model}</p>
                            <p><b>Color :</b>{item.color}</p>
                            <p><b>Size :</b>{item.size}</p>
                            <p><b>Stock :</b>{item.stock}</p>
                            <p><b>Price :</b>{item.price}</p>
                            <p><b>Description :</b></p>
                            <textarea rows={"5"} cols={"15"} className="desc" defaultValue={item.description} readOnly></textarea>
                        </div>
                    <div className="alterFiles">
                        <h3>Uploaded Files:</h3>
                        <div className="imageCollectionSlider">
                            <div className="imageHolderBox">
                                {item.imagesURl?.map((fileName,index)=>(
                                    <img
                                        key={index}
                                        width="60px" 
                                        alt={item.name} 
                                        src={`${fileName}`} 
                                        onDoubleClick={()=>deleteThisItem(item._id)}
                                        style={{ borderRadius: "10px", objectFit: "cover" }}
                                    />
                                ))}
                                {addedImagePreviews?.map((preview, index) => (
                                    <img
                                        key={index}
                                        src={preview}
                                        alt={`Preview ${index}`}
                                        width="60px"
                                        style={{ borderRadius: "10px", objectFit: "cover" }}
                                    />
                                ))}
                            </div>
                        </div>
                        <div className="btnBox">
                            <input 
                                id="addImage"
                                ref={addFileInput}
                                name="files"
                                type="file"
                                multiple
                                onChange={(e)=>handelChange(e)} 
                            />
                            <button 
                                className="addImgBtn"
                                data_length={addedFileLength}  
                                onClick={()=>handelFileSubmmit(item._id)}
                            >
                                <span>{addedFileLength?"Upload":"ADD"}</span>
                            </button>
                            {addedFileLength !==0 && <button onClick={clearFileInput}>clear</button>}
                        </div>
                    </div>
                    <div className="alterBtn">
                        <button onClick={() => editFormDatas(item)}>Edit</button>
                        <button onClick={() => deleteAllData(item._id)}>Delete</button>
                    </div>
                </details>
            ))}
            </div>
        </main>
    );
};
export default AdminPage;