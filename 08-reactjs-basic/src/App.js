import "./App.css";
import HeadingLabel from "./components/HeadingLabel";
import InputForm from "./components/InputForm";
import Checkbox from "./components/Checkbox";
import Button from "./components/Button";
import { useEffect, useState } from "react";
import { BsCheckAll } from "react-icons/bs";
import { MdDisabledByDefault } from "react-icons/md";

function App() {
  const [activity, setActivity] = useState("");
  let postId = new Date()
  const [isStatus, setIsStatus] = useState("");
  const [datas, setDatas] = useState([
    { id: 1, activity: "membaca", status: false },
  ]);

  const [isUpdate, setIsUpdate] = useState({id:null, status:false})

  const [formData, setFormDFata] = useState({
    activity:'',
    status:false,
  })

  const onChangeHandler = (e) => {
    let data ={...formData}
    data[e.target.name] = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormDFata(data)
  };

  const handleSubmit = (e)=>{
    
    let data = [...datas]
    e.preventDefault()

    if(formData.activity === ''){
      return false
    }

    if(isUpdate.status){
      data.forEach((val)=>{
        if(val.id === isUpdate.id){
          val.activity = formData.activity
          val.status = formData.status
        }
      })
    }else{
      data.push({id:postId, activity:formData.activity, status:formData.status})
    }
    setDatas(data)
    setFormDFata({activity:"", status:false})
    setIsUpdate({id:null, status:''})

  }
  const handleUpdate = (id) => {
    //temukan data 
    let data = [...datas]
    let foundData = data.find((val)=>val.id ===id)
    setFormDFata({activity:foundData.activity, status:foundData.status })

    setIsUpdate({id:id, status:true})
  };
  const handleDelete = (id) => {
    let data = [...datas]
    let filterData = data.filter((val)=>val.id !==id)
    setDatas(filterData)
  };

  return (
    <>
      <div className=" bg-slate-100 py-5 flex justify-center h-screen ">
        <div className="md:w-6/12 ">
          <div className="font-bold text-3xl py-4 text-center">
            <HeadingLabel title="Todolist Activity" />
          </div>
          <div className="shadow-lg p-5 bg-white rounded-md">
            <form onSubmit={handleSubmit}>
              <div className="flex justify-between gap-5">
                <InputForm
                  onChangeHandler={onChangeHandler}
                  valueActivity={formData.activity}
                  activityName="activity"
                />
                <Checkbox
                  checkboxHandler={onChangeHandler}
                  valueCheckbox={formData.status}
                  statusName="status"
                />
                <Button typeButton="submit" labelButton="add task" />
              </div>
            </form>
            {/* list */}

            <div className="overflow-x-auto relative shadow-md sm:rounded-lg mt-5">
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="py-3 px-6">
                      No
                    </th>
                    <th scope="col" className="py-3 px-6">
                      Activity
                    </th>
                    <th scope="col" className="py-3 px-6">
                      Status
                    </th>
                    <th scope="col" className="py-3 px-6">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {datas.map((val, i) => {
                    return (
                      <>
                        <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                          <th key={i} scope="row" className="py-4 px-6 ">
                            {i + 1}
                          </th>
                          <th scope="row" className="py-4 px-6 ">
                            {val.activity}
                          </th>
                          <th scope="row" className="py-4 px-6 ">
                            {val.status ? (
                              <BsCheckAll className="text-2xl text-green-600" />
                            ) : (
                              <MdDisabledByDefault className="text-xl text-red-400" />
                            )}
                          </th>
                          <th scope="row" className="py-4 px-6 ">
                            <div className="flex gap-1">
                              <span
                                onClick={() => handleUpdate(val.id)}
                                className="text-green-600 cursor-pointer"
                              >
                                [Edit]
                              </span>

                              <span
                                onClick={() => handleDelete(val.id)}
                                className="text-red-600 cursor-pointer"
                              >
                                [delete]
                              </span>
                            </div>
                          </th>
                        </tr>
                      </>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
