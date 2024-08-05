<template>
  <div class="container mx-auto mt-10">
    <h1 class="text-2xl font-bold mb-4">
      {{ isEditing ? "Edit Room" : "Create Room" }}
    </h1>
    <form @submit.prevent="submitForm">
      <div class="mb-4">
        <label
          class="block text-gray-700 text-sm font-bold mb-2"
          for="hotel_id"
        >
          Hotel
        </label>
        <select
          v-model="form.hotel_id"
          id="hotel_id"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        >
          <option value="">Select a hotel</option>
          <option
            v-for="hotel in hotelStore.hotels"
            :key="hotel.id"
            :value="hotel.id"
          >
            {{ hotel.name }}
          </option>
        </select>
      </div>
      <div class="mb-4">
        <label
          class="block text-gray-700 text-sm font-bold mb-2"
          for="room_type"
        >
          Room Type
        </label>
        <select
          v-model="form.room_type"
          @change="updateAccommodationOptions"
          id="room_type"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        >
          <option value="">Select a room type</option>
          <option value="ESTANDAR">Estándar</option>
          <option value="JUNIOR">Junior</option>
          <option value="SUITE">Suite</option>
        </select>
      </div>
      <div class="mb-4">
        <label
          class="block text-gray-700 text-sm font-bold mb-2"
          for="accommodation"
        >
          Accommodation
        </label>
        <select
          v-model="form.accommodation"
          id="accommodation"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        >
          <option value="">Select accommodation</option>
          <option
            v-for="option in accommodationOptions"
            :key="option"
            :value="option"
          >
            {{ capitalize(option) }}
          </option>
        </select>
      </div>
      <div class="mb-4">
        <label
          class="block text-gray-700 text-sm font-bold mb-2"
          for="quantity"
        >
          Quantity
        </label>
        <input
          v-model="form.quantity"
          id="quantity"
          type="number"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div v-if="roomStore.errors.length" class="mb-4">
        <ul>
          <li
            v-for="(error, index) in roomStore.errors"
            :key="index"
            class="text-red-500 text-sm"
          >
            {{ error }}
          </li>
        </ul>
      </div>
      <div
        v-if="roomStore.errors && Object.keys(roomStore.errors).length"
        class="mb-4"
      >
        <ul>
          <li
            v-for="(errorMessages, field) in roomStore.errors"
            :key="field"
            class="text-red-500 text-sm"
          >
            <div v-for="message in errorMessages" :key="message">
              {{ field }}: {{ message }}
            </div>
          </li>
        </ul>
      </div>
      <button
        type="submit"
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        {{ isEditing ? "Update" : "Create" }}
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useRoomStore } from "../stores/rooms";
import { useHotelStore } from "../stores/hotels";

const route = useRoute();
const router = useRouter();
const roomStore = useRoomStore();
const hotelStore = useHotelStore();

const isEditing = computed(() => route.params.id !== undefined);

const form = ref({
  hotel_id: "",
  room_type: "",
  accommodation: "",
  quantity: 0,
});

const accommodationOptions = ref([]);

const capitalize = (str) => {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

const updateAccommodationOptions = () => {
  switch (form.value.room_type) {
    case "ESTANDAR":
      accommodationOptions.value = ["SENCILLA", "DOBLE"];
      break;
    case "JUNIOR":
      accommodationOptions.value = ["TRIPLE", "CUADRUPLE"];
      break;
    case "SUITE":
      accommodationOptions.value = ["SENCILLA", "DOBLE", "TRIPLE"];
      break;
    default:
      accommodationOptions.value = [];
  }
  // Ensure the selected accommodation is valid for the selected room type
  if (!accommodationOptions.value.includes(form.value.accommodation)) {
    form.value.accommodation = "";
  }
};

onMounted(async () => {
  await hotelStore.fetchHotels();
  if (isEditing.value) {
    const room = await roomStore.fetchRoom(route.params.id);
    form.value = {
      hotel_id: room.hotel_id,
      room_type: room.room_type,
      accommodation: room.accommodation,
      quantity: room.quantity,
    };
    updateAccommodationOptions();
  }
});

const submitForm = async () => {
  try {
   const result = isEditing.value
      ? await roomStore.updateRoom(route.params.id, form.value)
      : await roomStore.createRoom(form.value);

    if (result.success) {
      router.push('/rooms');
    }
  } catch (error) {
    console.error("Submission error:", error);
    // Handle specific error responses here
  }
};
</script>
