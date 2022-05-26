import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";

const UserDetail = () => {
  const { register, handleSubmit } = useForm;

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("file", data.file[0]);
    const { res } = await axios.put("/api/users/userpersonaldetails");
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="file" {...register("file")} />
        <input type="submit" />
      </form>
    </> 
  );
};

export default UserDetail;
