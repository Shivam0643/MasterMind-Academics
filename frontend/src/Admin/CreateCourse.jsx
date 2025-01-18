import axios from 'axios';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { BACKEND_URL } from '../utils/utils';

function CreateCourse() {
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [price, setPrice] = useState("")
    const [image, setImage] = useState("")
    const [preview, setPreview] = useState("")

    const navigate = useNavigate()

    const changePhotoHandler = (e) => {
        const file = e.target.files[0]
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => {
            setPreview(reader.result)
            setImage(file)
        }
    }

    const handleCreateCourse = async (e) => {
        e.preventDefault();
        const formData = new FormData()
        formData.append("title", title)
        formData.append("description", description)
        formData.append("price", price)
        formData.append("image", image)

        const admin = JSON.parse(localStorage.getItem("admin"))
        const token = admin.token;
        if (!token) {
            navigate("/admin/login")
            return;
        }

        try {
            const response = await axios.post(`${BACKEND_URL}/course/create`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`
                },
                withCredentials: true
            })
            console.log(response.data);
            toast.success(response.data.message || "Course created successfully")
            setTitle("")
            setPrice("")
            setImage("")
            setDescription("")
            setPreview("")
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.errors)
        }
    }
    return (
        <div className="p-6 bg-[#0c0c0c] text-white min-h-screen">
            <h1 className="text-3xl font-bold mb-6">Create New Course</h1>
            <form onSubmit={handleCreateCourse} className=''>
                <div className="mb-4">
                    <label htmlFor="title" className="block text-lg font-medium">Course Title</label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="mt-2 p-3 w-full bg-[#171717] border border-[#24cfa6] rounded text-white focus:outline-none"
                        placeholder="Enter course title"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="description" className="block text-lg font-medium">Course Description</label>
                    <textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="mt-2 p-3 w-full max-h-32 bg-[#171717] overflow-hidden text-ellipsis border border-[#24cfa6] rounded text-white focus:outline-none"
                        placeholder="Enter course description"
                    />

                </div>

                <div className="mb-4">
                    <label htmlFor="price" className="block text-lg font-medium">Course Price</label>
                    <input
                        type="number"
                        id="price"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        className="mt-2 p-3 w-full bg-[#171717] border border-[#24cfa6] rounded text-white focus:outline-none"
                        placeholder="Enter course price"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="image" className="block text-lg font-medium">Course Image</label>
                    <div className='flex items-center justify-center'>
                        <img src={preview ? `${preview}` : '/imgPL.webp'} alt="image" />
                    </div>
                    <input
                        type="file"
                        id="image"
                        onChange={changePhotoHandler}
                        className="mt-2 p-3 w-full bg-[#171717] border border-[#24cfa6] rounded text-white focus:outline-none"
                    />
                </div>

                <button
                    type="submit"
                    className="bg-[#24cfa6] hover:bg-[#1f9e83] text-black font-semibold px-6 py-3 rounded transition-all"
                >
                    Create Course
                </button>
            </form>
        </div>
    );
}

export default CreateCourse;
