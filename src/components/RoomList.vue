<template>
  <div class="container mx-auto mt-10">
    <h1 class="text-2xl font-bold mb-4">Room List</h1>
    <router-link
      to="/rooms/create"
      class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
    >
      Add Room
    </router-link>
    <div v-if="roomStore.isLoading" class="mt-4">Loading...</div>
    <div v-else>
      <table class="min-w-full bg-white mt-4">
        <thead>
          <tr>
            <th class="py-2">Hotel</th>
            <th class="py-2">Type</th>
            <th class="py-2">Accommodation</th>
            <th class="py-2">Quantity</th>
            <th class="py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="room in roomStore.rooms" :key="room.id">
            <!-- <td class="border px-4 py-2">{{ room.hotel.name }}</td> -->
            <td class="border px-4 py-2">
              {{ room.hotel ? room.hotel.name : "N/A" }}
            </td>
            <td class="border px-4 py-2">{{ room.room_type }}</td>
            <td class="border px-4 py-2">{{ room.accommodation }}</td>
            <td class="border px-4 py-2">{{ room.quantity }}</td>
            <td class="border px-4 py-2">
              <router-link
                :to="`/rooms/${room.id}/edit`"
                class="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded"
              >
                Edit
              </router-link>
              <button
                @click="deleteRoom(room.id)"
                class="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded ml-2"
              >
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { useRoomStore } from "../stores/rooms";
import { onMounted } from "vue";

const roomStore = useRoomStore();

onMounted(() => {
  roomStore.fetchRooms();
  //   log de roomStore
  console.log(roomStore);
});

const deleteRoom = (id) => {
  roomStore.deleteRoom(id);
};
</script>
