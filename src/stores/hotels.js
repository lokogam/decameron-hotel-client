import { defineStore } from "pinia";
import axios from "axios";

export const useHotelStore = defineStore("hotels", {
  state: () => ({
    hotels: [],
    hotel: null,
    errors: [],
    isLoading: false,
  }),
  actions: {
    async fetchHotels() {
      this.isLoading = true;
      try {
        const response = await axios.get("/api/hotels");
        this.hotels = response.data;
        // console.log("this.hotels", this.hotels);
        return this.hotels;
      } catch (error) {
        console.error("Error al obtener los hoteles:", error);
        return [];
      } finally {
        this.isLoading = false;
      }
    },
    async fetchHotel(id) {
      try {
        const response = await axios.get(`/api/hotels/${id}`);
        this.hotel = response.data;
        // console.log("hotel", response.data);
        return this.hotel;
      } catch (error) {
        console.error("Error al obtener el hotel:", error);
      }
    },
    async createHotel(data) {
      this.errors = [];
      try {
        const response = await axios.post("/api/hotels", data);
        this.hotels.push(response.data);
      } catch (error) {
        if (error.response.status === 422) {
          this.errors = error.response.data.errors;
        } else {
          console.error("Error al crear el hotel:", error);
        }
      }
    },
    async updateHotel(id, data) {
      this.errors = [];
      try {
        const response = await axios.put(`/api/hotels/${id}`, data);
        this.hotel = response.data;
      } catch (error) {
        if (error.response.status === 422) {
          this.errors = error.response.data.errors;
        } else {
          console.error("Error al actualizar el hotel:", error);
        }
      }
    },
    async deleteHotel(id) {
      try {
        await axios.delete(`/api/hotels/${id}`);
        this.hotels = this.hotels.filter((hotel) => hotel.id !== id);
      } catch (error) {
        console.error("Error al eliminar el hotel:", error);
      }
    },
  },
});
