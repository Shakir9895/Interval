import React, { useEffect, useRef, useState } from 'react'
import '../src/App.css'
import Card from './components/Card'
import Dialog from '@mui/material/Dialog';
import FormProvider from './hook-form/FormProvider';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from "yup";
import { dummydata } from './data/Dummydata';
import RHFTextField from './hook-form/RHFTextField';
import axios from './utils/axios';
import {
  Trash
} from "phosphor-react";



const App = () => {

  const options = [

    { value: 'low', label: 'low' },
    { value: 'medium', label: 'medium' },
    { value: 'high', label: 'high' },
    // { value: 'all', label: 'all' },
  ];

  const filterData = [

    { value: 'low', label: 'low' },
    { value: 'medium', label: 'medium' },
    { value: 'high', label: 'high' },
    { value: 'all', label: 'all' },
  ];


  const PF = "http://localhost:5001/images/"

  const buttonRef = useRef(null);
  const LoginSchema = Yup.object().shape({
    heading: Yup.string().required('Heading is Required'),
    // phone: Yup.string().required('Phone is required !!'),
    disc: Yup.string().required('Discription is Required'),
  });

  const defaultValues = {
    heading: "",
    disc: "",
  }



  const methods = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues: defaultValues
  })

  const {
    reset,
    setError,
    setValue,
    handleSubmit,
    formState: { errors },
  } = methods;

  const formdata = new FormData();
  const [dialogBox, setDialogBox] = useState(false);
  const [file, setFile] = useState(null);
  const [items, setItems] = useState();
  const [modify, setModify] = useState(false);
  const [singleData, setSingleData] = useState();
  console.log(singleData)
  const [buttonName, setButtonName] = useState('Create');
  const [deleteIcon, setDeleteIcon] = useState(false);
  const [selectedOption, setSelectedOption] = useState('low');
  const [filterSelected, setFilterSelected] = useState('all');

  console.log(filterSelected)

  const createbtnFun = () => {
    reset()
    setSelectedOption('low');
    setButtonName("Create")
    setSingleData(undefined)
    setDeleteIcon(false);
    setDialogBox(true)
  }


  //cancelBtnfun
  const SuccessBtnfun = () => {
    reset()
    setFile(null)
    setDialogBox(false);
    setModify(!modify)
  }






  //onSubmit
  const onSubmit = async (data) => {

    const body = {
      heading: data.heading,
      disc: data.disc,
      priority: selectedOption,
    }

    //Create

    if (buttonRef.current.innerText === 'Create') {
      console.log(data)
      // const body = {
      //   heading: data.heading,
      //   disc: data.disc
      // }

      if (file) {
        const fileName = Date.now() + file.name
        formdata.append("imgName", fileName)
        formdata.append('file', file)
        body.img = fileName;

        try {
          await axios.post("/uploadimg", formdata)
        } catch (err) {
          window.alert("SOMETHING WRONG>>>")

        }
      }

      try {
        if (body.img === undefined) {
          body.img = 'No_IMG'
        }

        const res = await axios.post("/api/create", body)
        if (res.data.success) {
          SuccessBtnfun()
        }

      } catch (err) {
        window.alert("SOMETHING WRONG>>>")

      }

    }

    //Update

    else if (buttonRef.current.innerText === 'Update') {
      body.id = singleData?.id;


      if (file) {
        const fileName = Date.now() + file.name;
        formdata.append("imgName", fileName)
        formdata.append('file', file)
        body.img = fileName;

        try {
          await axios.post("/uploadimg", formdata)
        } catch (err) {
          window.alert("SOMETHING WRONGqqqq>>>")

        }
      }

      try {

        if (!file) {
          body.img = singleData?.image;
        }


        const res = await axios.put("/api/upadteById", body, {
          headers: {
            "Content-Type": "application/json",
          }
        })

        if (res.data.success) {
          SuccessBtnfun()
        }




      } catch (err) {
        window.alert("SOMETHING WRONG>>>")

      }
    }




  }



  //handleClick
  const handleClick = async (id) => {

    try {
      const res = await axios.post("/api/getById", { id: id }, {
        headers: {
          "Content-Type": "application/json",
        }
      })

      setSingleData(res.data)

    } catch (err) {

    }
  }


  //deleteFun
  const deleteFun = async () => {

    const id = singleData?.id;

    try {
      const res = await axios.delete("/api/delete", {
        data: {
          id: id
        }
      });

      console.log(res)
      if (res.data.success) {
        SuccessBtnfun()
      }

    } catch (err) {

    }

  }


  //handleChange
  const handleChange = (e) => {
    const value = e.target.value;
    setSelectedOption(value);

  }


  //filterPriority
  const filterPriority = async (e) => {
    const value = e.target.value;
    setFilterSelected(value)
    try{
      const body= {
        filterdata:value
      }
      const res = await axios.post("/api/filter",body,{
        headers: {
          "Content-Type": "application/json",
        }
      })

      // window.alert(res)
      setItems(res.data)


    }catch(err){

    }
  }


  useEffect(() => {
    if (singleData !== undefined) {

      setDialogBox(true)
      setValue("heading", singleData?.heading)
      setValue("disc", singleData?.discription)
      setSelectedOption(singleData?.priority)

      setButtonName("Update")
      setDeleteIcon(true);
    }
  }, [setValue, singleData])



  //useEffect
  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get("/api/getdata", {
          headers: {
            "Content-Type": "application/json",
          }
        });
        setItems(res.data)
      } catch (err) {

      }
    }

    getData();

  }, [modify])




  return (
    <div className='main-container'>
      <div style={{
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        height: "50px",
      }}>
        <label htmlFor="dropdown">Filter in priority:</label>
        <select id="dropdown" value={filterSelected} onChange={filterPriority} style={{
          height: "60%",
          border: "none",
          borderRadius: "4px"
        }}>
          <option value="" disabled>Select an option</option>
          {filterData.map((option, index) => (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>





      <div style={{
        display: "flex",
        alignItems: "center",
        flexWrap: "wrap",
        justifyContent: "center",
        // border: "2px solid blue"

      }}>
        <div className='card-container1'>




          {items?.data?.map((el, index) => {
            return (
              <Card key={index} el={el} onCardClick={handleClick} />
            )
          })}
        </div>
      </div>


      <div className='createbtndiv'>
        <button className='createBtn' onClick={createbtnFun}>Create New</button>
      </div>


      <Dialog
        fullWidth
        maxWidth="xs"
        open={dialogBox}
        onClose={() => setDialogBox(false)}

      >
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <div style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: "10px",
            paddingTop: "20px",
            gap: "1rem",
          }}>


            <input type="file" id='fileInput' style={{ display: "none" }} onChange={(e) => setFile(e.target.files[0])} />
            <label htmlFor="fileInput">
              <img className='UploadImg' src={file ? URL.createObjectURL(file) : singleData?.image ? PF + singleData?.image : "https://media.istockphoto.com/id/1248723171/vector/camera-photo-upload-icon-on-isolated-white-background-eps-10-vector.jpg?s=612x612&w=0&k=20&c=e-OBJ2jbB-W_vfEwNCip4PW4DqhHGXYMtC3K_mzOac0="} alt="" />
            </label>



            <div style={{
              width: "80%",
              display: "flex",
              flexDirection: "column",
              gap: "10px",

            }}>
              <RHFTextField name="heading" label="Heading" />
              <RHFTextField name="disc" label="Desc" multiline rows={4} />

              <div style={{
                padding: "20px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                height: "50px",

              }}>
                <label htmlFor="dropdown">Choose Priority:</label>
                <select id="dropdown" value={selectedOption} onChange={handleChange} style={{
                  height: "60%",
                  border: "none",
                  borderRadius: "4px"
                }}>
                  <option value="" disabled>Select an option</option>
                  {options.map((option, index) => (
                    <option key={index} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}>
              {deleteIcon && <Trash color='red' size={32} onClick={deleteFun} style={{
                cursor: "pointer"
              }} />}

              <button type='submit' ref={buttonRef} className='addbtn'>{buttonName}</button>
            </div>
          </div>
        </FormProvider>
      </Dialog>
    </div>
  )
}

export default App