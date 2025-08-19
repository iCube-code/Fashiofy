import React, {useState, useEffect} from 'react'
import '../AddProductsPopup/AddProducts.css'
import {Dialog, DialogTitle, DialogContent, DialogActions, TextField, Select, MenuItem} from '@mui/material'
import { IoMdClose } from "react-icons/io";
import { toast } from 'react-toastify';

function AddProducts({open, onClose}) {

  const [images, setImages] = useState([])  
  const [productName, setProductName] = useState('')
  const [productBrand, setProductBrand] = useState('')
  const [productDescription, setProductDescription] = useState('')
  const [productMRP, setProductMRP] = useState('')
  const [productSellingPrice, setProductSellingPrice] = useState('')
  const [productDiscount, setProductDiscount] = useState('')
  const [productStock, setProductStock] = useState('')
  const [productSize, setProductSize] = useState('Select Size');

 function handleAdd(){
  
  if (!productName || !productBrand || !productDescription || !productMRP || !productSellingPrice || !productStock || !productSize) {
    toast.error("All fields must be filled");
    return;
  }

  if (images.length<1){
    toast.error("Please upload atleast one image");
    return;
  }
 }

const handleImageUpload = (e) => {
  const file = e.target.files[0];
  if (!file) return;

  if (images.length > 5) {
    alert("Maximum 5 images allowed.");
    return;
  }

  const previewUrl = URL.createObjectURL(file);
  setImages([...images, { file, previewUrl }]);
};

useEffect(() => {
  const mrpVal = parseFloat(productMRP);
  const sellingVal = parseFloat(productSellingPrice);

  if (!isNaN(mrpVal) && !isNaN(sellingVal) && mrpVal > 0 && sellingVal <= mrpVal) {
    const discountPercent = ((mrpVal - sellingVal) / mrpVal) * 100;
    setProductDiscount(discountPercent.toFixed(2)+ "%");
  } else {
    setProductDiscount("");
  }
}, [productMRP, productSellingPrice]);


  return (
    <Dialog className='addProduct-dialog' open={open} onClose={onClose}>
      <i className='addProduct-close' onClick={onClose}><IoMdClose /></i>
      <DialogTitle>Add Product</DialogTitle>
      <DialogContent>
        <div className="image-upload-section">
          <div className="image-grid">
            {Array(5).fill().map((_, index) => (
              <div key={index} className="image-slot">
                {images[index]  ? (
                      <img
                      key={index}
                      src={images[index].previewUrl}
                    />
                ):(
                <label className="upload-label">
                  Upload an Image
                  <input 
                  type="file" hidden  
                  onChange={handleImageUpload}
                  />
                </label>              
                )}
              </div>
            ))}
          </div>
        </div>

        <div className='addProduct-section-wrap'>
          <TextField
          label="Product Name"
          type='text'
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          margin='dense'
          variant='outlined'
          placeholder='Enter Product Name'
          fullWidth
          />

          <TextField
          label="Product Brand"
          type='text'
          value={productBrand}
          onChange={(e) => setProductBrand(e.target.value)}
          margin='dense'
          variant='outlined'
          placeholder='Enter Product Brand'
          fullWidth
          />
      </div>
      <div className='addProduct-description'>
          <TextField
          label="Product Description"
          type='text'
          value={productDescription}
          onChange={(e) => setProductDescription(e.target.value)}
          margin='dense'
          variant='outlined'
          placeholder='Enter Product Description'
          multiline rows={3}
          fullWidth
          />
      </div>
      <div className='addProduct-section-wrap'>
          <TextField
          label="Product MRP"
          type='number'
          value={productMRP}
          onChange={(e) => setProductMRP(e.target.value)}
          margin='dense'
          variant='outlined'
          placeholder='Enter MRP'
          fullWidth
          />

          <TextField
          label="Product Selling Price"
          type='number'
          value={productSellingPrice}
          onChange={(e) => setProductSellingPrice(e.target.value)}
          margin='dense'
          variant='outlined'
          placeholder='Enter Selling Price'
          fullWidth
          />

          <TextField
          label="Discount"
          type='text'
          value={productDiscount}
          margin='dense'
          variant='outlined'
          disabled
          fullWidth
          />  
      </div>
      <div className='addProduct-section-wrap'>
        <Select className='addProduct-size uniform-input'
          value={productSize}
          onChange={(e) => setProductSize(e.target.value)}
          >
          <MenuItem value='Select Size'>Product Sizes</MenuItem>
          <MenuItem value='S'>Small</MenuItem>
          <MenuItem value='M'>Medium</MenuItem>
          <MenuItem value='L'>Large</MenuItem>
        </Select>

          <TextField className='uniform-input'
          label="Product Stock"
          type='text'
          value={productStock}
          onChange={(e) => setProductStock(e.target.value)}
          margin='dense'
          variant='outlined'
          fullWidth
          /> 
      </div>
      </DialogContent>
      <DialogActions className='addProduct-actions'>
        <button onClick={handleAdd}>Add</button>
      </DialogActions>
    </Dialog>
  )
}

export default AddProducts