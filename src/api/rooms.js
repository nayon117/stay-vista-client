import axiosSecure from "."

// fetch all rooms
export const getAllRooms = async () => {
    const { data } = await axiosSecure('/rooms')
    return data;
}

//fetch all rooms for  host 
export const getHostRooms = async (email) => {
    const { data } = await axiosSecure(`/rooms/${email}`)
    return data;
}

// fetch single room
export const getRoom = async (id) => {
    const { data } = await axiosSecure(`/room/${id}`)
    return data;
}

// add a room
export const addRoom = async (roomData) => {
    const { data } = await axiosSecure.post('/rooms',roomData)
    return data;
}