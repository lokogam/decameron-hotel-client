<!-- HotelCreate.vue -->
<template>
  <div class="container mx-auto mt-10">
    <h1 class="text-2xl font-bold mb-4">Add Hotel</h1>
    <form @submit.prevent="createHotel">
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="name"
          >Name</label
        >
        <input
          v-model="hotel.name"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="name"
          type="text"
          placeholder="Hotel Name"
        />
      </div>
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="address"
          >Address</label
        >
        <input
          v-model="hotel.address"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="address"
          type="text"
          placeholder="Hotel Address"
        />
      </div>
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="city"
          >City</label
        >
        <input
          v-model="hotel.city"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="city"
          type="text"
          placeholder="City"
        />
      </div>
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="nit"
          >NIT</label
        >
        <input
          v-model="hotel.nit"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="nit"
          type="text"
          placeholder="NIT"
        />
      </div>

      <div class="mb-4">
        <label
          class="block text-gray-700 text-sm font-bold mb-2"
          for="total_rooms"
          >Total Rooms</label
        >
        <input
          v-model="hotel.total_rooms"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="total_rooms"
          type="number"
          placeholder="Total Rooms"
        />
      </div>

      <div v-if="errors.length" class="mb-4">
        <ul>
          <li
            v-for="(error, index) in errors"
            :key="index"
            class="text-red-500 text-sm"
          >
            {{ error }}
          </li>
        </ul>
      </div>
      <div class="flex items-center justify-between">
        <button
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Save
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { useRouter } from "vue-router";
import { useHotelStore } from "../stores/hotels";

const hotelStore = useHotelStore();
const router = useRouter();

const hotel = ref({
  name: "",
  address: "",
  city: "",
  nit: "",
  total_rooms: 0,
});

const errors = ref([]);

const createHotel = async () => {
  await hotelStore.createHotel(hotel.value);
  if (hotelStore.errors.length) {
    errors.value = Object.values(hotelStore.errors).flat();
  } else {
    router.push({ name: "HotelList" });
  }
};

watch(
  () => hotelStore.errors,
  (newErrors) => {
    errors.value = newErrors;
  }
);
</script>
