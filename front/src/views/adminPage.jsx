import { useEffect, useRef, useState } from "react";
import axios from "axios";
import "./adminPage.css"

const AdminPage = () => {
    const fileInput = useRef(null);
    const addFileInput = useRef(null);
    const [files, setFiles] = useState([]);
    const [message, setMessage] = useState("");
    const [fetchedData, setFetchedData] = useState([]);
    const [addedFiles, setAddedFiles] = useState([]);
    const [addedImagePreviews, setAddedImagePreviews] = useState([]);
    const [imagePreviews, setImagePreviews] = useState([]);
    const [addedFileLength, setAddedFileLength] = useState(0);
    const [progressBar, setProgressBar] = useState(0);
    const [form, setForm] = useState({id: null, name: '', brand: '', model: '', color: '', size: '', stock: '', price: '', description: ''});

    useEffect(() => {
        fetchItems();
    }, []);
    useEffect(() => {
        setTimeout(() => {
            setMessage("");
        }, 4000);
    }, [message]);
    const fetchItems = async () => {
        try {
            const response = await axios.get(`https://chasmandu.onrender.com/items`);
            setFetchedData(response.data);
        } catch (error) {
            setMessage("Error fetching items. Please try again later.");
        }
    };

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
        if (!form.name || !form.brand || !form.model || !form.color || !form.size || !form.price || !form.stock || !form.description) {
            return setMessage("Please fill all input fields.");
        }

        const formData = new FormData();
        files?.forEach(file => formData.append("file", file));
        Object.entries(form).forEach(([key, value]) => formData.append(key, value));
        try {
            const url = form.id ? `https://chasmandu.onrender.com/items/${form.id}` : `https://chasmandu.onrender.com/items`;
            const method = form.id ? axios.put : axios.post;
            await method(url, formData, {
                headers: { "Content-Type": files.length?"multipart/form-data":"application/json"},
                onUploadProgress: (progressEvent) => {
                    setProgressBar(Math.round((progressEvent.loaded * 100) / progressEvent.total));
                }
            });
            setMessage(form.id ? "Item updated successfully." : "Item saved successfully.");
            fetchItems();
        } catch (error) {
            setProgressBar(0);
            setMessage("Error uploading item. Please try again.");
        }finally{
            setFiles([]);
            setImagePreviews([]);
            fileInput.current.value='';
            setForm({ id: null, name: '', brand: '', model: '', color: '', size: '', stock: '', price: '', description: '' });
            
        }
    };
    const addFileSubmmit = async (id)=>{
        if(addedFiles.length===0)return addFileInput.current.click();
        try {
            const formData = new FormData();
            addedFiles.forEach(file => formData.append("file", file));            
            await axios.post(`https://chasmandu.onrender.com/items/${id}`, formData, {
                headers: { "Content-Type": "multipart/form-data" }
            });
            fetchItems();
            setMessage('Images added successful');
        } catch (error) {
            setMessage(`Upload failed:${error}`);
        }finally{
            setAddedFiles([]);
            setAddedFileLength(0)
            setAddedImagePreviews([]);
        }
    }
    const editFormDatas = (item) => {
        setForm({ 
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
        await axios.delete(`https://chasmandu.onrender.com/items/${id}`);
        fetchItems();
    };
    const deleteThisItem = async (id,fileName) => {
        await axios.delete(`https://chasmandu.onrender.com/delete/${id}/${fileName}`);
        fetchItems();
    };
    const clearFormInputs = () => {
        setFiles([]);
        setImagePreviews([]);
        setForm({ id: null, name: '', brand: '', model: '', color: '', size: '', stock: '', price: '', description: '' });
    };
    const clearFileInput = () => {
        setAddedFiles([]);
        setAddedFileLength(0);
        setAddedImagePreviews([]);
    };
    const HeadImage = () => {
        const [image, setImage] = useState('');
        const [msg, setMsg] = useState('');
        useEffect(() => {
            setTimeout(() => {
                setMsg("");
            }, 4000);
        }, [msg]);
        const fetchItems = async () => {
            if (!imageId) return alert("No image ID available.");
            try {
                const response = await axios.get(`https://chasmandu.onrender.com/uploads/${imageId}`);
                setFetchedData(response.data);
            } catch (error) {
                setMessage("Error fetching items. Please try again later.");
            }
        };
        const handleImageChange = (e) => {
            if(e.target.files){
                setImage(e.target.files[0]);
                convertToBase64(e.target.files[0])
            }
        };
        const convertToBase64 = (file) => {
            const extension = file.name.slice(file.name.lastIndexOf(".") + 1)
            const imageName = `Image-${Date.now()}.${extension}`
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                const results = {
                    result:reader.result,
                    name:imageName
                }
                setImage(results);
            };
            reader.onerror = (error) => {
                setMsg("Error processing image:", error);
            };
        };
        
        const uploadFile = async () => {
            if (!image.result) return setMsg("Select a file first.");
            try {
                const res = await axios.post('http://localhost:10001/uploadHeaderImg',{image},{
                    headers:{"Content-Type":"application/json"},
                })
                setImage('')
                setMsg(`${res?.data.message}`);
            } catch (error) {
                setMsg("Error uploading image:", error);
                setImage('')
            }
        }

        return(
            <div className="headImg">
                <img
                    src={image?image.result:"./icon.svg"}
                    alt={`Preview`}
                    width="150rem"
                    style={{ borderRadius: "10px", objectFit: "cover"}}
                />
                <input onChange={(e)=>handleImageChange(e)} name="image"  type="file" accept=".png, .jpeg, .jpg, .webp"/>
                <input onClick={uploadFile} style={{height:"20px"}} type="button" value={"Upload"}/>
                {msg&&(<p>{msg}</p>)}
            </div>
        )
    }

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
                        value={form[field]}
                        min={['stock', 'price'].includes(field) ? 0 : undefined}
                        onChange={(e) => setForm({ ...form, [field]: e.target.value })}
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
                    style={{
                        display:form.id?"none":'block',
                        backgroundImage: `linear-gradient(${progressBar}deg, black, transparent)`,
                    }}
                    onClick={()=>fileInput.current.click()}  
                    type='button'
                    value={`Add Images:(${imagePreviews?.length})`} 
                />
                <div className="formBtns">
                    <button onClick={handleUpload}>{form.id?'UPDATE':'Add'}</button>
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
            <HeadImage/>
            <div className='dataCover'>
            {fetchedData.map((item) => (
                <details className='itemDatas'key={item._id}>
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
                                {item.files?.map((fileName,index)=>(
                                    <img
                                        onDoubleClick={()=>deleteThisItem(item._id,fileName)}
                                        key={index}
                                        // `data:image/jpeg;base64,${data.image}`
                                        src={`https://chasmandu.onrender.com/uploads/${fileName}`} 
                                        alt={item.name} 
                                        style={{ borderRadius: "10px", objectFit: "cover" }}
                                        width="60px" 
                                    />
                                ))}
                                {addedImagePreviews?.map((preview, index) => (
                                    <img
                                        key={index}
                                        src={preview}
                                        alt={`Preview ${index}`}
                                        width="60px"
                                        style={{ borderRadius: "10px", objectFit: "cover",filter:'blur(1px)' }}
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
                                onClick={()=>addFileSubmmit(item._id)}
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