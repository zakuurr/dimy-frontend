import { useState } from 'react'
import './App.css'
import Button from './moleculs/Button';

function App() {
  const [data, setData] = useState([1]);

  const [form, setForm] = useState([{
    product_name: '',
    product_price: null,
    qty: 1,
    total: null
  }]);
  const [grandTotal, setGrandTotal] = useState(0);

  const handlerNew = () => {
    setData(data => [...data, (data.length)+1]);
    setForm(form => [...form, {
      product_name: '',
      product_price: null,
      qty: null,
      total: null
    }]);
  }

  const handlerDelete = () => {
    setData(data.slice(0, -1));
    setForm(form.slice(0, -1));
  }

  const onchangeHandler = (e, index) => {
    const { name, value } = e.target;
    const list = [...form];

    list[index][name] = value;
    list[index].total = list[index].product_price * list[index].qty;
    setGrandTotal(0);

    form.forEach((item) => {
      setGrandTotal(grandTotal => grandTotal + item.total);
    });
    setForm(list);

    if (name === 'qty') {
      if (value < 1) {
        document.getElementById(`validasi${index}`).style.display = 'block';
      } else {
        document.getElementById(`validasi${index}`).style.display = 'none';
      }
    }
  }

  return (
    <div className='App'>
      
    <Button className='new-button' onClick={handlerNew}>New</Button>

     
      {data.map((row, index) => (
        <div className='row-input' key={row}>
          <div className='column-input'>
            <label htmlFor={`product_name`}>Product name</label>
            <input 
            type='text' 
            className='form-control'
            name={`product_name`} 
            value={form[index].product_name} 
            onChange={(e) => onchangeHandler(e, index)}
            />
          </div>
          <div className='column-input'>
            <label htmlFor={`product_price`}>Product price</label>
            <input 
            className='form-control'
            type='number' 
            name={`product_price`} 
            value={form[index].product_price} 
            onChange={(e) => onchangeHandler(e, index)}
            />
          </div>
          <div className='column-input'>
            <label htmlFor={`qty`}>Qty</label>
            <input 
            className='form-control'
            type='number' 
            name={`qty`} 
            value={form[index].qty} 
            onChange={(e) => onchangeHandler(e, index)}
            />
            <div className='invalid-feedback' id={`validasi${index}`}>Kuantitas tidak boleh kurang dari 0</div>
          </div>
          <div className='column-input'>
            <label htmlFor={`total`}>Total</label>
            <input 
            className='form-control'
            type='number' 
            name={`total`} 
            value={form[index].total} 
            onChange={(e) => onchangeHandler(e, index)}
            />
          </div>
          <div className={`delete-button ${row === data.length && data.length !== 1  ? "" : "hidden"}`}>
            <Button  onClick={handlerDelete}>Delete </Button >
          </div>
        </div>
      ))}
      <div className='row-input grand-total'>
          <div className='column-input'></div>
          <div className='column-input'></div>
          <div className='column-input'></div>
          <div className='column-input'>
            <label htmlFor={`total`}>Grand Total</label>
            <input type='number' className='form-control' value={grandTotal}/>
          </div>
          <div className='delete-button'></div>
        </div>
    </div>
  );
}

export default App
