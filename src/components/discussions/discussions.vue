<template>

  <loading v-if="isLoading"></loading>

  <section v-else></section>

</template>
<script setup>
import { computed, onMounted, ref } from 'vue';
import { useStore } from 'vuex';
import Loading from '../Global/Loading.vue';

const store = useStore();
const discussions = computed(() => store.getters.allDiscussions);
const isLoading = ref(false);

const fetchDiscussions = async () => {
  isLoading.value = true;
  await store.dispatch('fetchDiscussions');
  isLoading.value = false;
};

onMounted(() => {
  fetchDiscussions();
});

</script>