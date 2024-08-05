import { defineStore } from "pinia";
import axios from "axios";

export const useRoomStore = defineStore("rooms", {
  state: () => ({
    rooms: [],
    room: null,
    errors: [],
    isLoading: false,
  }),
  actions: {
    async fetchRooms() {
      this.isLoading = true;
      try {
        const response = await axios.get("/api/rooms");
        this.rooms = response.data;
        // console.log("this.rooms", this.rooms);
        return this.rooms;
      } catch (error) {
        console.error("Error al obtener las habitaciones:", error);
        return [];
      } finally {
        this.isLoading = false;
      }
    },
    async fetchRoom(id) {
      try {
        const response = await axios.get(`/api/rooms/${id}`);
        this.room = response.data;
        // console.log("room", response.data);
        return this.room;
      } catch (error) {
        console.error("Error al obtener la habitación:", error);
      }
    },
    async createRoom(data) {
      this.errors = [];
      try {
        const response = await axios.post("/api/rooms", data);
        this.rooms.push(response.data);
        return { success: true };
      } catch (error) {
        if (error.response && error.response.status === 422) {
          this.errors = error.response.data.errors;
          return { success: false };
        } else {
          console.error("Error al crear la habitación:", error);
          return { success: false };
        }
      }
    },
    async updateRoom(id, data) {
      this.errors = [];
      try {
        const response = await axios.put(`/api/rooms/${id}`, data);
        return (this.room = response.data);
      } catch (error) {
        if (error.response.status === 422) {
          return (this.errors = error.response.data.errors);
        } else {
          console.error("Error al actualizar la habitación:", error);
        }
      }
    },
    async deleteRoom(id) {
      try {
        await axios.delete(`/api/rooms/${id}`);
        this.rooms = this.rooms.filter((room) => room.id !== id);
      } catch (error) {
        console.error("Error al eliminar la habitación:", error);
      }
    },
  },
});
