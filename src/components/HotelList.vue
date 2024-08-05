<!-- HotelList.vue -->
<template>
    <div class="container mx-auto mt-10">
        <h1 class="text-2xl font-bold mb-4">Hotel List</h1>
        <router-link to="/hotels/create"
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Add Hotel</router-link>
        <div v-if="hotelStore.isLoading" class="mt-4">Loading...</div>
        <div v-else>
            <table class="min-w-full bg-white mt-4">
                <thead>
                    <tr>
                        <th class="py-2">Name</th>
                        <th class="py-2">Address</th>
                        <th class="py-2">City</th>
                        <th class="py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="hotel in hotelStore.hotels" :key="hotel.id">
                        <td class="border px-4 py-2">{{ hotel.name }}</td>
                        <td class="border px-4 py-2">{{ hotel.address }}</td>
                        <td class="border px-4 py-2">{{ hotel.city }}</td>
                        <td class="border px-4 py-2">
                            <router-link :to="`/hotels/${hotel.id}/edit`"
                                class="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded">Edit</router-link>
                            <button @click="deleteHotel(hotel.id)"
                                class="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded">Delete</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script setup>
import { useHotelStore } from "../stores/hotels";
import { onMounted } from 'vue';

const hotelStore = useHotelStore();

onMounted(() => {
    hotelStore.fetchHotels();
});

const deleteHotel = (id) => {
    hotelStore.deleteHotel(id);
};
</script>


